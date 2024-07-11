import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiSelectComponent } from 'src/app/core/components/ui-select/ui-select.component';
import { UiSelect } from 'src/app/core/components/ui-select/ui-select.interface';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaRepository } from '../../domain/repositories/mensajeria.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { MensajeriaEnviarNuevoMensaje, MensajeriaNuevoMensajeList } from '../../domain/models/mensajeria.model';
import { QuillModule } from 'ngx-quill';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { ProgramaCardComponent } from 'src/app/programas-academicos/ui/programa-academico-page/programa-card/programa-card.component';
import { uiModalTemplateData } from 'src/app/core/components/ui-modal/ui-modal.interface';
import { AsignacionSignal } from 'src/app/programas-academicos/domain/signals/asignacion.signal';
import { AsignacionRepository } from 'src/app/programas-academicos/domain/repositories/asignacion.repository';
import { SemestreAcademico } from 'src/app/programas-academicos/domain/models/semestre-academico.model';
import { SemestreSignal } from 'src/app/programas-academicos/domain/signals/semestre.signal';
import { Asignacion, AsignacionPrograma } from 'src/app/programas-academicos/domain/models/asignacion.model';
import { UsuarioRepository } from 'src/app/usuarios/domain/repositories/usuario.repository';
import { UsuarioRolRepository } from 'src/app/usuarios/domain/repositories/usuario-rol.repository';
import { UsuarioRolAlta } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';


@Component({
  selector: 'mensajeria-new',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiSelectComponent, UiButtonComponent, QuillModule, ProgramaCardComponent ],
  templateUrl: './mensajeria-new.component.html',
  styleUrl: './mensajeria-new.component.scss'
})
export class MensajeriaNewComponent implements OnInit {

  // tipoMensajeForm = new FormControl();
  tipoMensajeForm: FormGroup;
  listaDestinatarios = this.signal.listaDestinatarios;
  tiposMensajesGrupo = this.signal.tiposMensajesGrupo;
  tiposMensajes = this.signal.tiposMensajes;
  semestreSelect: WritableSignal<SemestreAcademico> = this.semestreSignal.semestreSelect;
  programaForAlta: Asignacion;

  // selectDestinatario = this.signal.selectDestinatario;
  selectDestinatario: MensajeriaNuevoMensajeList;
  asunto: UiSelect = {
    disabled: false,
    text: '',
    value: ''
  };

  mensaje: string = '';

  constructor(
    private repository: MensajeriaRepository,
    private signal: MensajeriaSignal,
    private alert: AlertService,
    private modal: UiModalService,
    private repositoryAsignacion: AsignacionRepository,
    private asignacionSignal: AsignacionSignal,
    private semestreSignal: SemestreSignal,
    private usuarioRolRepository: UsuarioRolRepository,
    private authSignal: AuthSignal,
  ) {
    this.tipoMensajeForm = new FormGroup({
      tipoMensajeGrupo: new FormControl('', Validators.required ),
      tipoMensaje: new FormControl('', Validators.required ),
      destinatario: new FormControl('', Validators.required )
    })
  }
  ngOnInit(): void {
    this.obtenerTipoMensajesGrupo();
  }


  onChange = ( $event: number ) => {
    console.log( $event );
    // this.buscarDestinatario( $event );
  }

  // buscarDestinatario = ( idTipoMensaje: number ) => {
  //   this.repository.nuevoMensajeA( idTipoMensaje ).subscribe({
  //     next: ( remitentes ) => {
  //       console.log( remitentes );
  //       this.listaDestinatarios.set( remitentes );
  //     }, error: ( error ) => {
  //       console.log( error );
  //       this.alert.showAlert('Ocurrió un error al listar los remitentes: ' + error, 'error', 6);
  //     }
  //   })
  // }

  obtenerTipoMensajesGrupo = () => {
    return new Promise<boolean>( (resolve ) => {
      this.repository.obtenerTipoMensajeGrupo().subscribe({
        next: ( tiposMensajesGrupo ) => {
          console.log( tiposMensajesGrupo );
          this.tiposMensajesGrupo.set( tiposMensajesGrupo )
          resolve( true );
        }, error: ( error ) => {
          console.log( error );
          this.alert.showAlert('Ocurrió un error al listar las categorias: ' + error, 'error', 6);
          resolve( false )
        }
      });
    })
  }

  obtenerTipoMensaje = ( idTipoMensajeGrupo: number ) => {
    this.repository.obtenerTipoMensaje( idTipoMensajeGrupo ).subscribe({
      next: ( tiposMensajes ) => {
        console.log( tiposMensajes );
        this.signal.setListaDestinatariosDefault();
        this.tipoMensajeForm.value.destinatario = '';
        this.tiposMensajes.set( tiposMensajes )
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al listar los tipos de mensajes: ' + error, 'error', 6);
      }
    })
  }

  obtenerDestinatarios = ( idTipoMensaje: number ) => {
    console.log( idTipoMensaje );
    
    this.repository.nuevoMensajeA( idTipoMensaje ).subscribe({
      next: ( destinatarios ) => {
        console.log( destinatarios );
        this.signal.listaDestinatarios.set( destinatarios );
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al listar los destinatarios: ' + error, 'error', 6);
      }
    })
  }

  getAsunto = ( id: number ): UiSelect => {
    const asuntoSelected = this.tiposMensajes().filter( tipo => tipo.value == id.toString());
    return asuntoSelected[0];
  }

  getDestinatario = ( id: number ): MensajeriaNuevoMensajeList => {
    const decanoSelected = this.listaDestinatarios().filter( decano => decano.idUsuarioRol == id );

    return decanoSelected[0]
  }


