import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, WritableSignal, effect, viewChild } from '@angular/core';
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
import { ProgramaSignal } from 'src/app/programas-academicos/domain/signals/programa.signal';
import { PlanEstudioRepository } from 'src/app/plan-de-estudios/domain/repositories/plan-estudio.repository';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { PlanEstudio } from 'src/app/plan-de-estudios/domain/models/plan-estudio.model';
import { PlanEstudioCardComponent } from 'src/app/plan-de-estudios/ui/plan-estudio-card/plan-estudio-card.component';
import { ProgramaFacultad } from 'src/app/programas-academicos/domain/models/programa.model';


@Component({
  selector: 'mensajeria-new',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiSelectComponent,
    UiButtonComponent,
    QuillModule,
    ProgramaCardComponent,
    UiInputComponent,
    PlanEstudioCardComponent,

    ],
  templateUrl: './mensajeria-new.component.html',
  styleUrl: './mensajeria-new.component.scss'
})
export class MensajeriaNewComponent implements OnInit, OnDestroy {

  @ViewChild('templateProgramaCard') templateProgramaCard: TemplateRef<any>
  // tipoMensajeForm = new FormControl();
  tipoMensajeForm: FormGroup;
  listaDestinatarios = this.signal.listaDestinatarios;
  selectedDestinatario = this.signal.selectedDestinatario;
  tiposMensajesGrupo = this.signal.tiposMensajesGrupo;
  programasGlobal = this.programaSignal.programasGlobal;
  isModal = this.planEstudioSignal.isModal;
  planEstudioEdit = this.planEstudioSignal.planEstudioEdit;
  idPrograma: number = 0;
  planEstudio: PlanEstudio = {
    archivo: '',
    descripcionGrado: '',
    descripcionTitulo: '',
    detallePerfil: '',
    estadoCaducidad: '',
    estadoMatricula: '',
    id: 0,
    idProgramaAcademico: 0,
    finVigencia: '',
    inicioVigencia: '',
    nombre: '',
    resolucion: ''
  };

  tiposMensajes = this.signal.tiposMensajes;
  semestreSelect: WritableSignal<SemestreAcademico> = this.semestreSignal.semestreSelect;
  programaForAlta: Asignacion;
  existeProgramaForCard: boolean = false;
  nombrePrograma: string = '';
  tipoCard: 'ALTA' | 'VALIDAR' | 'CAMBIAR';
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
    private programaSignal: ProgramaSignal,
    private planEstudioRepository: PlanEstudioRepository,
    private planEstudioSignal: PlanEstudioSignal,
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
    let mensaje: MensajeriaEnviarNuevoMensaje = {
      idTipoMensajeRol: this.selectedDestinatario().idTipoMensajeRol,
      flujoNavegacion: 'Avanzar',
      asunto: this.getAsunto( this.tipoMensajeForm.value.tipoMensaje ).text + ' ' + this.semestreSelect().codigo,
      idRolEmisor: parseInt( this.authSignal.currentRol().id ),
      idRolReceptor: this.selectedDestinatario().idUsuarioRol,
      mensaje: this.mensaje,
      informacionAdicional: '',
      usuarioId: parseInt( this.authSignal.currentRol().id ),
    }
    console.log(mensaje);

