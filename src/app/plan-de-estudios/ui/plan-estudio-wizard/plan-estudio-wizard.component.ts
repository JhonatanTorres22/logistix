import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MallaCurricularListComponent } from "../malla-curricular-page/malla-curricular-list/malla-curricular-list.component";
import { UiButtonComponent } from "../../../core/components/ui-button/ui-button.component";
import { Design, Replacement } from './wizard.state';
import { PlanEstudioRepository } from '../../domain/repositories/plan-estudio.repository';
import { CursoSignal } from '../../domain/signal/curso.signal';
import { PlanEstudioSignal } from '../../domain/signal/plan-estudio.signal';
import { CursoListComponent } from "../curso-page/curso-list/curso-list.component";

import { AlertService } from 'src/app/demo/services/alert.service';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { MatStepper } from '@angular/material/stepper';
import { CursoPlanRepository } from '../../domain/repositories/curso-plan.repository';
import { CursoPlanBase, CursoPlanEliminar, CursoPlanEquivalencia, EquivalenciaValidar, PlanEstudioCursoInsertar } from '../../domain/models/curso-plan.model';

import * as d3 from "d3";

import { EquivalenciaRepository } from '../../domain/repositories/equivalencia.repository';
import { CursoMallaEquivalenciaPrimarioInsert, EquivalenciaDelete, EquivalenciaPrimarioInsert, EquivalenciaSecundarioInsert } from '../../domain/models/equivalencia.model';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { CursoDesfasadoListComponent } from "../curso-desfasado-list/curso-desfasado-list.component";
import { CursoRepository } from '../../domain/repositories/curso.repository';
import { CursoCrear, CursoRevertirDesfase } from '../../domain/models/curso.model';
import { CursoPlanSignal } from '../../domain/signal/curso-plan.signal';
import { CicloPageComponent } from '../ciclo-page/ciclo-page.component';
import { CursoImportTemplateComponent } from "../curso-page/curso-import-template/curso-import-template.component";
import { CicloSingal } from '../../domain/signal/ciclo.signal';
import { Ciclo } from '../../domain/models/ciclo.model';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { MallaListComponent } from '../malla-curricular-page/malla-list/malla-list.component';
import { MallaRepository } from '../../domain/repositories/malla.repository';
import { MallaSignal } from '../../domain/signal/malla.signal';
import { Malla } from '../../domain/models/malla.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-plan-estudio-wizard',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MallaCurricularListComponent,
    UiButtonComponent,
    CursoListComponent,
    CicloPageComponent,
    CursoDesfasadoListComponent,
    CursoImportTemplateComponent,
    MallaListComponent,
],
  templateUrl: './plan-estudio-wizard.component.html',
  styleUrl: './plan-estudio-wizard.component.scss'
})
export class PlanEstudioWizardComponent implements OnInit {

  colores = [
    "#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF",
    "#FFB3E6", "#FFABAB", "#FFC3A0", "#FF677D", "#D5AAFF",
    "#A0E7E5", "#C3E8F2", "#FFBCBC", "#FFD3B6", "#FFDD93",
    "#B9FBC0", "#C2B2FF", "#FFC9FF", "#FFB4D8", "#B4E7E3",
    "#FFE1A8", "#FFDAA2", "#A5E1AD", "#D8C4E2", "#D9B4FF",
    "#EAD1DC", "#B2E7E2", "#FFF5BA", "#B4B9FF", "#D7F9A3",
    "#FFEBB7", "#FFE5E2", "#D7E1D5", "#F9E3E0", "#F2C6D4",
    "#E3B7B2", "#A4D4FF", "#F9F5C5", "#FFD6E6", "#B9D8D4",
    "#FFDAC1", "#FFE8D6", "#A6E1F9", "#D7D3C2", "#C3C6FF",
    "#FFC4D6", "#E0B2B2", "#B8E0D2", "#F6E7D7", "#E5B0D6",
    "#D4E09B", "#FCEBAF", "#E5D0D0", "#C5E1A5", "#F1C2D7",
    "#D7B2A4", "#F0E7B0", "#F0C1D1", "#F3D1D1", "#D2F0E7",
    "#F4E7C5", "#E1B8B8", "#F2C8A2", "#B3CDE0", "#F9F1D9"
];

