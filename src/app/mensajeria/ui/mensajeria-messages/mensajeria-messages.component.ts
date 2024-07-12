import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, signal } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MensajeriaNoMessagesComponent } from '../mensajeria-no-messages/mensajeria-no-messages.component';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { MensajeriaComposeComponent } from '../mensajeria-compose/mensajeria-compose.component';
import { MensajeriaResponseComponent } from '../mensajeria-response/mensajeria-response.component';
import { UsuarioRolRepository } from 'src/app/usuarios/domain/repositories/usuario-rol.repository';
import { UsuarioRol, UsuarioRolAlta } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { MensajeriaCerrarArchivar, MensajeriaHistorialMensajes } from '../../domain/models/mensajeria.model';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MensajeriaRepository } from '../../domain/repositories/mensajeria.repository';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { Asignacion, AsignacionPrograma } from 'src/app/programas-academicos/domain/models/asignacion.model';
import { AsignacionRepository } from 'src/app/programas-academicos/domain/repositories/asignacion.repository';
import { SemestreSignal } from 'src/app/programas-academicos/domain/signals/semestre.signal';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { ProgramaCardComponent } from 'src/app/programas-academicos/ui/programa-academico-page/programa-card/programa-card.component';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';

@Component({
  selector: 'mensajeria-messages',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatExpansionModule,
    MensajeriaNoMessagesComponent,
    MensajeriaComposeComponent,
    MensajeriaResponseComponent,
    UiButtonComponent,
    ProgramaCardComponent
  ],
  templateUrl: './mensajeria-messages.component.html',
  styleUrl: './mensajeria-messages.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class MensajeriaMessagesComponent implements OnInit {

  @Input() star = false;
  @Input() unStar = true;
  @Output() backToMail: EventEmitter<boolean> = new EventEmitter();
  showFormResponse = this.mensajeriaSignal.showFormResponse;
  readonly panelOpenState = signal(false);
  
  modoTablet = this.mensajeriaSignal.mensajeriaModoTablet;
  mensajesHistorial = this.mensajeriaSignal.mensajesHistorial;
  tipoBandeja = this.mensajeriaSignal.tipoBandeja;
  semestreSelect = this.semestreSignal.semestreSelect;
  semestresAcademicos = this.semestreSignal.semestresAcademicos;
  listaDestinatariosResponderA = this.mensajeriaSignal.listaDestinatariosResponderA;
  currentRol = this.authSignal.currentRol;
  programaForAlta: Asignacion;
  esConforme: boolean = false;
  showButtons: boolean = false;
  mensajeHistorialSelect: MensajeriaHistorialMensajes;
  constructor(
    private mensajeriaSignal: MensajeriaSignal,
    private userRolRepository: UsuarioRolRepository,
    private repository: MensajeriaRepository,
    private alert: AlertService,
    private repositoryAsignacion: AsignacionRepository,
    private semestreSignal: SemestreSignal,
    private modal: UiModalService,
    private authSignal: AuthSignal
  ) {}
  ngOnInit(): void {
    this.obtenerDestinatariosReponderA(this.mensajesHistorial()[ this.mensajesHistorial().length - 1].idMensaje );
    console.log(this.mensajesHistorial()[ this.mensajesHistorial().length - 1].idMensaje);
    
  }

  onObservacion() {

  }

  onResponder = () => {
    this.showFormResponse.set(true);
    console.log('mostrar');
    
  }

  onForzarCierre = () => {
    this.alert.sweetAlert('info', 'IMPLEMENTACIÓN PENDIENTE' ,'Falta Implementar, paciencia por favor....  :)')
  }

  onAltaConfirm = ( mensaje: MensajeriaHistorialMensajes ) => {
    console.log( mensaje );
    
    if( this.showFormResponse() ) {
      return;
    }

    this.alert.sweetAlert( 'question', 'Confirmación', `¿Está seguro que desea DAR DE ALTA al Director de Escuela?`)
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }

        const directorAlta: UsuarioRolAlta = {
          idRol: parseInt( mensaje.informacionAdicional ),
          usuarioId: 1
        }

        this.onAlta( directorAlta, mensaje )

      })

  }


  onAlta = ( userAlta: UsuarioRolAlta, mensaje: MensajeriaHistorialMensajes ) => {
    // console.log(userRol);
    
    
    this.userRolRepository.darAltaRolUser( userAlta ).subscribe({
      next: ( data ) => {
        const mensajeCerrar: MensajeriaCerrarArchivar = {
          idMensaje: mensaje.idMensaje
        }
        this.cerrarArchivar( mensajeCerrar ).then( completedSuccessfully => {
          if (!completedSuccessfully) {
            console.log('Hubo un error al archivar')
          }
          
          this.alert.showAlert('El Director fué dado de ALTA, y el Mensaje fué CERRADO y ARCHIVADO.', 'success');
          // console.log('No tenía Alta, ahora si está dado de ALTA');
          this.mensajeriaSignal.setMensajeriaDataAsignacionDefault();
          this.modal.getRefModal().close();
          // this.mensajesHistorial
          setTimeout(() => {
            this.mensajeriaSignal.renderizarMensajes.set( 'Alta' );
          }, 200);

        });
      }, error: ( error ) => {
        this.alert.showAlert('Ocurrió un error al dar de alta al decano:' + error, 'error');
      }
    })
  }

  cerrarArchivar = ( mensaje: MensajeriaCerrarArchivar ) => {
    
    return new Promise<boolean>( ( resolve, reject ) => {
      this.repository.cerrarArchivarMensaje( mensaje ).subscribe({
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
    })

  }

  onBackToMail = () => {
    this.backToMail.emit( true );
  }

  showCardPrograma = ( template: TemplateRef<any>, mensaje: MensajeriaHistorialMensajes, showButtons: boolean ) => {
    this.obtenerProgramaForAlta()
      .then( programaForAlta => {
        console.log(programaForAlta);
        this.mensajeHistorialSelect = mensaje;
        this.showButtons = showButtons
        if( programaForAlta == '' ) {
          // console.log('No hay programa encontrado');
          this.alert.showAlert(`No se encontró el programa`, 'error', 6);
          throw('No hay programa encontrado');
        }

        console.log( programaForAlta );
        this.programaForAlta = programaForAlta;
       
    
          this.modal.openTemplate( {
            template,
            titulo: 'Programa Académico'
          } )
  

      } )
  }

  getSemestre = ( codigo: string ) => {
    const semestre = this.semestresAcademicos().find( semestre => semestre.codigo == codigo );

    return semestre ? semestre : this.semestreSelect();
  }

  obtenerProgramaForAlta() {
    let programaAsignado: AsignacionPrograma[];
    const asunto = this.mensajesHistorial()[0].asunto;
    let nombrePrograma = asunto.replace('DAR DE ALTA A DIRECTOR DE ESCUELA DE ', '');
    const semestreCodigo = asunto.substring( asunto.length - 6)

    const semestre = this.getSemestre( semestreCodigo );
    
    nombrePrograma = nombrePrograma.substring(0, nombrePrograma.length - 7);

    // console.log(nombrePrograma);
  
    return new Promise<Asignacion | ''>( resolve => {
      
      this.repositoryAsignacion.obtener( semestre.id ).subscribe({
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

  obtenerDestinatariosReponderA( idMensaje: number ) {
    this.repository.responderMensajeA( idMensaje ).subscribe({
      next: ( destinatarioResponderA ) => {
        console.log( destinatarioResponderA );
        this.listaDestinatariosResponderA.set( destinatarioResponderA );
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al listar los destnatarios: ' + error, 'error', 6);

      }
    })
  }

}
