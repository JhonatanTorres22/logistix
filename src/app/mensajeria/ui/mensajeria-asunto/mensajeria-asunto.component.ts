import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, Input, OnInit, TemplateRef, viewChild, ViewChild } from '@angular/core';

import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AsignacionPrograma, Asignacion } from 'src/app/programas-academicos/domain/models/asignacion.model';
import { MensajeriaHistorialMensajes } from '../../domain/models/mensajeria.model';
import { AlertService } from 'src/app/demo/services/alert.service';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { SemestreSignal } from 'src/app/programas-academicos/domain/signals/semestre.signal';
import { AsignacionRepository } from 'src/app/programas-academicos/domain/repositories/asignacion.repository';
import { ProgramaCardComponent } from 'src/app/programas-academicos/ui/programa-academico-page/programa-card/programa-card.component';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { PlanEstudioRepository } from 'src/app/plan-de-estudios/domain/repositories/plan-estudio.repository';
import { PlanEstudio } from 'src/app/plan-de-estudios/domain/models/plan-estudio.model';
import { InfoDirectorSignal } from 'src/app/auth/domain/signals/infoDirector.signal';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { PlanEstudioCardComponent } from 'src/app/plan-de-estudios/ui/plan-estudio-card/plan-estudio-card.component';
import { ProgramaRepository } from 'src/app/programas-academicos/domain/repositories/programa.repository';
import { ProgramaSignal } from 'src/app/programas-academicos/domain/signals/programa.signal';
import { Programa, ProgramaFacultad } from 'src/app/programas-academicos/domain/models/programa.model';
import { MensajeriaFlujoNavegacionComponent } from '../mensajeria-flujo-navegacion/mensajeria-flujo-navegacion.component';
import { PlanEstudioAprobarCuComponent } from 'src/app/plan-de-estudios/ui/plan-estudio-aprobar-cu/plan-estudio-aprobar-cu.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'mensajeria-asunto',
  standalone: true,
  imports: [ 
    CommonModule,
    SharedModule,
    UiButtonComponent,
    ProgramaCardComponent,
    MensajeriaFlujoNavegacionComponent,
    PlanEstudioAprobarCuComponent,
    PlanEstudioCardComponent
   ],
  templateUrl: './mensajeria-asunto.component.html',
  styleUrl: './mensajeria-asunto.component.scss'
})
export class MensajeriaAsuntoComponent implements OnInit {


  public asunto: Element = document.querySelector('#asunto')!;
  // @ViewChild('asunto') asunto: UiButtonComponent;
  @ViewChild('templateCard') templateCard: TemplateRef<any>

  director = this.auth.currentInfoDirector

  planSinResolucion: PlanEstudio[]
  modoTablet = this.signal.mensajeriaModoTablet;
  mensajesHistorial = this.signal.mensajesHistorial;
  checkInfoSuccess = this.signal.checkInfoSuccess;
  programasGlobal = this.programaSignal.programasGlobal;
  isModal = this.signalPlanEstudio.isModal;
  abrirModal = this.signal.abrirModal;
  planEstudioEdit = this.signalPlanEstudio.planEstudioEdit;
  planEstudioSinResolucion = this.signalPlanEstudio.planEstudioSinResolucion;
  
  tipoBandeja = this.signal.tipoBandeja;

  listaDestinatariosResponderA = this.signal.listaDestinatariosResponderA;
  listaDestinatariosResponderAflujo = this.signal.listaDestinatariosResponderAflujo;

  backToMail = this.signal.backToMail;


  mensajeHistorialSelect: MensajeriaHistorialMensajes;
  showButtons: boolean = false;
  esConforme: boolean = false;

  programaForAlta: Asignacion;
  programa: ProgramaFacultad;
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

  tipoCard: 'ALTA' | 'VALIDAR' | 'CAMBIAR';
  nombrePrograma: string = '';
  semestresAcademicos = this.semestreSignal.semestresAcademicos;
  semestreSelect = this.semestreSignal.semestreSelect;


