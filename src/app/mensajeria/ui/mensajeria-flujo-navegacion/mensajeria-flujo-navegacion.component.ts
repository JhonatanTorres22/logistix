import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { MensajeriaCerrarArchivar, MensajeriaHistorialMensajes, MensajeriaResponderAList, MensajeriaResponderAlta } from '../../domain/models/mensajeria.model';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MensajeriaRepository } from '../../domain/repositories/mensajeria.repository';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UsuarioRolAlta } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { UsuarioRolRepository } from 'src/app/usuarios/domain/repositories/usuario-rol.repository';

@Component({
  selector: 'mensajeria-flujo-navegacion',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiButtonComponent],
  templateUrl: './mensajeria-flujo-navegacion.component.html',
  styleUrl: './mensajeria-flujo-navegacion.component.scss'
})
export class MensajeriaFlujoNavegacionComponent {

  @Input() allDestinatario: MensajeriaResponderAList[] = [];
  @Input() listaDestinatarios: MensajeriaResponderAList[] = [];
  @Input() disabled: string = '';
  @Input() showCancelar: boolean = false;
  @Input() mensaje: string = '';

  showFormResponse = this.signal.showFormResponse;
  listaDestinatariosResponderA = this.signal.listaDestinatariosResponderA;
  listaDestinatariosResponderAflujo = this.signal.listaDestinatariosResponderAflujo;
  selectedDestinatarioResponderA = this.signal.selectedDestinatarioResponderA;

  mensajesHistorial = this.signal.mensajesHistorial;


  constructor(
    private signal: MensajeriaSignal,
    private modal: UiModalService,
    private alert: AlertService,
    private repository: MensajeriaRepository,
    private auth: AuthSignal,
    private userRolRepository: UsuarioRolRepository

  ) {}


  cancelar = () => {
    // this.mensaje = '';
    this.showFormResponse.set( false );
    this.listaDestinatariosResponderAflujo.set( this.signal.listaDestinatariosResponderADefault );
  }

  onResponder = ( flujoNavegacion: string ) => {
    this.showFormResponse.set(true);
    const destinatariosToFlujoSelected = this.listaDestinatariosResponderA().filter( flujo => flujo.flujoNavegacion == flujoNavegacion );
    
    this.listaDestinatariosResponderAflujo.set( destinatariosToFlujoSelected );
    console.log('mostrar');
    this.modal.getRefModal()?.close();
    
  }

