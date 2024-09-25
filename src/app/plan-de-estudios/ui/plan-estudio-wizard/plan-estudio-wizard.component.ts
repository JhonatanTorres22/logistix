import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MallaCurricularListComponent } from "../malla-curricular-page/malla-curricular-list/malla-curricular-list.component";
import { UiButtonComponent } from "../../../core/components/ui-button/ui-button.component";
import { Design, Replacement } from './wizard.state';
import { PlanEstudioRepository } from '../../domain/repositories/plan-estudio.repository';
import { CursoSignal } from '../../domain/signal/curso.signal';
import { PlanEstudioSignal } from '../../domain/signal/plan-estudio.signal';
import { CursoListComponent } from "../curso-page/curso-list/curso-list.component";
import { CursoPlanEliminar, CursoPlanListar, PlanEstudio, PlanEstudioCursoInsertar } from '../../domain/models/plan-estudio.model';
import { Alert } from 'src/app/core/components/ui-alert/alert.interface';
import { AlertService } from 'src/app/demo/services/alert.service';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { MatStepper } from '@angular/material/stepper';
import { CursoPlanRepository } from '../../domain/repositories/curso-plan.repository';
import { CursoPlanEquivalencia } from '../../domain/models/curso-plan.model';
// import { parse } from 'date-fns';
import * as d3 from "d3";
@Component({
  selector: 'app-plan-estudio-wizard',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MallaCurricularListComponent,
    UiButtonComponent,
    CursoListComponent
],
  templateUrl: './plan-estudio-wizard.component.html',
  styleUrl: './plan-estudio-wizard.component.scss'
})
export class PlanEstudioWizardComponent implements OnInit, AfterViewInit {

  cursosPlanByCiclos = this.cursoSignal.cursosPlanByCiclos;
  planEstudioUltimoConResolucion = this.signal.planEstudioUltimoConResolucion;
  cursosList = this.cursoSignal.cursosList;
  planEstudioSelect = this.signal.planEstudioSelect;
  planEstudioStepper = this.signal.planEstudioStepper;
  cursosPlan = this.cursoSignal.cursosPlan;
  currentRol = this.authSignal.currentRol;
  private _formBuilder = inject(FormBuilder);
  formDisenar: FormGroup;
  formAsignar: FormGroup;

  showBtnActivarEdicion: boolean = false;

  cursosPlanEquivalenciaActual: CursoPlanEquivalencia[] = [];
  cursosPlanEquivalenciaUltimo: CursoPlanEquivalencia[] = [];

  // @ViewChild('stepper') stepper: 
  @ViewChild('stepper')
  stepper!: MatStepper;
  // stepperOrientation: Observable<StepperOrientation>;
  // moveSteper(steper: number) {
  //   this.stepper.selectedIndex = steper;
  // }

  constructor(
    private planEstudioRepository: PlanEstudioRepository,
    private CursoPlanRepository: CursoPlanRepository,
    private cursoSignal: CursoSignal,
    private signal: PlanEstudioSignal,
    private authSignal: AuthSignal,
    private alert: AlertService,
  ) {
    this.formDisenar = this._formBuilder.group({
      firstCtrl: ['1', Validators.required],
    });
    this.formAsignar = this._formBuilder.group({
      asignacion: ['', Validators.required],
    });
    effect( () => {
      console.log( 'Effect: ', this.planEstudioUltimoConResolucion() );
      this.obtenerCursoPlanEquivalenciaUltimo();
    })
  }
  ngOnInit(): void {
    
    // this.initArrowSVG();
    // window.addEventListener('resize', this.redrawArrows.bind(this));
    // this.ngAfterViewInit()
    // setTimeout(() => {
    //   // if( this.cursosPlanByCiclos().length > 0 ) {
    //   //   console.log('Design');
        
    //   //   this.estado.setState = new Design();
    //   //   this.estado.setEstado = 'Design';
    //   //   console.log( this.estado.getEstado );
        
    //   // }
    //   // this.obtenerCursoPlanUltimo();
    // }, 2000);

    this.obtenerCursoPlanEquivalenciaActual();
    setTimeout(() => {
      this.ngAfterViewInit()
    }, 500);
  }

