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
import { ObservacionResolver } from 'src/app/panel-de-control/domain/models/obserbacion.model';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';

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

  constructor(
    private signal: ObservacionSignal,
    private alert: AlertService,
    private modal: UiModalService,
    private repository: ObservacionRepository,
    private authSignal: AuthSignal
  ) {

  }

  onCierreConfirm = () => {
    this.alert.sweetAlert('question', 'Confirmación', '¿Está seguro que desea Forzar el Cierre?. Recuerde que al CERRAR el mensaje quedará ARCHIVADO con estado RECHAZADO')
      .then( isConfirm => {
        if( !isConfirm ) return;

        this.forzarCierre();

      })
  }

  forzarCierre = () => {
    this.alert.sweetAlert('success', 'Confirmado', 'El mensaje fue CERRADO y ARCHIVADO correctamente');
    this.modal.getRefModal().close();
  }

  onResponderConfirm = () => {
    this.alert.sweetAlert('question', 'Confirmación', '¿Está seguro que desea RESPONDER el ticket?')
      .then( isConfirm => {
        if( !isConfirm ) return;

        this.responder();

      })
  }

  responder = () => {
    const resolver: ObservacionResolver = {
      id: this.ticketSelect().id,
      mensajeRespuesta: this.mensajeRespuestaTicket(),
      userId: parseInt( this.currentRol().id )
    }
    this.repository.resolver( resolver ).subscribe({
      next: ( response ) => {
        console.log('response', response);
        this.alert.showAlert('El ticket fue RESPONDIDO correctamente','success' );
        this.modal.getRefModal().close();
        this.mensajeRespuestaTicket.set('');
      }, error: ( error ) => {
        console.log('error', error);
        this.alert.showAlert('Ocurrió un error al responder el ticket','error' );
      }
    })

  }

}
