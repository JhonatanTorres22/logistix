import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { MensajeriaCerrarArchivar, MensajeriaForzarCierre, MensajeriaHistorialMensajes, MensajeriaResponderAList, MensajeriaResponderAlta } from '../../domain/models/mensajeria.model';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MensajeriaRepository } from '../../domain/repositories/mensajeria.repository';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UsuarioRolAlta } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { UsuarioRolRepository } from 'src/app/usuarios/domain/repositories/usuario-rol.repository';
import { PlanEstudioAddComponent } from 'src/app/plan-de-estudios/ui/plan-estudio-add/plan-estudio-add.component';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { PlanEstudioCardComponent } from 'src/app/plan-de-estudios/ui/plan-estudio-card/plan-estudio-card.component';
import { ClickDirective } from 'angular-calendar/modules/common/click/click.directive';
import { PlanEstudioRepository } from 'src/app/plan-de-estudios/domain/repositories/plan-estudio.repository';
import { PlanEstudio, PlanEstudioEditCU } from 'src/app/plan-de-estudios/domain/models/plan-estudio.model';
import { MensajeriaService } from '../../infraestructure/services/mensajeria.service';
import { MensajeriaObservarComponent } from '../mensajeria-observar/mensajeria-observar.component';

@Component({
  selector: 'mensajeria-flujo-navegacion',
  standalone: true,
  imports: [ 
    CommonModule,
    SharedModule,
    PlanEstudioCardComponent,
    PlanEstudioAddComponent,
    MensajeriaObservarComponent,
    UiButtonComponent],
  templateUrl: './mensajeria-flujo-navegacion.component.html',
  styleUrl: './mensajeria-flujo-navegacion.component.scss'
})
export class MensajeriaFlujoNavegacionComponent {

  @ViewChild('PlanResolucion') PlanResolucion: TemplateRef<any>
  // @ViewChild('asunto') asunto: UiButtonComponent;
  public asunto = <HTMLElement>document.querySelector('#asunto')!;
 
  @Input() allDestinatario: MensajeriaResponderAList[] = [];
  @Input() listaDestinatarios: MensajeriaResponderAList[] = [];
  @Input() disabled: string = '';
  @Input() showCancelar: boolean = false;
  @Input() mensaje: string = '';

  showFormResponse = this.signal.showFormResponse;
  listaDestinatariosResponderA = this.signal.listaDestinatariosResponderA;
  listaDestinatariosResponderAflujo = this.signal.listaDestinatariosResponderAflujo;
  selectMensaje = this.signal.selectMensaje;
  tipoBandeja = this.signal.tipoBandeja;

  selectedDestinatarioResponderA = this.signal.selectedDestinatarioResponderA;
  isModal = this.signalPlanEstudio.isModal;
  planEstudioSinResolucion = this.signalPlanEstudio.planEstudioSinResolucion;
  planEstudioPorAprobar = this.signalPlanEstudio.planEstudioPorAprobar;
  currentRol = this.auth.currentRol;
  checkInfoSuccess = this.signal.checkInfoSuccess;
  isCompletedProcess = this.signal.isCompletedProcess;
  file = this.signal.file;
  
  abrirModal = this.signal.abrirModal;

  mensajesHistorial = this.signal.mensajesHistorial;