  enviarConfirm = () => {

    this.alert.sweetAlert('question', 'Confirmación', '¿Está seguro que desea enviar el mensaje?')
      .then( isConfirm => {
        if( !isConfirm ) return

        const mensajeResponder: MensajeriaResponderAlta = {
         
          idMensaje: this.selectedDestinatarioResponderA().idMensaje,
          idTipoMensajeRol: this.selectedDestinatarioResponderA().idTipoMensajeRol,
          idRolEmisor: parseInt( this.auth.currentRol().id ),
          idRolReceptor: this.selectedDestinatarioResponderA().idUsuarioRol, //TODO: ID DEL RECEPTOR this.mensajesHistorial()[0].informacionAdicional.toString()
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



  onCerrarProcesoConfirm = () => {
    console.log( 'ver opciones ');
    const mensajeCerrar: MensajeriaCerrarArchivar = {
      idMensaje: this.mensajesHistorial()[ this.mensajesHistorial().length - 1].idMensaje,
      usuarioId: parseInt( this.auth.currentRol().id )
    } 
    switch( (this.mensajesHistorial()[ this.mensajesHistorial().length - 1].asunto ).substring(0, 3) ) {
      
      case 'DAR': { 

        this.onAltaConfirm();

       }; break;
      case 'VAL': { 

        this.onValidacionPlanEstudioConfirm( mensajeCerrar );

       }; break;
      case 'CAM': { 
        this.onCambioPlanEstudioConfirm( mensajeCerrar );
       }; break;
    }
  }

  onValidacionPlanEstudioConfirm = ( mensajeCerrar: MensajeriaCerrarArchivar ) => {

    this.alert.sweetAlert( 'question', 'Confirmación', `¿Está seguro que desea APROBAR la validación del Plan de Estudios?`)
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }

        this.cerrarArchivar( mensajeCerrar ).then( completedSuccessfully => {
          if (!completedSuccessfully) {
            console.log('Hubo un error al archivar')
          }
          
          this.alert.showAlert('Se aprobó la VALIDACIÓN y VIGENCIA DEL PLAN DE ESTUDIOS, y el Mensaje fué CERRADO y ARCHIVADO.', 'success', 6);
          // console.log('No tenía Alta, ahora si está dado de ALTA');
          this.signal.setMensajeriaDataAsignacionDefault();
          this.modal.getRefModal()?.close();
          // this.mensajesHistorial
          setTimeout(() => {
            this.signal.renderizarMensajes.set( 'Alta' );
          }, 200);
    
        });

      });

  }

  onCambioPlanEstudioConfirm = ( mensajeCerrar: MensajeriaCerrarArchivar ) => {

    this.alert.sweetAlert( 'question', 'Confirmación', `¿Está seguro que desea APROBAR el NUEVO del Plan de Estudios?`)
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }

        this.cerrarArchivar( mensajeCerrar ).then( completedSuccessfully => {
          if (!completedSuccessfully) {
            console.log('Hubo un error al archivar')
          }
          
          this.alert.showAlert('Se aprobó el NUEVO PLAN DE ESTUDIOS, y el Mensaje fué CERRADO y ARCHIVADO.', 'success', 6);
          // console.log('No tenía Alta, ahora si está dado de ALTA');
          this.signal.setMensajeriaDataAsignacionDefault();
          this.modal.getRefModal()?.close();
          // this.mensajesHistorial
          setTimeout(() => {
            this.signal.renderizarMensajes.set( 'Alta' );
          }, 200);
    
        });

      });

  }

  onAltaConfirm = () => {
    const ultimoMensaje = this.mensajesHistorial()[ this.mensajesHistorial().length - 1];
    console.log( ultimoMensaje );
    
    if( this.showFormResponse() ) {
      return;
    }

    this.alert.sweetAlert( 'question', 'Confirmación', `¿Está seguro que desea DAR DE ALTA al Director de Escuela?`)
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }

        const directorAlta: UsuarioRolAlta = {
          idRol: parseInt( ultimoMensaje.informacionAdicional ),
          usuarioId: parseInt( this.auth.currentRol().id )
        }

        console.log(directorAlta);
        // return
        this.onAlta( directorAlta, ultimoMensaje )

      });

  }

  onAlta = ( userAlta: UsuarioRolAlta, mensaje: MensajeriaHistorialMensajes ) => {
    // console.log(userRol);
    
    
    this.userRolRepository.darAltaRolUser( userAlta ).subscribe({
      next: ( data ) => {

        console.log( data );
        console.log(userAlta);
        

        const mensajeCerrar: MensajeriaCerrarArchivar = {
          idMensaje: mensaje.idMensaje,
          usuarioId: parseInt( this.auth.currentRol().id )
        }

        this.cerrarArchivar( mensajeCerrar ).then( completedSuccessfully => {
          if (!completedSuccessfully) {
            console.log('Hubo un error al archivar')
          }
          
          this.alert.showAlert('El Director fué dado de ALTA, y el Mensaje fué CERRADO y ARCHIVADO.', 'success');
          // console.log('No tenía Alta, ahora si está dado de ALTA');
          this.signal.setMensajeriaDataAsignacionDefault();
          this.modal.getRefModal()?.close();
          // this.mensajesHistorial
          setTimeout(() => {
            this.signal.renderizarMensajes.set( 'Alta' );
          }, 200);

        });
      }, error: ( error ) => {
        console.log( error );
        
        this.alert.showAlert('Ocurrió un error al dar de alta al decano:' + error, 'error');
      }
    });
  }

  cerrarArchivar = ( mensaje?: MensajeriaCerrarArchivar ) => {
    
    return new Promise<boolean>( ( resolve, reject ) => {
      this.repository.cerrarArchivarMensaje( mensaje! ).subscribe({
        next: ( data ) => {
          console.log(data);
          console.log('Mensaje CERRADO Y ARCHIVADO.');
          resolve( true )
        }, error: ( error ) => {
          console.log( error );
          this.alert.showAlert('Ocurrió un error al ARCHIVAR el mensaje: ' + error, 'error');
          resolve( false )
        }
      });
    });

  }

  onForzarCierre = () => {
    this.alert.sweetAlert('info', 'IMPLEMENTACIÓN PENDIENTE' ,'Falta Implementar, paciencia por favor....  :)')
  }


}
