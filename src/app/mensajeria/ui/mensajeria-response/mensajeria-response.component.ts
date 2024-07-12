import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaRepository } from '../../domain/repositories/mensajeria.repository';
import { MensajeriaResponderAList, MensajeriaResponderAlta } from '../../domain/models/mensajeria.model';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  showFormResponse = this.signal.showFormResponse;
  listaDestinatariosResponderA = this.signal.listaDestinatariosResponderA;

  paraRemitenteForm: FormGroup;
  constructor(
    private alert: AlertService,
    private repository: MensajeriaRepository,
    private signal: MensajeriaSignal,
    private auth: AuthSignal,
    private fb: FormBuilder
  ) {
    this.paraRemitenteForm = this.fb.group({
      destinatario: ['', [Validators.required]] 
    })
  }

  enviarConfirm = () => {

    this.alert.sweetAlert('question', 'Confirmación', '¿Está seguro que desea enviar el mensaje?')
      .then( isConfirm => {
        if( !isConfirm ) return

        const mensajeResponder: MensajeriaResponderAlta = {
         
          idMensaje: this.paraRemitenteForm.value.destinatario.idMensaje,
          idTipoMensajeRol: this.paraRemitenteForm.value.destinatario.idTipoMensajeRol,
          idRolEmisor: parseInt( this.auth.currentRol().id ),
          idRolReceptor: this.paraRemitenteForm.value.destinatario.idUsuarioRol, //TODO: ID DEL RECEPTOR this.mensajesHistorial()[0].informacionAdicional.toString()
          mensaje: this.mensaje.trim(),
          informacionAdicional: this.mensajesHistorial()[ this.mensajesHistorial().length - 1].informacionAdicional
        }

        console.log(mensajeResponder);
        // return

        this.enviarMensaje( mensajeResponder );
      });

    
  }

  enviarMensaje( mensaje: MensajeriaResponderAlta ) {
    console.log(mensaje);
    // this.signal.renderizarMensajes.set( 'Enviados' );
    
    this.repository.responderMensajeAlta( mensaje ).subscribe({
      next: ( data ) => {
        console.log(data);
        this.alert.showAlert('El mensaje se envió correctamente', 'success', 6);
        // this.signal.setMensajeriaDataAsignacionDefault();
        this.signal.setMensajeriaDataAsignacionDefault();
        this.signal.renderizarMensajes.set( 'Respuesta' );
        this.showFormResponse.set( false );

      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al enviar el mensaje: ' + error, 'error', 6)
      }
    })
  }


  cancelar = () => {
    this.mensaje = '';
    this.showFormResponse.set( false );
  }

}
