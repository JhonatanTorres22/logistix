import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, TemplateRef, WritableSignal, effect } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { UiInputComponent } from "../../../core/components/ui-input/ui-input.component";


@Component({
  selector: 'mensajeria-new',
  standalone: true,
  imports: [CommonModule, SharedModule, UiSelectComponent, UiButtonComponent, QuillModule, ProgramaCardComponent, UiInputComponent, UiInputComponent],
  templateUrl: './mensajeria-new.component.html',
  styleUrl: './mensajeria-new.component.scss'
})
export class MensajeriaNewComponent implements OnInit, OnDestroy {

  // tipoMensajeForm = new FormControl();
  tipoMensajeForm: FormGroup;
  listaDestinatarios = this.signal.listaDestinatarios;
  selectedDestinatario = this.signal.selectedDestinatario;
  tiposMensajesGrupo = this.signal.tiposMensajesGrupo;
  tiposMensajes = this.signal.tiposMensajes;
  semestreSelect: WritableSignal<SemestreAcademico> = this.semestreSignal.semestreSelect;
  programaForAlta: Asignacion;
  existeProgramaForAlta: boolean = false;
  loading: boolean = true;
  // selectDestinatario = this.signal.selectDestinatario;
  // selectDestinatario: MensajeriaNuevoMensajeList;
  // asunto: UiSelect = {
  //   disabled: false,
  //   text: '',
  //   value: ''
  // };

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
    private fb: FormBuilder
  ) {
    this.tipoMensajeForm = this.fb.group({
      tipoMensajeGrupo: ['', [Validators.required] ],
      tipoMensaje: ['', [Validators.required] ],
      destinatario: ['', [Validators.required] ],
      // programaExistente:['', Validators.required ]
    });

    effect( () => {
      // console.log('semestre changed');
      console.log(this.semestreSelect());
      // if( this.semestreSelect().id != 0 ) {
        this.searchPrograma();
      // }
      
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
          this.tiposMensajesGrupo.set( tiposMensajesGrupo );
          if( tiposMensajesGrupo.length == 0 ) {
            this.alert.sweetAlert('info', 'NO ADMISIBLE', 'Ud. no está admitido para iniciar un nuevo mensaje, si crees que se trata de un error, comunicate con el adminsitrador.');
            this.signal.showFormNuevoMensaje.set(false);
            resolve( false )
          }
          this.loading = false
          // this.tiposMensajes.set([])
          // this.tipoMensajeForm.reset();
          resolve( true );
        }, error: ( error ) => {
          this.loading = false
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
        this.tipoMensajeForm.patchValue({
          destinatario: '',
          tipoMensaje: ''
        })
        // this.signal.setListaDestinatariosDefault();
        // this.tipoMensajeForm.value.tipoMensaje = null;
        // this.tipoMensajeForm.value.destinatario = null;
        // this.existeProgramaForAlta = false;

        this.tiposMensajes.set( tiposMensajes )
        // this.listaDestinatarios.set([])
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
        this.tipoMensajeForm.patchValue({
          destinatario: '',

        })
        // this.tipoMensajeForm.value.destinatario = null;

      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al listar los destinatarios: ' + error, 'error', 6);
      }
    })
  }

  ngOnDestroy(): void {
    this.signal.tiposMensajes.set( this.signal.tiposMensajeDefault );
    this.listaDestinatarios.set( this.signal.listaDestinatariosDefault );
  }

  getAsunto = ( id: number ): UiSelect => {
    const asuntoSelected = this.tiposMensajes().filter( tipo => tipo.value == id.toString());
    return asuntoSelected[0];
  }

  getDestinatario = ( id: number ): MensajeriaNuevoMensajeList => {
    if( id ) {
      return  this.signal.destinatarioSelectedDefault;
    }
    const destinatario = this.listaDestinatarios().filter( decano => decano.idUsuarioRol == id );
    this.selectedDestinatario.set( destinatario[0] )
    return destinatario[0]
  }

  setDestinatario = ( id: number ) => {
    console.log( id );
    
    if( !id ) {
      return  this.selectedDestinatario.set( this.signal.destinatarioSelectedDefault );
    }
    const destinatario = this.listaDestinatarios().filter( destinatario => destinatario.idUsuarioRol == id );
    this.selectedDestinatario.set( destinatario[0] )
  }




  showCompose = ( id: number ) => {
    
  }

  enviarConfirm = () => {

    //TODO: VERIFICAR ALTA DEL DECANO
    // const decano = this.getDestinatario( this.tipoMensajeForm.value.destinatario );
    this.isRolAlta().then( isRolAlta => {

      const destinatario = this.selectedDestinatario;

            const mensaje: MensajeriaEnviarNuevoMensaje = {
              idTipoMensajeRol: this.selectedDestinatario().idTipoMensajeRol,
              flujoNavegacion: 'Avanzar',
              asunto: this.getAsunto( this.tipoMensajeForm.value.tipoMensaje ).text + ' ' + this.semestreSelect().codigo,
              idRolEmisor: parseInt( this.authSignal.currentRol().id ),
              idRolReceptor: this.selectedDestinatario().idUsuarioRol,
              mensaje: this.mensaje,
              informacionAdicional: this.programaForAlta.programas[0].idDirector.toString(),
              usuarioId: parseInt( this.authSignal.currentRol().id ),
            }

            console.log(mensaje);
            

      if( !isRolAlta ) {
        this.alert.sweetAlert('question', 'Confirmación', `Al enviar el mensaje, se le dará de alta al usuario ${ this.selectedDestinatario().apellidosYnombres } con el Rol de ${ this.selectedDestinatario().descripcion }, ¿Está seguro que desea enviar el mensaje?`)
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

    //TODO implementar: ensureMensaje()
    console.log( mensaje);
    this.repository.enviarNuevoMensaje( mensaje ).subscribe({
      
      next: ( data ) => {
        console.log( data );
        this.alert.showAlert('Mensaje enviado correctamente', 'success', 6);
        this.signal.renderizarMensajes.set( 'Enviados' );
      this.signal.showFormNuevoMensaje.set( false );

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
    const tipoGrupo = this.tipoMensajeForm.value.tipoMensajeGrupo;
    
    let nombrePrograma = '';
    console.log( tipoGrupo );

    // this.tiposMensajes().find()
    
    switch( parseInt(tipoGrupo) ) {
      
      case 1: { nombrePrograma = asunto.text.replace('DAR DE ALTA A DIRECTOR DE ESCUELA DE ', ''); }; break;
      case 2: { nombrePrograma = asunto.text.replace('VALIDAR PLAN DE ESTUDIOS DE LA ESCUELA DE ', ''); }; break;
      case 3: { nombrePrograma = asunto.text.replace('CAMBIAR EL PLAN DE ESTUDIOS DE ', ''); }; break;
    }
    
    console.log( nombrePrograma );
    
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

  searchPrograma = () => {
    // this.tipoMensajeForm.value.tipoMensaje == ''
    console.log( this.tipoMensajeForm.value.tipoMensajeGrupo );
    
    if( !this.tipoMensajeForm.value.tipoMensajeGrupo ) {
      return
    }

    setTimeout(() => {
      this.obtenerProgramaForAlta().then( programaForAlta => {
        
        if( programaForAlta == '' ) {
          // console.log('No hay programa encontrado');
          this.alert.showAlert(`No se encontró el programa académico`, 'error', 6);
          this.existeProgramaForAlta = false;
          // this.tipoMensajeForm.value.programaExistente = ""

          throw('No hay programa encontrado');
        }
  
        this.programaForAlta = programaForAlta;
        this.existeProgramaForAlta = true;
        this.alert.showAlert(`Programa académico encontrado`, 'success', 6);

        // this.tipoMensajeForm.value.programaExistente = 'true'

      })
    }, 200);
  } 

  showCardPrograma = ( template: TemplateRef<any> ) => {

    if( !this.existeProgramaForAlta ) {
      this.alert.showAlert(`No se encontró el programa`, 'error', 6);
      return
    }

    this.modal.openTemplate( {
      template,
      titulo: 'Programa Académico'
    } );

  }

  cancelar = () => {
    this.tipoMensajeForm.patchValue({
      tipoMensajeGrupo: '',
      tipoMensaje: '',
      destinatario: ''
    });

    this.signal.showFormNuevoMensaje.set( false );
  }

}