  showCompose = ( id: number ) => {
    
  }

  enviarConfirm = () => {

    //TODO: VERIFICAR ALTA DEL DECANO
    // const decano = this.getDestinatario( this.tipoMensajeForm.value.destinatario );
    this.isRolAlta().then( isRolAlta => {

      const destinatario = this.getDestinatario( this.tipoMensajeForm.value.destinatario )

            const mensaje: MensajeriaEnviarNuevoMensaje = {
              idTipoMensajeRol: destinatario.idTipoMensajeRol,
              flujoNavegacion: 'Avanzar',
              asunto: this.getAsunto( this.tipoMensajeForm.value.tipoMensaje ).text + ' ' + this.semestreSelect().codigo,
              idRolEmisor: parseInt( this.authSignal.currentRol().id ),
              idRolReceptor: destinatario.idUsuarioRol,
              mensaje: this.mensaje,
              informacionAdicional: this.programaForAlta.programas[0].idDirector.toString(),
              usuarioId: parseInt( this.authSignal.currentRol().id ),
            }

      if( !isRolAlta ) {
        this.alert.sweetAlert('question', 'Confirmación', `Al enviar el mensaje, se le dará de alta al usuario ${ destinatario.apellidosYnombres } con el Rol de ${ destinatario.descripcion }, ¿Está seguro que desea enviar el mensaje?`)
          .then( isConfirm => {
            if( !isConfirm ) {
              return
            }

            
            this.enviarMensaje( mensaje );
            this.darAltaDecano();
          })
      }

      this.alert.sweetAlert('question', 'Confirmación', `¿Está seguro que desea enviar el mensaje?`)
        .then( isConfirm => {
          if( !isConfirm ) {
            return
          }
          this.enviarMensaje( mensaje );
          
        })

    })
  
  }

  enviarMensaje( mensaje: MensajeriaEnviarNuevoMensaje ) {
    console.log( mensaje);
    this.repository.enviarNuevoMensaje( mensaje ).subscribe({
      
      next: ( data ) => {
        console.log( data );
        this.alert.showAlert('Mensaje enviado correctamente', 'success', 6);
        this.signal.renderizarMensajes.set( 'Enviados' );
        this.signal.setMensajeriaDataAsignacionDefault();
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al enviar e mensaje', 'error', 5);
        
      }
    })
  }

  isRolAlta() {
    return new Promise<boolean>( resolve => {
      this.usuarioRolRepository.obtenerUsuariosRol().subscribe({
        next: ( usuarios ) => {
          const decanoRolIsAlta = usuarios.filter( usuario => usuario.id == this.tipoMensajeForm.value.destinatario );

          if( decanoRolIsAlta.length == 0 ) {
            resolve( false )
          }
          decanoRolIsAlta[0].alta == 'ALTA' ? resolve( true ) : resolve( false )
        }, error: ( error ) => {
          console.log( error );
          this.alert.showAlert('Ocurrió un error al verificar el estado de ALTA del DECANO', 'error', 6);
          resolve( false )
        }
      });


    });

  }

  darAltaDecano() {
    // console.log(userRol);
    
    this.usuarioRolRepository.darAltaRolUser( this.tipoMensajeForm.value.destinatario ).subscribe({
      next: ( data ) => {
        this.alert.showAlert('El decano fué dado de ALTA', 'success');
        console.log('No tenía Alta, ahora si está dado de ALTA', data);
        this.signal.renderizarMensajes.set( 'Enviados' );
        this.signal.setMensajeriaDataAsignacionDefault();
      }, error: ( error ) => {
        this.alert.showAlert('Ocurrió un error al dar de alta al decano:' + error, 'error');
      }
    })
  }

  obtenerProgramaForAlta() {
    let programaAsignado: AsignacionPrograma[];
    const asunto = this.getAsunto( this.tipoMensajeForm.value.tipoMensaje  );
    const nombrePrograma = asunto.text.replace('DAR DE ALTA A DIRECTOR DE ESCUELA DE ', '');
    
    return new Promise<Asignacion | ''>( resolve => {
      
      this.repositoryAsignacion.obtener( this.semestreSelect().id ).subscribe({
        next: ( programasAsignados ) => {


          const asignacionFacultad = programasAsignados.filter( asignacionItem => {
            const asignacionPrograma = asignacionItem.programas.filter( programaItem => programaItem.nombrePrograma == nombrePrograma );
            
            if( asignacionPrograma.length > 0 ) {
              programaAsignado = asignacionPrograma
              return asignacionPrograma
            }
            return
          });

          if( asignacionFacultad.length == 0 ) {
            resolve('');
            
          }
          const data: Asignacion = {
            ...asignacionFacultad[0],
            programas: programaAsignado ? programaAsignado : []
          }
          
          resolve( data );
        }, error: ( error ) => {
          console.log( error );
          this.alert.showAlert('Ocurrió un error al listar las programasAsignados: ' + error, 'error', 6);
          resolve( '' );
        }
      });
    })

  }

  showCardPrograma = ( template: TemplateRef<any> ) => {
    this.obtenerProgramaForAlta()
      .then( programaForAlta => {
        
        if( programaForAlta == '' ) {
          // console.log('No hay programa encontrado');
          this.alert.showAlert(`No se encontró el programa`, 'error', 6);
          throw('No hay programa encontrado');
        }

        console.log( programaForAlta );
        this.programaForAlta = programaForAlta;
       
    
          this.modal.openTemplate( {
            template,
            titulo: ''
          } )
  

      } )
  }

}