  constructor(
    private signal: MensajeriaSignal,
    private modal: UiModalService,
    private alert: AlertService,
    private signalPlanEstudio: PlanEstudioSignal,
    private mensajeriaService: MensajeriaService,
    private repository: MensajeriaRepository,
    private planEstudioRepository: PlanEstudioRepository,
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
    const rol = this.currentRol().rol.substring(0,3);
    const infoAdicional = rol == 'Dir' ? this.planEstudioSinResolucion().id.toString() : this.mensajesHistorial()[ this.mensajesHistorial().length - 1].informacionAdicional;
    console.log( infoAdicional );
    
    this.alert.sweetAlert('question', 'Confirmación', '¿Está seguro que desea enviar el mensaje?')
      .then( isConfirm => {
        if( !isConfirm ) return
        console.log( this.file().files.length );
        
        const mensajeResponder: MensajeriaResponderAlta = {
         
          idMensaje: this.selectedDestinatarioResponderA().idMensaje,
          idTipoMensajeRol: this.selectedDestinatarioResponderA().idTipoMensajeRol,
          idRolEmisor: parseInt( this.auth.currentRol().id ),
          idRolReceptor: this.selectedDestinatarioResponderA().idUsuarioRol, //TODO: ID DEL RECEPTOR this.mensajesHistorial()[0].informacionAdicional.toString()
          mensaje: this.mensaje.trim(),
          informacionAdicional: infoAdicional == '' ? 'none' : infoAdicional,
          archivo: this.file().files.length == 0 ? null : this.file().files[0]
        }
        console.log( mensajeResponder );
        
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
        this.signal.file.set( this.signal.fileDefault );
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

        !this.isModal() ? this.showCard() :  this.onAltaConfirm();
        

       }; break;
      case 'VAL': { 

        !this.isModal() ? this.showCard() :  this.onValidacionPlanEstudioConfirm( mensajeCerrar );


       }; break;
      case 'CAM': { 

        !this.isModal() ? this.showCard() :  this.onCambioPlanEstudioConfirm( mensajeCerrar );
        // this.showCard().then( response => {

        //   this.isModal() ?          this.onCambioPlanEstudioConfirm( mensajeCerrar );
        // } )
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

        
        //EDITAR CONSEJO
        this.aprobarNuevoPlan().then( isSuccess => {
          if( !isSuccess ) {
            this.alert.showAlert('Ocurrió un error al APROBAR el Plan de Estudios', 'error', 6);
            return;
          }
          this.alert.showAlert('Se aprobó el Plan de Estudios', 'success', 6);

          const mensajeCerrar: MensajeriaCerrarArchivar = {
            idMensaje: this.mensajesHistorial()[ this.mensajesHistorial().length -1].idMensaje,
            usuarioId: parseInt( this.auth.currentRol().id )
          }
          this.cerrarArchivar( mensajeCerrar );
          this.modal.getRefModal().close('Aprobado');
        })
      });

  }

  showCard = () => {
    return new Promise<boolean>( resolve => {

      // console.log( this.asunto );
      // this.asunto.click();
      this.abrirModal.set('showModal');
      // this.modal.openTemplate({
      //   template: this.PlanResolucion,
      //   titulo: 'APROBAR PLAN DE ESTUDIO'
      // });
      resolve( true )
    })
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
          this.signal.renderizarMensajes.set( 'Archivo' );
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


  aprobarNuevoPlan = () => {

    console.log( this.planEstudioPorAprobar() );
    
    const AprobarPlan: PlanEstudioEditCU = {
      ...this.planEstudioPorAprobar(),
      usuarioId: parseInt( this.currentRol().id )
    }

   return new Promise<boolean>( resolve => {
    this.planEstudioRepository.editarCU( AprobarPlan ).subscribe({
      next: ( response ) =>{
        console.log( response );
        resolve( true )
        
      }, error: ( error ) => {
        console.log( error);
        resolve( false )
      }
    })
   })
    
  }


  cerrarConfirm = () => {
    this.alert.sweetAlert('question', 'Confirmación', 'Está seguro que desea Forzar el Cierre de este mensaje, recuerde que una ves cerrado, el mensaje pasará a archivado y nadie más podrá responder ni realizar ninguna acción')
    .then( isConfirm => {
      if( !isConfirm ) {
        return
      }

      const cerrar: MensajeriaForzarCierre = {
        idMensaje: this.mensajesHistorial()[ this.mensajesHistorial().length - 1].idMensaje,
        usuarioId: parseInt( this.currentRol().id )
      }
      console.log( cerrar );
      this.forzarCierre( cerrar );

    })
  }

  forzarCierre = ( mensajeCerrar: MensajeriaForzarCierre) => {
    this.repository.forzarCierre( mensajeCerrar ).subscribe({
      next: ( response ) => {
        console.log( response );
        this.alert.showAlert('Mensaje fué cerrado de manera correcta', 'success');
        this.signal.renderizarMensajes.set( 'CierreForzado' );
        this.signal.setMensajeriaDataAsignacionDefault();
      }
    })
  }

  observar = ( template: TemplateRef<any> ) => {
    console.log( 'Observar mensaje, abrir modal...');
    this.modal.openTemplate({
      template: template,
      titulo: 'Observar'
    }).afterClosed().subscribe( response => {
      console.log( response);
      if( response == 'cancelar' ) return

    })
  }
}