  constructor(
    private auth: AuthSignal,
    private signalPlanEstudio: PlanEstudioSignal,
    private signal: MensajeriaSignal,
    private alert: AlertService,
    private modal: UiModalService,
    private semestreSignal: SemestreSignal,
    private repositoryAsignacion: AsignacionRepository,
    // private mensajeriaSignal: MensajeriaSignal,
    private programaSignal: ProgramaSignal,
    private repository: PlanEstudioRepository,
    private programaRepository: ProgramaRepository

  ) {

    effect( () => {
      console.log(this.abrirModal());
      if( this.abrirModal() == 'showModal') {
        this.openModalCard();  
        this.abrirModal.set('');    
      }
    }, { allowSignalWrites: true})
   }

  ngOnInit(): void {
    const asunto = this.mensajesHistorial()[0].asunto;
    this.getTipoCard( asunto );

    console.log('Init.');
    this.showCard( false );
  }

  onBackToMail = () => {
    this.backToMail.set( this.signal.backToMailDefault );
  }


  obtenerPlanesEstudio() {
    this.repository.obtener(this.director()[0].idProgramaAcademico).subscribe({
      next: ( planes ) => {
        this.planSinResolucion = planes.filter(plan => plan.resolucion === null);
        this.planEstudioSinResolucion.set( this.planSinResolucion[0] )
        console.log(this.planSinResolucion, 'sin resolucion');
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener los planes de estudios', 'error', 6);
      }
    })
  }

  showCard = ( showButtons: boolean ) => {
    

    console.log( this.tipoCard );
    

    switch( this.tipoCard ) {
      case 'ALTA': {

        this.obtenerProgramaForAlta()
          .then( programaForAlta => {
            console.log(programaForAlta,'programa form alta');
            this.mensajeHistorialSelect = this.mensajesHistorial()[0];
            this.showButtons = true
            if( programaForAlta == '' ) {
              // console.log('No hay programa encontrado');
              this.alert.showAlert(`No se encontró el programa`, 'error', 6);
              throw('No hay programa encontrado');
            }

            console.log( programaForAlta );
            this.programaForAlta = programaForAlta;
          
        
              
            //CALL OPEN MODAL CARD PROGRAMA ALTA

          })
      }; break;

      case 'CAMBIAR': {
    
        this.obtenerProgramaForPlan()
          .then( idPrograma => {
            if( idPrograma == 0 ) {
              this.alert.showAlert('El programa no fué encontrado', 'error', 6);
              throw('No hay programa encontrado');

            }
            this.programa = this.programasGlobal().find( programa => programa.id == idPrograma )!;
            this.obtenerPlanDeEstudios( idPrograma );
            //CALL OPEN MODAL CARD PLAN ESTUDIO
          });
      }; break;

      case 'VALIDAR': {
        this.obtenerProgramaForPlan()
          .then( idPrograma => {
            if( idPrograma == 0 ) {
              this.alert.showAlert('El programa no fué encontrado', 'error', 6);
              throw('No hay programa encontrado');

            }
            this.programa = this.programasGlobal().find( programa => programa.id == idPrograma )!;
            this.obtenerPlanDeEstudios( idPrograma );
            //CALL OPEN MODAL CARD PLAN ESTUDIO
          });
      }
    }
    // this.obtenerPlanesEstudio();
    
  }

