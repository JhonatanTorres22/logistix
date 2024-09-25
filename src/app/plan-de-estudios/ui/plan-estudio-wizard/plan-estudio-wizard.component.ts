import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, ViewChild } from '@angular/core';
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
import { parse } from 'date-fns';
import { EquivalenciaRepository } from '../../domain/repositories/equivalencia.repository';
import { EquivalenciaPrimarioInsert } from '../../domain/models/equivalencia.model';

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
export class PlanEstudioWizardComponent implements OnInit {

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

  cursosPrimarios: EquivalenciaPrimarioInsert[] = [];

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
    private EquivalenciaRepository: EquivalenciaRepository,
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
    this.obtenerCursoPlanActual();
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
        this.formAsignar.patchValue({asignacion: ''});
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
          .then( isDeleted => {
            if( !isDeleted ) {
              return
            }

            this.showBtnActivarEdicion = false;
            this.obtenerCursoPlanEquivalenciaActual();
          })
      })
  }

  eliminarCursoPlan = () => {
    const cursosEliminar: CursoPlanEliminar[] = this.cursosPlanEquivalenciaActual.map( curso => {
      return {
        idCursoPlan: curso.idCursoPlan,
        usuarioId: parseInt( this.authSignal.currentRol().id )
      }
    })

    return new Promise<boolean> ( resolve => {

      this.planEstudioRepository.eliminarCursoPlan( cursosEliminar ).subscribe({
        next: ( response ) => {
          console.log( response );
          resolve( true );
        }, error: ( error ) => {
          console.log( error );
          this.alert.showAlert('Ocurrió un error al eliminar los cursos del plan de estudios', 'error', 6)
          resolve( false )
        }
      });

    });
    
  } 


  obtenerCursoPlanActual = () => {
    this.planEstudioRepository.obtenerCursoPlan( this.planEstudioSelect().id ).subscribe({
      next: ( cursos ) => {
        this.cursosPlan.set( cursos );
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al listar los cursos del plan de estudios', 'error', 6)
      }
    });
  }

  guardarPrimariosConfirm = () => {

    this.alert.sweetAlert('question', 'Confirmación', 'Está seguro que desea guardar los cursos primarios')
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }

        this.guardarCursosPrimarios();
      })

  }

  guardarCursosPrimarios = () => {

    
    // const cursosPrimarios: EquivalenciaPrimarioInsert[] = this.cursosPlanEquivalenciaActual.map( curso => {
    //   return {
    //     cursoPlanId: curso.idCursoPlan,
    //     userId: parseInt( this.authSignal.currentRol().id )
    //   }
    // })

    // const cursosPrimario: CursoPlanEquivalencia[] = this.cursosPlanEquivalenciaActual.reduce( ( acc: CursoPlanEquivalencia[], curso: CursoPlanEquivalencia ) => {
    //   const existe = acc.find( c => c. == curso.idCursoPlan );
    //   if()

    //   return acc
    // }, [] );
    console.log( this.cursosPrimarios );
    
    this.EquivalenciaRepository.insertarEquivalenciaPrimario( this.cursosPrimarios ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alert.showAlert('Los cursos primarios fueron guardados correctamente', 'success', 6);
        this.obtenerCursoPlanEquivalenciaActual();
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al guardar los cursos primarios', 'error', 6);
      }
    });

  }

  update = ( value: boolean, curso: CursoPlanEquivalencia ) => {
    console.log( 'Check: ', value, 'Curso: ', curso );
    if( !value ) {
      this.cursosPrimarios = this.cursosPrimarios.filter( c => c.cursoPlanId != curso.idCursoPlan );
      return
    }
    this.cursosPrimarios.push({
      cursoPlanId: curso.idCursoPlan,
      userId: parseInt( this.authSignal.currentRol().id )
    });
  }

}

