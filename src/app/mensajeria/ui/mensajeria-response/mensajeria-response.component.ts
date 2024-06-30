import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaRepository } from '../../domain/repositories/mensajeria.repository';
import { MensajeriaResponder } from '../../domain/models/mensajeria.model';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';

@Component({
  selector: 'mensajeria-response',
  standalone: true,
  imports: [ CommonModule, SharedModule, QuillEditorComponent, UiButtonComponent],
  templateUrl: './mensajeria-response.component.html',
  styleUrl: './mensajeria-response.component.scss'
})
export class MensajeriaResponseComponent {

  mensaje: string = '';
  mensajesHistorial = this.signal.mensajesHistorial;

  constructor(
    private alert: AlertService,
    private repository: MensajeriaRepository,
    private signal: MensajeriaSignal

  ) {}
  enviarConfirm = () => {

    this.alert.sweetAlert('question', 'Confirmación', '¿Está seguro que desea enviar el mensaje?')
      .then( isConfirm => {
        if( !isConfirm ) return

        const mensajeResponder: MensajeriaResponder = {
         
          idMensaje: this.mensajesHistorial()[this.mensajesHistorial().length -1].idMensaje,
          idRolEmisor: 1,
          idRolReceptor: this.mensajesHistorial()[this.mensajesHistorial().length -1].idRolEmisor, //TODO: ID DEL RECEPTOR this.mensajesHistorial()[0].informacionAdicional.toString()
          mensaje: this.mensaje.trim(),
          informacionAdicional: ''
        }
        // this.signal.setMensajeriaInsertar( mensajeResponder );
        // console.log(mensajeResponder);
        this.enviarMensaje( mensajeResponder );
      });

    
  }

  enviarMensaje( mensaje: MensajeriaResponder ) {
    console.log(mensaje);
    // this.signal.renderizarMensajes.set( 'Enviados' );
    
    this.repository.responderMensaje( mensaje ).subscribe({
      next: ( data ) => {
        console.log(data);
        this.alert.showAlert('El mensaje se envió correctamente', 'success', 6);
        // this.signal.setMensajeriaDataAsignacionDefault();
        this.signal.setMensajeriaDataAsignacionDefault();
        this.signal.renderizarMensajes.set( 'Respuesta' );
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al enviar el mensaje: ' + error, 'error', 6)
      }
    })
  }


}
