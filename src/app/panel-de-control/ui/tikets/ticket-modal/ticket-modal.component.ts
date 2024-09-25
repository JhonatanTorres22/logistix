import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UiButtonIconComponent } from 'src/app/core/components/ui-button-icon/ui-button-icon.component';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { TicketDetalleComponent } from '../ticket-detalle/ticket-detalle.component';
import { ObservacionSignal } from 'src/app/panel-de-control/domain/signals/observacion.signal';
import { AlertService } from 'src/app/demo/services/alert.service';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { ObservacionRepository } from 'src/app/panel-de-control/domain/repositories/observacion.repository';
import { ObservacionBase, ObservacionResolver } from 'src/app/panel-de-control/domain/models/obserbacion.model';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { MensajeriaRepository } from 'src/app/mensajeria/domain/repositories/mensajeria.repository';
import { MensajeriaCerrarArchivar } from 'src/app/mensajeria/domain/models/mensajeria.model';

@Component({
  selector: 'ticket-modal',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TicketDetalleComponent,
    UiButtonComponent,
  ],
  templateUrl: './ticket-modal.component.html',
  styleUrl: './ticket-modal.component.scss'
})
export class TicketModalComponent {

  ticketSelect = this.signal.ticketSelect;
  mensajeRespuestaTicket = this.signal.mensajeRespuestaTicket;
  currentRol = this.authSignal.currentRol;
  renderizarTickets = this.signal.renderizarTickets;

  constructor(
    private signal: ObservacionSignal,
    private alert: AlertService,
    private modal: UiModalService,
    private repository: ObservacionRepository,
    private mensajeriaRepository: MensajeriaRepository,
    private authSignal: AuthSignal
  ) {

  }

  onCierreConfirm = () => {
    this.alert.sweetAlert('question', 'Confirmación', '¿Está seguro que desea Forzar el Cierre?. Recuerde que al CERRAR el mensaje quedará ARCHIVADO con estado RECHAZADO')
      .then( isConfirm => {
        if( !isConfirm ) return;

        this.responder().then( isResuelto => {
          if( !isResuelto ) return;
          this.forzarCierre();
        } );

      })
  }

  forzarCierre = () => {

    const cerrarArchivarMensaje: MensajeriaCerrarArchivar = {
      idMensaje: this.ticketSelect().mensajeId,
      usuarioId: parseInt( this.currentRol().id )
    }

    console.log( cerrarArchivarMensaje );
    

    this.mensajeriaRepository.forzarCierre( cerrarArchivarMensaje ).subscribe({
      next: ( response ) => {
        console.log('response', response);
        this.alert.sweetAlert('success', 'Confirmado', 'El mensaje fue CERRADO y ARCHIVADO correctamente');
        this.modal.getRefModal().close('Listar');
          this.renderizarTickets.set('Listar');
          this.mensajeRespuestaTicket.set('');
      }, error: ( error ) => {
        console.log('error', error);
        this.alert.showAlert('Ocurrió un error al cerrar el ticket','error' );
      }
    })

  }

  onResponderConfirm = () => {
    this.alert.sweetAlert('question', 'Confirmación', '¿Está seguro que desea RESPONDER el ticket?')
      .then( isConfirm => {
        if( !isConfirm ) return;

        this.responder().then( isResuelto => {
          if( !isResuelto ) return;
          // this.modal.getRefModal().close('Listar');
          this.renderizarTickets.set('Listar');
          this.mensajeRespuestaTicket.set('');
        });

      })
  }

  responder = () => {
    
    return new Promise<boolean>( (resolve, reject) => {

      this.repository.resolver( this.updateHistorial() ).subscribe({
        next: ( response ) => {
          console.log('response', response);
          this.alert.showAlert('El ticket fue RESPONDIDO correctamente','success' );
          const ticket: ObservacionBase = {
            ...this.ticketSelect(),
            mensajeResuelto: this.mensajeRespuestaTicket(),
            fechaResuelto: new Date().toISOString(),
            estado: 'Resuelto',
            historial: [...this.updateHistorial().historial]
          }
          this.ticketSelect.set( ticket );
          resolve( true )
        }, error: ( error ) => {
          console.log('error', error);
          resolve( false )
          this.alert.showAlert('Ocurrió un error al responder el ticket','error' );
        }
      })

    })
    

  }

  updateHistorial = (): ObservacionResolver => {

    const mensajeHistorial = [
      ...this.ticketSelect().historial
    ]

    mensajeHistorial.push( { mensaje: this.ticketSelect().mensajeResuelto, fecha: this.ticketSelect().fechaResuelto } )

    const resolver: ObservacionResolver = {
      id: this.ticketSelect().id,
      historial: this.ticketSelect().mensajeResuelto ? [...mensajeHistorial] : [],
      mensajeRespuesta: this.mensajeRespuestaTicket(),
      userId: parseInt( this.currentRol().id )
    }
    console.log( resolver );
    

    return resolver;

  }
  

}
