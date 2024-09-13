import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { ObservacionRepository } from 'src/app/panel-de-control/domain/repositories/observacion.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { ObservacionSignal } from 'src/app/panel-de-control/domain/signals/observacion.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { TicketDetalleComponent } from "../../../panel-de-control/ui/tikets/ticket-detalle/ticket-detalle.component";
import { ObservacionConfirmar, ObservacionResolver } from 'src/app/panel-de-control/domain/models/obserbacion.model';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';


@Component({
  selector: 'mensajeria-observacion',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiButtonComponent,
    TicketDetalleComponent
],
  templateUrl: './mensajeria-observacion.component.html',
  styleUrl: './mensajeria-observacion.component.scss'
})
export class MensajeriaObservacionComponent implements OnInit {

  selectMensaje = this.signal.selectMensaje;
  observacionSelect = this.observacionSignal.observacionSelect;
  conformeIsChecked = this.observacionSignal.conformeIsChecked;
  mensajeRespuestaTicket = this.observacionSignal.mensajeRespuestaTicket;
  currentRol = this.authSignal.currentRol;
  rating = this.observacionSignal.rating;
  mensajesRecibidos = this.signal.mensajesRecibidos;

  constructor(
    private signal: MensajeriaSignal,
    private repository: ObservacionRepository,
    private observacionSignal: ObservacionSignal,
    private authSignal: AuthSignal,
    private modal: UiModalService,
    private alert: AlertService,
  ) {

  }
  ngOnInit(): void {
    this.listarObservacion();
  }


  listarObservacion = () => {
    this.repository.listarxId( this.selectMensaje().idMensaje ).subscribe({
      next: ( observacion ) => {
        console.log( observacion );
        this.alert.showAlert('Listando detalle de la observación', 'success');
        this.observacionSelect.set( observacion[0] )
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener el detalle de la observación', 'error')
      }
    })
  }

  resolverConfirm = () => {

    this.alert.sweetAlert('question', 'Confirmación', ' Luego de confirmar el Ticket cambiará su estado a RESUELTO y no habrá marcha atras. ¿Estás seguro que desear Marcar como Resuelto esta observación?.').then( isConfirm => {
      if( !isConfirm ) return;
      this.resolverObservacion();
    })

  }

  resolverObservacion = () => {
    const resolver: ObservacionConfirmar = {
      id: this.observacionSelect().id,
      mensajeRespuesta: this.mensajeRespuestaTicket(),
      puntuacion: this.rating(),
      userId: parseInt( this.currentRol().id )
    }

    console.log( resolver );
 
    this.repository.confirmar( resolver ).subscribe({
      next: ( response ) => {
        console.log( response );
        this.alert.showAlert('Observación resuelta con éxito', 'success');
        this.listarObservacion();
        this.modal.getRefModal().close('Resuelto');
        this.actualizarCampoObservado();
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al resolver la observación', 'error')
      }
    });
  }


  actualizarCampoObservado = () => {
    this.selectMensaje.update( mensaje => {
      this.mensajesRecibidos.update( mensajes => {
        const msj = mensajes.map( men => {
          if( men.idMensaje == mensaje.idMensaje ) {
            return {
              ...men,
              solucionConforme: true

            }
          }
          return { ...men }
        } );

        return msj;
      });
      
      return {
        ...mensaje,
        solucionConforme: true
      }
    } );

    console.log( this.selectMensaje() );
    
  }

}