    switch( this.tipoCard ) {


      case 'ALTA': {
        this.isRolAlta().then( isRolAlta => {
    
          const mensajeAlta: MensajeriaEnviarNuevoMensaje = {
            ...mensaje,
            informacionAdicional: this.programaForAlta.programas[0].idDirector.toString()
          }

          if( !isRolAlta ) {
            this.alert.sweetAlert('question', 'Confirmación', `Al enviar el mensaje, se le dará de alta al usuario ${ this.selectedDestinatario().apellidosYnombres } con el Rol de ${ this.selectedDestinatario().descripcion }, ¿Está seguro que desea enviar el mensaje?`)
              .then( isConfirm => {
                if( !isConfirm ) {
                  return
                }
    
                
                
                this.enviarMensaje( mensajeAlta );
                this.darAltaDecano();
              })
          }
    
          this.alert.sweetAlert('question', 'Confirmación', `¿Está seguro que desea enviar el mensaje?`)
            .then( isConfirm => {
              if( !isConfirm ) {
                return
              }
              this.enviarMensaje( mensajeAlta );
              
            });
    
        })
      }; break;

      case 'CAMBIAR': {
        this.alert.sweetAlert('question', 'Confirmación', `¿Está seguro que desea enviar el mensaje?`)
            .then( isConfirm => {
              if( !isConfirm ) {
                return
              }

              this.enviarMensaje( mensaje );
              
            });
      }; break;

      case 'VALIDAR': {
        this.alert.sweetAlert('question', 'Confirmación', `¿Está seguro que desea enviar el mensaje?`)
            .then( isConfirm => {
              if( !isConfirm ) {
                return
              }
              
              this.enviarMensaje( mensaje );
              
            });
      }; break
    }

    
  
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

  obtenerTipoCard() {
    const tipoGrupo = this.tipoMensajeForm.value.tipoMensajeGrupo;
    const asunto = this.getAsunto( this.tipoMensajeForm.value.tipoMensaje  );

    switch( parseInt(tipoGrupo) ) {
      
      case 1: { this.nombrePrograma = asunto.text.replace('DAR DE ALTA A DIRECTOR DE ESCUELA DE ', '');  this.tipoCard = 'ALTA'}; break;
      case 2: { this.nombrePrograma = asunto.text.replace('VALIDAR PLAN DE ESTUDIOS DE LA ESCUELA DE ', ''); this.tipoCard = 'VALIDAR' }; break;
      case 3: { this.nombrePrograma = asunto.text.replace('CAMBIAR EL PLAN DE ESTUDIOS DE ', ''); this.tipoCard = 'CAMBIAR' }; break;
    }

  }