  // cursosPlanByCiclos = this.cursosPlanS.cursosPlanByCiclos;
  planEstudioUltimoConResolucion = this.signal.planEstudioUltimoConResolucion;
  cursosList = this.cursoSignal.cursosList;
  planEstudioSelect = this.signal.planEstudioSelect;
  cursoDesfasadoSelected = this.cursoSignal.cursoDesfasadoSelected;
  planEstudioStepper = this.signal.planEstudioStepper;
  cursosPlan = this.cursoPlanSignal.cursosPlan;
  currentRol = this.authSignal.currentRol;
  renderizarCursos = this.cursoSignal.renderizarCursos;
  cursoPlanEquivalenciaValidar = this.cursoPlanSignal.cursoPlanEquivalenciaValidar;
  cursosImportExcel = this.cursoSignal.cursosImportExcel;
  cicloList = this.cicloSignal.cicloList;
  currentInfoDirector = this.authSignal.currentInfoDirector;
  cursosByCiclo = this.cursoSignal.cursosByCiclo;
  file = this.mensajeriaSignal.file;


  
  loading: boolean = false;
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
    cicloNumero: 0,
    cicloLetra: '',
    equivalencias: [],
    color: '',
    estado: '',

    competencia: '',
    descripcion: '',
    preRequisitos: []
  }
  connections: { leftCardId: number, rightCardId: number }[] = []; // Array de conexiones
  
  private _formBuilder = inject(FormBuilder);
  formDisenar: FormGroup;
  formAsignar: FormGroup;
  formAsignarPreRequisitos: FormGroup;

  showBtnActivarEdicion: boolean = false;

  cursosPlanEquivalenciaActual: CursoPlanEquivalencia[] = [];
  cursosPlanEquivalenciaUltimo: CursoPlanEquivalencia[] = [];

  cursosMallaEquivalenciaActual: Malla[] = [];
  cursosMallaEquivalenciaUltimo: Malla[] = [];

  cursosPrimarios: EquivalenciaPrimarioInsert[] = [];
  cursosPrimariosMalla: CursoMallaEquivalenciaPrimarioInsert[] = [];
  estado = new Replacement();

  isEditable = true;

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
    private cursoRepository: CursoRepository,
    private mallaRepository: MallaRepository,

    private signal: PlanEstudioSignal,
    private cursoSignal: CursoSignal,
    private authSignal: AuthSignal,
    private cursoPlanSignal: CursoPlanSignal,
    private cicloSignal: CicloSingal,
    private mensajeriaSignal: MensajeriaSignal,
    private mallaSignal: MallaSignal,
    
    private modal: UiModalService,
    private alert: AlertService,
    private router: Router,
  ) {
    this.formDisenar = this._formBuilder.group({
      firstCtrl: ['1', Validators.required],
    });
    this.formAsignar = this._formBuilder.group({
      asignacion: ['', Validators.required],
    });
    this.formAsignarPreRequisitos = this._formBuilder.group({
      preRequisitos: ['', Validators.required],
    });
    effect( () => {
      console.log( 'Effect: ', this.planEstudioUltimoConResolucion() );
      // this.obtenerCursoPlanEquivalenciaUltimo();
      this.obtenerMallaEquivalenciaUltimo();
    })
  }
  ngOnInit(): void {

    // this.obtenerCursoPlanEquivalenciaActual();
    // this.obtenerCursoPlanActual();
    this.obtenerMallaEquivalenciaUltimo();
    this.obtenerMallaEquivalenciaActual();
  }


  asignarColores(): void {
    const colorMap = new Map<string, string>();

    // Asignar colores a cursosPlanEquivalenciaActual
    this.cursosPlanEquivalenciaActual.forEach((curso, index) => {
      const color = this.colores[index % this.colores.length];
      colorMap.set(curso.codigoCurso, color);
      curso.color = color;
    });

    // Asignar colores a cursosPlanEquivalenciaUltimo basados en cursosPlanEquivalenciaActual
    this.cursosPlanEquivalenciaUltimo.forEach(curso => {
      const color = colorMap.get(curso.codigoCurso);
      if (color) {
        curso.color = color;
      } else {
        // Asignar un color si no está en el mapa
        const newColor = this.colores[colorMap.size % this.colores.length];
        colorMap.set(curso.codigoCurso, newColor);
        curso.color = newColor;
      }
    });
  }


  validarEstado = ( control: AbstractControl ) => {
    if( this.estado.getEstado === 'Equivalence' ) {
      return control.value === 'Equivalence' ? null : { invalidMaxLength: true };
      // return { error: true, estado: 'No cumple' };
    }

    return null
  }

  showModalImportar = ( template: TemplateRef<any> ) => {
    this.modal.openTemplate({
      template,
      titulo: 'Importar Cursos',
    }).afterClosed().subscribe( data => {
      console.log( data );
      if( data === 'cancelar' ) {
        console.log( data );
        return
      }
    })
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
        this.cursosPlanEquivalenciaUltimo = cursosPlanEquivalencia.sort( ( a, b ) => a.cicloNumero - b.cicloNumero );
        console.log( 'Plan Ultimo: ', cursosPlanEquivalencia );

      }, error: ( error ) => {
        console.log( error );
        
      }
    })
  }

  obtenerMallaEquivalenciaUltimo = () => {
    this.mallaRepository.getMallaEquivalencias( this.planEstudioUltimoConResolucion().id ).subscribe({
      next: ( cursosPlanEquivalencia ) => {
        this.cursosMallaEquivalenciaUltimo = cursosPlanEquivalencia.sort( ( a, b ) => a.cicloNumero - b.cicloNumero );
        console.log( 'Plan Ultimo: ', cursosPlanEquivalencia );

      }, error: ( error ) => {
        console.log( error );
        
      }
    })
  }

  obtenerMallaEquivalenciaActual = () => {
    this.mallaRepository.getMallaEquivalencias( this.planEstudioSelect().id ).subscribe({
      next: ( cursosPlanEquivalencia ) => {
        this.cursosMallaEquivalenciaActual = cursosPlanEquivalencia.sort( ( a, b ) => a.cicloNumero - b.cicloNumero );
        console.log( 'Plan Actual: ', cursosPlanEquivalencia );
        this.showBtnActivarEdicion = this.cursosMallaEquivalenciaActual.length == 0 ? false : true;
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
        this.cursosPlanEquivalenciaActual = cursosPlanEquivalencia.sort( ( a, b ) => a.cicloNumero - b.cicloNumero );
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
    this.CursoPlanRepository.insertarCursoPlan(cursos).subscribe({
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
    // const cursosEliminar: CursoPlanEliminar[] = this.cursosPlanEquivalenciaActual.map( curso => {
      const cursosEliminar: CursoPlanEliminar[] = this.cursosPlanEquivalenciaActual.map( curso => {
      return {
        //VERIFICAR FUNCIONAMIENTO
        idCursoPlan: curso.idCursoPlan,
        usuarioId: parseInt( this.authSignal.currentRol().id )
      }
    })
    console.log( cursosEliminar );
    
    return new Promise<boolean> ( resolve => {

      this.CursoPlanRepository.eliminarCursoPlan( cursosEliminar ).subscribe({
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
    this.CursoPlanRepository.obtenerCursoPlan( this.planEstudioSelect().id ).subscribe({
      next: ( cursos ) => {
        this.cursosPlan.set( cursos );
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al listar los cursos del plan de estudios', 'error', 6)
      }
    });
  }

  guardarCursosImport = () => {
    console.log( this.cursosImportExcel());

    this.alert.sweetAlert('question', 'Confirmación', 'Está seguro que desea guardar los cursos importados')
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }

        const cursos: CursoCrear[] = this.cursosImportExcel().map( curso => {
          const cicloId = this.cicloList().find( (ciclo: Ciclo) => parseInt( ciclo.cicloNumero ) == curso.ciclo )?.id;
          const programaId = this.currentInfoDirector()[0].idProgramaAcademico;
    
          return {
            idPrograma: programaId,
            idCiclo: cicloId!,
            codigoCurso: curso.codigo_curso,
            nombreCurso: curso.nombre_curso,
            tipoEstudio: curso.tipo_estudio,
            tipoCurso: curso.tipo_curso,
            competencia: curso.competencia,
            horasTeoricas: curso.ht,
            descripcion: curso.nombre_curso,
            horasPracticas: curso.hp,
            totalHoras: curso.th,
            totalCreditos: curso.creditos,
            usuarioId: parseInt( this.authSignal.currentRol().id )
          }
    
        });
    
        // console.log( cursos );
        this.insertarCursosMasivos( cursos );
      } )

    
    
  }

  insertarCursosMasivos = ( cursos: CursoCrear[]) => {
    this.cursoRepository.agregarMasive( cursos ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alert.showAlert('Los cursos fueron guardados correctamente', 'success', 6);
        this.modal.getRefModal().close('Obtener');
        this.file.set( this.mensajeriaSignal.fileDefault );
        this.renderizarCursos.set( 'Obtener' );
        // this.obtenerCursoPlanActual();
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al guardar los cursos', 'error', 6);
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
    
    // this.EquivalenciaRepository.insertarEquivalenciaPrimario( this.cursosPrimarios ).subscribe({
    //   next: ( data ) => {
    //     console.log( data );
    //     this.alert.showAlert('Los cursos primarios fueron guardados correctamente', 'success', 6);
    //     this.obtenerCursoPlanEquivalenciaActual();
    //   }, error: ( error ) => {
    //     console.log( error );
    //     this.alert.showAlert('Ocurrió un error al guardar los cursos primarios', 'error', 6);
    //   }
    // });

    this.EquivalenciaRepository.insertarEquivalenciaPrimarioMalla( this.cursosPrimariosMalla ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alert.showAlert('Los cursos primarios fueron guardados correctamente', 'success', 6);
        this.obtenerMallaEquivalenciaActual();
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al guardar los cursos primarios', 'error', 6);
      }
    });

  }

  update = ( value: any, curso: CursoPlanEquivalencia ) => {
    console.log( 'Check: ', value.target.checked, 'Curso: ', curso );
    if( !value.target.checked ) {
      this.cursosPrimarios = this.cursosPrimarios.filter( c => c.cursoPlanId != curso.idCursoPlan );
      return
    }
    this.cursosPrimarios.push({
      cursoPlanId: curso.idCursoPlan,
      userId: parseInt( this.authSignal.currentRol().id )
    });
  }

  updateMalla = ( value: any, curso: Malla ) => {
    console.log( 'Check: ', value.target.checked, 'Curso: ', curso );
    if( !value.target.checked ) {
      this.cursosPrimariosMalla = this.cursosPrimariosMalla.filter( c => c.idMalla != curso.idMalla );
      return
    }
    this.cursosPrimariosMalla.push({
      idMalla: curso.idMalla,
      porcentajeModificacion: 0,
      userId: parseInt( this.authSignal.currentRol().id )
    });
  }

  listarDesfasados = ( template: TemplateRef<any>) => {
    this.modal.openTemplate({
      template,
      titulo: 'Cursos Desfasados',
    }).afterClosed().subscribe( data => {
      // this.cursoDesfasadoSelected.set( this.cursoSignal.cursoDesfasadoDefault );
      if( data === 'cancelar' ) {
        console.log( data );
        return
      }
      console.log( data );
      
    } )
  }

  revertirDesfaseConfirm = () => {

    this.alert.sweetAlert('question', 'Confirmación', `Está seguro que desea revertir el desfase del curso ${ this.cursoDesfasadoSelected().nombreCurso }`)
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }

        const cursoDesfasado: CursoRevertirDesfase = {
          id: this.cursoDesfasadoSelected().id,
          usuarioId: parseInt( this.authSignal.currentRol().id )
        }

        this.revertirDesfase( cursoDesfasado );
      })

  }

  revertirDesfase = ( cursoDesfasado: CursoRevertirDesfase ) => {

    this.cursoRepository.revertirDesfase( cursoDesfasado ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alert.showAlert('El curso fue revertido correctamente', 'success', 6);
        this.obtenerCursoPlanActual();
        this.obtenerCursoPlanEquivalenciaActual();
        this.modal.getRefModal().close('Obtener');
        this.renderizarCursos.set( 'Obtener' );
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al revertir el desfase del curso', 'error', 6);
      }
    });

  }

  changeStepper = ( event: number ) => {
    console.log( event );
    this.connections = [];
    if( event == 2 && this.connections.length == 0 ) {
      this.loading = true;
      setTimeout(() => {
        this.inicioFlechaSVG();
        window.addEventListener('resize', this.redibujarFlechaXZoom.bind(this));
        this.addLine();
        this.asignarColores()
      }, 1000);
    }
    
  }

  guardarCursosSecundariosConfirm = () => {

    if( !this.cursoPlanEquivalenciaValidar().equivalenciaTerminada ) {
      return
    }

    this.alert.sweetAlert('question', 'Confirmación', 'Está seguro que desea guardar los cursos secundarios')
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }

        this.guardarCursosSecundarios();
      })
  }

  guardarCursosSecundarios = () => {
    const cursosSecundarios: EquivalenciaSecundarioInsert[] = this.connections.map( curso => {
      return {
        cursoPlanId: curso.rightCardId,
        cursoPlanEquivalenciaId: curso.leftCardId,
        porcentajeModificacion: 0,
        userId: parseInt( this.authSignal.currentRol().id )
      }
    })

    console.log( cursosSecundarios );
    
    // return
    this.EquivalenciaRepository.insertarEquivalenciaSecundario( cursosSecundarios ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alert.showAlert('Los cursos secundarios fueron guardados correctamente', 'success', 6);
        this.obtenerCursoPlanEquivalenciaActual();
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al guardar los cursos secundarios', 'error', 6);
      }
    });

  }

  eliminarEquivalenciaConfirm = ( curso: CursoPlanBase ) => {
    this.alert.sweetAlert('question', 'Confirmación', `Está seguro que desea eliminar la equivalencia del curso ${ curso.nombreCurso }`)
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }
        const eliminarEquivalencia: EquivalenciaDelete = {
          cursoPlanId: curso.idCursoPlan,
          cursoPlanEquivalenciaId: curso.equivalencias[0].idCursoPlan,
          userId: parseInt( this.authSignal.currentRol().id )
        }
        this.eliminarEquivalencia( eliminarEquivalencia );
      })
  }
  
  eliminarEquivalencia = ( curso: EquivalenciaDelete ) => {
    this.EquivalenciaRepository.eliminarEquivalencia( curso ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alert.showAlert('La equivalencia fue eliminada correctamente', 'success', 6);
        this.obtenerCursoPlanEquivalenciaActual();
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al eliminar la equivalencia', 'error', 6);
      }
    });
  }

  finalizarProceso = () => {
    this.alert.sweetAlert('question', 'Confirmación', 'Está seguro que desea finalizar el proceso de diseño del plan de estudios')
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }

        this.finalizarProcesoDiseño();
      })
  }

  finalizarProcesoDiseño = () => {
    this.alert.sweetAlert('info', 'Proceso Finalizado', 'El proceso de diseño del plan de estudios ha finalizado')
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }

        this.router.navigate(['/mensajeria']);
        // this.estado.approve(false);
        // this.formDisenar.patchValue({firstCtrl: this.estado.getEstado});
        // this.formAsignar.patchValue({secondCtrl: this.estado.getEstado});
      })
  }


  // ngAfterViewInit = () => {
  //   setTimeout(() => {
  //     console.log('AFTER');
      
  //   }, 1200);
  // }

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

  addLine = () => {
    
    // this.cursosPlanEquivalenciaActual.forEach( (curso, index, { length }) => {
    //   const cursoExiste = this.cursosPlanEquivalenciaUltimo.find( cursoUltimo => cursoUltimo.codigoCurso == curso.codigoCurso )
    //   if( cursoExiste ) {
    //     document.getElementById(`arrow-${curso.idCursoPlan}-${cursoExiste.idCursoPlan}`)?.remove();
    //     this.dibujarFlechasEntreCursos( curso.idCursoPlan, cursoExiste.idCursoPlan );
    //   }
    //   if( index == length - 1 ) {
    //     this.loading = false;
    //   }
    // })


    this.cursosMallaEquivalenciaActual.forEach( (curso, index, { length }) => {
        const cursoExiste = this.cursosMallaEquivalenciaUltimo.find( cursoUltimo => cursoUltimo.codigoCurso == curso.codigoCurso )
        if( cursoExiste ) {
          document.getElementById(`arrow-${curso.idMalla}-${cursoExiste.idMalla}`)?.remove();
          this.dibujarFlechasEntreCursos( curso.idMalla, cursoExiste.idMalla );
        }
        if( index == length - 1 ) {
          this.loading = false;
          console.log('terminó');
        }
    })

  }

  cursosSeleccionadosParaDibujar = () => {

    if (this.selectedLeftCard && this.selectedRightCard) {
      this.dibujarFlechasEntreCursos( this.selectedRightCard.idCursoPlan, this.selectedLeftCard.idCursoPlan );
    }
  }

  equivalenciaSecundariasTotall: CursoPlanEquivalencia[] = [];

  dibujarFlechasEntreCursos = ( right: number, left: number) => {

    const equivalenciasIds = new Set<number>();
    this.cursosPlanEquivalenciaActual.forEach(curso => {
      curso.equivalencias.forEach(equivalencia => {
        equivalenciasIds.add( equivalencia.idCursoPlan);
      });
    });

    this.equivalenciaSecundariasTotall = this.cursosPlanEquivalenciaUltimo.filter(curso => !equivalenciasIds.has(curso.idCursoPlan));
    // console.log( this.equivalenciaSecundariasTotall );
    
    // console.log('Conexiones actuales: ', this.connections);
    const equivalenciaSecundariasTotal = this.cursosPlanEquivalenciaUltimo.filter( curso => curso.estado == 'RENOVADO' );
    // console.log( equivalenciaSecundariasTotal );
    
    const equivalenciaSecundariasPendientes = equivalenciaSecundariasTotal.filter( curso => !this.connections.map( c => c.leftCardId ).includes( curso.idCursoPlan ) );
    const cursosActualPendientes = this.cursosPlanEquivalenciaActual.filter( curso => !this.connections.map( c => c.rightCardId ).includes( curso.idCursoPlan ) );
    // console.log( cursosActualPendientes );
    
    const dataEquivalenciaValidar: EquivalenciaValidar = {
      cursosActualPendientes: cursosActualPendientes.filter( curso => this.connections.map( c => c.rightCardId ).includes( curso.idCursoPlan ) ),
      cursosUltimoPendientes: equivalenciaSecundariasTotal,
      equivalenciaTerminada: equivalenciaSecundariasPendientes.length == 0 &&  equivalenciaSecundariasTotal.length > 0 ? true : false,
      pendientes: equivalenciaSecundariasPendientes.length,
      totalPendientes: equivalenciaSecundariasTotal.length
    }

    this.cursoPlanEquivalenciaValidar.set( dataEquivalenciaValidar );
    // console.log( dataEquivalenciaValidar );

    if( equivalenciaSecundariasTotal.length == 0 ) {
      console.log('No hay cursos secundarios');
      return
    }

    const svg = d3.select('#arrowContainer');

    const leftCardElement = document.getElementById(`cardLeft-${left}`);
    const rightCardElement = document.getElementById(`cardRight-${right}`);

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
      const existingRightConnection = this.connections.find(connection => connection.rightCardId === right);

      if (existingRightConnection) {
        // console.log( existingRightConnection );
        
        this.alert.sweetAlert('info', '¿IMPORTANTE!', 'Este curso ya se encuentra asociado a otro')
        // Si el card de la derecha ya está conectado, mostrar una alerta y no permitir la nueva conexión
        document.getElementById(`arrow-${right}-${left}`)?.remove();
        document.getElementById(`arrow-${right}-${left}`)?.remove();
   
        // this.selectedLeftCard = { ...this.setearCursoPlanEquivalencia };
        // this.selectedRightCard = { ...this.setearCursoPlanEquivalencia };
        // return;
      }

      // Verificar si la tarjeta izquierda ya está conectada
      const existingLeftConnectionIndex = this.connections.findIndex(connection => connection.leftCardId === left);

      // Si la tarjeta izquierda ya está conectada, eliminar su conexión anterior
      if (existingLeftConnectionIndex !== -1) {
        const existingLeftConnection = this.connections[existingLeftConnectionIndex];
        const existingArrowId = `arrow-${existingLeftConnection.leftCardId}-${existingLeftConnection.rightCardId}`;
        svg.select(`#${existingArrowId}`).remove(); // Eliminar la flecha existente
        this.connections.splice(existingLeftConnectionIndex, 1); // Eliminar la conexión del array
      }

      // Dibujar la nueva conexión
      const arrowId = `arrow-${left}-${right}`;
      svg.append('line')
        .attr('id', arrowId)
        .attr('x1', startX)
        .attr('y1', startY)
        .attr('x2', endX)
        .attr('y2', endY)
        .attr('stroke', 'black')
        .attr('stroke-width', 1.7)
        .attr('marker-end', 'url(#arrowhead)');

      // Agregar la nueva conexión al array
      this.connections.push({ leftCardId: left, rightCardId: right });
      this.selectedLeftCard = { ...this.setearCursoPlanEquivalencia };
      this.selectedRightCard = { ...this.setearCursoPlanEquivalencia };
    }
    
    
    

    // console.log( 'Requiren Equivalencia Sec Total: ', equivalenciaSecundariasTotal );
    // console.log( 'Requiren Equivalencia Sec Pendientes: ', equivalenciaSecundariasPendientes );
    // console.log('Conexiones actuales:', this.connections);

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
          .attr('stroke-width', 1.8)
          .attr('marker-end', 'url(#arrowhead)');
      }
    });
  }
}