  // showCard
  openModalCard = () => {
    this.isModal.set( true );
    if( this.planEstudio.id == 0 && this.tipoCard !== 'ALTA'  ) {
      this.alert.sweetAlert('info', 'El plan de estudios aún no ha sigo generado');
      return
    }
    this.modal.openTemplate( {
      template: this.templateCard,
      titulo:  'Programa Académico'
    } ).afterClosed().subscribe( response => {
      this.isModal.set( false );
      if( response == 'cancelar') {
        this.checkInfoSuccess.set( false );
        this.esConforme = false;
      }
      console.log( response );
      
    });
  }
  // openModalCardPlanEstudio = ( programa: ProgramaFacultad) => {
  //   this.isModal.set( true );
  //   this.modal.openTemplate( {
  //     template: this.templateCard,
  //     titulo:  `${ programa?.nombre }`
  //   } ).afterClosed().subscribe( response => {
  //     this.isModal.set( false );
      
  //   });
  // }

  getSemestre = ( codigo: string ) => {
    const semestre = this.semestresAcademicos().find( semestre => semestre.codigo == codigo );

    return semestre ? semestre : this.semestreSelect();
  }

  // tipoAccion: string = '';

  getTipoCard = ( asunto: string ) => {

    switch( (asunto ).substring(0, 3) ) {
      
      case 'DAR': { 
        this.nombrePrograma = asunto.replace('DAR DE ALTA A DIRECTOR DE ESCUELA DE ', '');
        this.tipoCard = 'ALTA';

       }; break;
      case 'VAL': { 
        this.nombrePrograma = asunto.replace('VALIDAR PLAN DE ESTUDIOS DE LA ESCUELA DE ', '');
        this.tipoCard = 'VALIDAR';

       }; break;
      case 'CAM': { 
        this.nombrePrograma = asunto.replace('CAMBIAR EL PLAN DE ESTUDIOS DE ', '');
        this.tipoCard = 'CAMBIAR';

       }; break;
    }
    this.nombrePrograma = this.nombrePrograma.substring(0, this.nombrePrograma.length - 7);
  }

  obtenerProgramaForAlta() {
    let programaAsignado: AsignacionPrograma[];
    const asunto = this.mensajesHistorial()[0].asunto;
    // let nombrePrograma = '';
    
    // let nombrePrograma = asunto.replace('DAR DE ALTA A DIRECTOR DE ESCUELA DE ', '');
    const semestreCodigo = asunto.substring( asunto.length - 6)

    const semestre = this.getSemestre( semestreCodigo );
    
    // nombrePrograma = nombrePrograma.substring(0, nombrePrograma.length - 7);


    return new Promise<Asignacion | ''>( resolve => {
      
      this.repositoryAsignacion.obtener( semestre.id ).subscribe({
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
          this.alert.showAlert('Ocurrió un error al listar las programas asignados: ' + error, 'error', 6);
          resolve( '' );
        }
      });
    })

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
    this.repository.obtener( idPrograma ).subscribe({
      next: ( planes ) => {
        console.log( planes );
        if( planes.length == 0 ) {
          this.planEstudio = this.signalPlanEstudio.planEstudioDefault;
          this.modal.getRefModal()?.close('cancelar');
          this.alert.sweetAlert('info', 'El plan de estudios aún no ha sigo generado');
          return
        }

        // this.planEstudio = planes[ planes.length - 1];
        console.log( this.planEstudio );
        const ultimoMensaje = this.mensajesHistorial()[ this.mensajesHistorial().length - 1 ];

        this.planEstudio = planes.find( plan => plan.resolucion == '' || plan.resolucion == null ) ?? planes[ planes.length - 1];
        // console.log( this.planEstudio );
        
        if( ultimoMensaje.informacionAdicional !== '' || ultimoMensaje.informacionAdicional !== null ) {
          this.planEstudio = planes.find( plan => plan.id == parseInt( ultimoMensaje.informacionAdicional ) ) ?? planes[ planes.length - 1]
        }

        console.log( this.planEstudio );
        

        this.planEstudioSinResolucion.set(this.planEstudio);  //planEstudiosEdit
        
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al listar los planes de estudios', 'error', 6);
        
      }
    })
  }

  
  
  onChecked = ( event: MatCheckboxChange ) => {
    console.log( event );
    this.checkInfoSuccess.set( event.checked );
  }

}