  obtenerProgramaForAlta() {
    let programaAsignado: AsignacionPrograma[];
    // const asunto = this.getAsunto( this.tipoMensajeForm.value.tipoMensaje  );
    // const tipoGrupo = this.tipoMensajeForm.value.tipoMensajeGrupo;
    
    // let nombrePrograma = '';
    // console.log( tipoGrupo );


    
    // switch( parseInt(tipoGrupo) ) {
      
    //   case 1: { nombrePrograma = asunto.text.replace('DAR DE ALTA A DIRECTOR DE ESCUELA DE ', ''); }; break;
    //   case 2: { nombrePrograma = asunto.text.replace('VALIDAR PLAN DE ESTUDIOS DE LA ESCUELA DE ', ''); }; break;
    //   case 3: { nombrePrograma = asunto.text.replace('CAMBIAR EL PLAN DE ESTUDIOS DE ', ''); }; break;
    // }
    
    console.log( this.nombrePrograma );
    
    return new Promise<Asignacion | ''>( resolve => {
      
      this.repositoryAsignacion.obtener( this.semestreSelect().id ).subscribe({
        next: ( programasAsignados ) => {


          const asignacionFacultad = programasAsignados.filter( asignacionItem => {
            const asignacionPrograma = asignacionItem.programas.filter( programaItem => programaItem.nombrePrograma == this.nombrePrograma );
            
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

    this.obtenerTipoCard();


    console.log( this.tipoCard );
    

    switch( this.tipoCard ) {
      case 'ALTA': {
        setTimeout(() => {
          this.obtenerProgramaForAlta().then( programaForAlta => {
            
            if( programaForAlta == '' ) {
              // console.log('No hay programa encontrado');
              this.alert.showAlert(`No se encontró el programa académico`, 'error', 6);
              this.existeProgramaForCard = false;
              // this.tipoMensajeForm.value.programaExistente = ""
    
              throw('No hay programa encontrado');
            }
      
            this.programaForAlta = programaForAlta;
            this.existeProgramaForCard = true;
            this.alert.showAlert(`Programa académico encontrado`, 'success', 6);
    
            // this.tipoMensajeForm.value.programaExistente = 'true'
    
          })
        }, 200);
      } break;

      case 'CAMBIAR': {
        this.obtenerProgramaForPlan()
          .then( idPrograma => {
            if( idPrograma == 0 ) {
              this.alert.showAlert('El programa no fué encontrado', 'error', 6);
              this.existeProgramaForCard = false;

              throw('No hay programa encontrado');

            }
            this.existeProgramaForCard = true;
            this.idPrograma = idPrograma;
            this.obtenerPlanDeEstudios( idPrograma );
            
          })
      }; break;

      case 'VALIDAR': {
        this.obtenerProgramaForPlan()
          .then( idPrograma => {
            if( idPrograma == 0 ) {
              this.alert.showAlert('El programa no fué encontrado', 'error', 6);
              this.existeProgramaForCard = false;

              throw('No hay programa encontrado');

            }
            this.existeProgramaForCard = true;
            this.idPrograma = idPrograma;
            this.obtenerPlanDeEstudios( idPrograma );
            
          })
      }
    }
    
  } 

  showCardPrograma = ( template: TemplateRef<any> ) => {

    switch( this.tipoCard ) {
      case 'ALTA': {

        if( !this.existeProgramaForCard ) {
          this.alert.showAlert(`No se encontró el programa`, 'error', 6);
          return
        }
    
        this.modal.openTemplate( {
          template,
          titulo: 'Programa Académico'
        } );

      }; break;

      case 'CAMBIAR': {
        if( !this.existeProgramaForCard ) {
          this.alert.showAlert(`No se encontró el programa`, 'error', 6);
          return
        }

        const programa = this.programasGlobal().find( programa => programa.id == this.idPrograma );

        this.isModal.set( true );
        this.modal.openTemplate( {
          template,
          titulo:  `${ programa?.nombre }`
        } ).afterClosed().subscribe( response => {
          this.isModal.set( false );
          
        });
      }; break;

      case 'VALIDAR': {
        if( !this.existeProgramaForCard ) {
          this.alert.showAlert(`No se encontró el programa`, 'error', 6);
          return
        }

        const programa = this.programasGlobal().find( programa => programa.id == this.idPrograma );

        this.isModal.set( true );
        this.modal.openTemplate( {
          template,
          titulo:  `${ programa?.nombre }`
        } ).afterClosed().subscribe( response => {
          this.isModal.set( false );
          
        });
      }
    }

    

  }

  cancelar = () => {
    this.tipoMensajeForm.patchValue({
      tipoMensajeGrupo: '',
      tipoMensaje: '',
      destinatario: ''
    });

    this.signal.showFormNuevoMensaje.set( false );
  }

  obtenerProgramaForPlan = () => {

    return new Promise<number >( (resolve) => {
      const programa = this.programasGlobal().find( programa => programa.nombre == this.nombrePrograma );

      console.log( programa );
      if( programa === undefined ) {
        resolve( 0 )
      }

      resolve( programa!.id );
    });
    
  }

  obtenerPlanDeEstudios = ( idPrograma: number) => {
    this.planEstudioRepository.obtener( idPrograma ).subscribe({
      next: ( planes ) => {
        // console.log( planes );
        if( planes.length == 0 ) {
          
          this.modal.getRefModal().close('cancelar');
          this.alert.sweetAlert('info', 'El plan de estudios aún no ha sigo generado');
          return
        }

        // this.planEstudio = planes[ planes.length - 1];
        console.log( this.planEstudio );
        this.planEstudio = planes.find( plan => plan.resolucion == '') ?? planes[ planes.length - 1];
        this.planEstudioEdit.set(this.planEstudio);
        
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al listar los planes de estudios', 'error', 6);
        
      }
    })
  }

}