  estado = new Replacement();

  isEditable = true;

  validarEstado = ( control: AbstractControl ) => {
    if( this.estado.getEstado === 'Equivalence' ) {
      return control.value === 'Equivalence' ? null : { invalidMaxLength: true };
      // return { error: true, estado: 'No cumple' };
    }

    return null
  }
  
  guardar = () => {
    console.log('Guardando...');
    
    // const estado = new Replacement();
    // estado.setState =  new Design();
    this.estado.approve(true);
    console.log(this.estado.getEstado);
    this.formDisenar.patchValue({firstCtrl: this.estado.getEstado});
    this.formAsignar.patchValue({secondCtrl: this.estado.getEstado});
    
  }



  obtenerCursoPlanEquivalenciaUltimo = () => {
    console.log( this.planEstudioUltimoConResolucion() );
    
    this.CursoPlanRepository.obtenerCursoPlanEquivalencia( this.planEstudioUltimoConResolucion().id ).subscribe({
      next: ( cursosPlanEquivalencia ) => {
        this.cursosPlanEquivalenciaUltimo = cursosPlanEquivalencia.sort( ( a, b ) => parseInt( a.cicloNumero ) - parseInt( b.cicloNumero ) );
        console.log( 'Plan Ultimo: ', cursosPlanEquivalencia );

      }, error: ( error ) => {
        console.log( error );
        
      }
    })
  }

  obtenerCursoPlanEquivalenciaActual = () => {
    this.CursoPlanRepository.obtenerCursoPlanEquivalencia( this.planEstudioSelect().id ).subscribe({
      next: ( cursosPlanEquivalencia ) => {
        // console.log(cursosPlanEquivalencia);
        
        if( cursosPlanEquivalencia.length != 0 ) {
          this.formAsignar.patchValue({asignacion: 'Asignar'});
        }
        this.cursosPlanEquivalenciaActual = cursosPlanEquivalencia.sort( ( a, b ) => parseInt( a.cicloNumero ) - parseInt( b.cicloNumero ) );
        this.showBtnActivarEdicion = this.cursosPlanEquivalenciaActual.length == 0 ? false : true;
        console.log( 'Plan Actual: ', cursosPlanEquivalencia );
        console.log('Plan estudio: ', this.planEstudioSelect().id);
        
      }, error: ( error ) => {
        console.log( error );
        
      }
    })
  }

  asignarConfirm = () => {
    this.alert.sweetAlert( 'question', 'Confirmar', '¿Está seguro que desea Asignar todos los cursos al Plan de Estudios?')
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }

        this.asignar();
      });
      
  }

  asignar = () => {

    let cursos: PlanEstudioCursoInsertar[] = [];
    if( this.cursosList().length == 0 ) {

      return
    }

    cursos = this.cursosList().map( curso => {
      return {
        idCurso: curso.id,
        idPlanEstudio: this.planEstudioSelect().id,
        usuarioId: parseInt( this.authSignal.currentRol().id )
      }
      
    });

    console.log( cursos );
    // this.obtenerCursoPlanActual();
    // this.obtenerCursoPlanUltimo();
    // return
    this.planEstudioRepository.insertarCursoPlan(cursos).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alert.showAlert('Los cursos fueron asignados al plan de estudios', 'success', 6)
        this.obtenerCursoPlanEquivalenciaActual();
        // this.obtenerCursoPlanUltimo();
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al Asignar los cursos', 'error', 6)
      }
    });

  }

  next = () => {
    this.stepper.next();
  }

  activarEdicion = () => {
    this.alert.sweetAlert( 'question', 'Confirmar', 'Los cursos que fueron asignados al Plan de Estudios serán ELIMINADOS, ¿Está seguro que desea Activar la edición de los cursos?')
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }

        this.eliminarCursoPlan()
          // .then( isDeleted => {
          //   if( !isDeleted ) {
          //     return
          //   }

          //   this.showBtnActivarEdicion = false;
          // })
      })
  }

  eliminarCursoPlan = () => {
    // const cursosEliminar: CursoPlanEliminar[] = this.cursosPlan.map( curso => {
    //   return {
    //     idCursoPlan: curso.id,
    //     usuarioId: parseInt( this.authSignal.currentRol().id )
    //   }
    // })

    // return new Promise<boolean> ( resolve => {

    //   this.planEstudioRepository.eliminarCursoPlan( cursosEliminar ).subscribe({
    //     next: ( response ) => {
    //       console.log( response );
    //       resolve( true );
    //     }, error: ( error ) => {
    //       console.log( error );
    //       this.alert.showAlert('Ocurrió un error al eliminar los cursos del plan de estudios', 'error', 6)
    //       resolve( false )
    //     }
    //   });

    // });
    
  } 

  // CONEXIÓN DE LAS FLECHAS

  selectedLeftCard: CursoPlanEquivalencia
  selectedRightCard: CursoPlanEquivalencia;
  setearCursoPlanEquivalencia: CursoPlanEquivalencia = {
    idCursoPlan: 0,
    nombreCurso: '',
    codigoCurso: '',
    tipoCurso: '',
    tipoEstudio: '',
    horasTeoricas: 0,
    horasPracticas: 0,
    totalHoras: 0,
    totalCreditos: 0,
    cicloRomano: '',
    cicloNumero: '',
    cicloLetra: '',
    equivalencias: []
  }
  connections: { leftCardId: number, rightCardId: number }[] = []; // Array de conexiones
  
  ngAfterViewInit = () => {
    this.inicioFlechaSVG();
    window.addEventListener('resize', this.redibujarFlechaXZoom.bind(this));
  }

  inicioFlechaSVG = () => {
    const svg = d3.select('#arrowContainer')
      .attr('width', '100%')
      .attr('height', '100%');

    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 10)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', 'black')
      .style('stroke', 'none');
  }

  seleccionarCursoPlanProceso = (card: CursoPlanEquivalencia) => {
    this.selectedLeftCard = card;
    console.log('Selected Left Card:', card);
    this.cursosSeleccionadosParaDibujar();
  }

  seleccionarCursoPlanUltimo(card: CursoPlanEquivalencia): void {
    this.selectedRightCard = card;
    console.log('Selected Right Card:', card);
    this.cursosSeleccionadosParaDibujar();
  }

  cursosSeleccionadosParaDibujar = () => {
    if (this.selectedLeftCard && this.selectedRightCard) {
      this.dibujarFlechasEntreCursos();
    }
  }
  dibujarFlechasEntreCursos = () => {
    const svg = d3.select('#arrowContainer');

    const leftCardElement = document.getElementById(`cardLeft-${this.selectedLeftCard.idCursoPlan}`);
    const rightCardElement = document.getElementById(`cardRight-${this.selectedRightCard.idCursoPlan}`);

    // Asegúrate de que el contenedor esté correctamente referenciado
    const container = document.getElementById('arrowContainer'); // Asegúrate de tener el contenedor correcto

    // Verifica si el contenedor es null
    if (!container) {
      console.error('El contenedor de SVG no se encontró.');
      return; // Salir si el contenedor es null
    }
    const containerRect = container.getBoundingClientRect();
    if (leftCardElement && rightCardElement) {
      const leftRect = leftCardElement.getBoundingClientRect();
      const rightRect = rightCardElement.getBoundingClientRect();

      const startX = leftRect.right - containerRect.left - 20; // Ajusta la posición en relación al contenedor
      const startY = leftRect.top - containerRect.top + leftRect.height / 2; // Ajusta la posición en relación al contenedor
      const endX = rightRect.left - containerRect.left; // Ajusta la posición en relación al contenedor
      const endY = rightRect.top - containerRect.top + rightRect.height / 2; // Ajusta la posición en relación al contenedor


      // Verificar si la tarjeta derecha ya está conectada a alguna tarjeta izquierda
      const existingRightConnection = this.connections.find(connection => connection.rightCardId === this.selectedRightCard.idCursoPlan);

      if (existingRightConnection) {
        this.alert.sweetAlert('info', '¿IMPORTANTE!', 'Este curso ya se encuentra asociado a otro')
        // Si el card de la derecha ya está conectado, mostrar una alerta y no permitir la nueva conexión

        this.selectedLeftCard = { ...this.setearCursoPlanEquivalencia };
        this.selectedRightCard = { ...this.setearCursoPlanEquivalencia };
        return;
      }

      // Verificar si la tarjeta izquierda ya está conectada
      const existingLeftConnectionIndex = this.connections.findIndex(connection => connection.leftCardId === this.selectedLeftCard.idCursoPlan);

      // Si la tarjeta izquierda ya está conectada, eliminar su conexión anterior
      if (existingLeftConnectionIndex !== -1) {
        const existingLeftConnection = this.connections[existingLeftConnectionIndex];
        const existingArrowId = `arrow-${existingLeftConnection.leftCardId}-${existingLeftConnection.rightCardId}`;
        svg.select(`#${existingArrowId}`).remove(); // Eliminar la flecha existente
        this.connections.splice(existingLeftConnectionIndex, 1); // Eliminar la conexión del array
      }

      // Dibujar la nueva conexión
      const arrowId = `arrow-${this.selectedLeftCard.idCursoPlan}-${this.selectedRightCard.idCursoPlan}`;
      svg.append('line')
        .attr('id', arrowId)
        .attr('x1', startX)
        .attr('y1', startY)
        .attr('x2', endX)
        .attr('y2', endY)
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead)');

      // Agregar la nueva conexión al array
      this.connections.push({ leftCardId: this.selectedLeftCard.idCursoPlan, rightCardId: this.selectedRightCard.idCursoPlan });
      console.log('Conexiones actuales:', this.connections);
      this.selectedLeftCard = { ...this.setearCursoPlanEquivalencia };
      this.selectedRightCard = { ...this.setearCursoPlanEquivalencia };
    }
  }

  redibujarFlechaXZoom = () => {
    const svg = d3.select('#arrowContainer');
    svg.selectAll('line').remove(); // Eliminar todas las flechas existentes
    this.connections.forEach(connection => {
      const leftCardElement = document.getElementById(`cardLeft-${connection.leftCardId}`);
      const rightCardElement = document.getElementById(`cardRight-${connection.rightCardId}`);
      console.log(leftCardElement, 'left');
      console.log(rightCardElement, 'right');

      const container = document.getElementById('arrowContainer'); // Asegúrate de tener el contenedor correcto

      // Verifica si el contenedor es null
      if (!container) {
        console.error('El contenedor de SVG no se encontró.');
        return; // Salir si el contenedor es null
      }
      const containerRect = container.getBoundingClientRect();
      if (leftCardElement && rightCardElement) {
        const leftRect = leftCardElement.getBoundingClientRect();
        const rightRect = rightCardElement.getBoundingClientRect();

        const startX = leftRect.right - containerRect.left - 20; // Ajusta la posición en relación al contenedor
        const startY = leftRect.top - containerRect.top + leftRect.height / 2; // Ajusta la posición en relación al contenedor
        const endX = rightRect.left - containerRect.left; // Ajusta la posición en relación al contenedor
        const endY = rightRect.top - containerRect.top + rightRect.height / 2; // Ajusta la posición en relación al contenedor

        svg.append('line')
          .attr('x1', startX)
          .attr('y1', startY)
          .attr('x2', endX)
          .attr('y2', endY)
          .attr('stroke', 'black')
          .attr('stroke-width', 2)
          .attr('marker-end', 'url(#arrowhead)');
      }
    });
  }
}

