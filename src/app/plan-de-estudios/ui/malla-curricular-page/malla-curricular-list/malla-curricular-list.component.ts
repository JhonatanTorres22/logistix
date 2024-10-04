import { CommonModule } from '@angular/common';
import { Component, effect, HostListener, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CicloPageComponent } from '../../ciclo-page/ciclo-page.component';
import { CursoPageComponent } from '../../curso-page/curso-page.component';
import { UiButtonComponent } from "../../../../core/components/ui-button/ui-button.component";
import { CursoRepository } from 'src/app/plan-de-estudios/domain/repositories/curso.repository';
import { CursoByCiclo, Curso } from 'src/app/plan-de-estudios/domain/models/curso.model';
import { CursoSignal } from 'src/app/plan-de-estudios/domain/signal/curso.signal';
import { PlanEstidoRepositoryImpl } from 'src/app/plan-de-estudios/infraestructure/repositories/plan-estudio.repository.impl';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { AlertService } from 'src/app/demo/services/alert.service';
import { CicloRepository } from 'src/app/plan-de-estudios/domain/repositories/ciclo.repository';
import { CicloSingal } from 'src/app/plan-de-estudios/domain/signal/ciclo.signal';
import { Ciclo } from 'src/app/plan-de-estudios/domain/models/ciclo.model';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { Router } from '@angular/router';
import { UiCardNotItemsComponent } from 'src/app/core/components/ui-card-not-items/ui-card-not-items.component';
import { RutasSignal } from 'src/app/core/signals/rutas.signal';
import { CursoPlanRepository } from 'src/app/plan-de-estudios/domain/repositories/curso-plan.repository';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CursoPlanSignal } from 'src/app/plan-de-estudios/domain/signal/curso-plan.signal';
import { CursoPlanBase, CursoPlanByCiclo, CursoPlanListar, CursoPlanPreRequisito } from 'src/app/plan-de-estudios/domain/models/curso-plan.model';
import { CursoPreRequisitoSelected, PreRequisitoDelete, PreRequisitoInsert } from 'src/app/plan-de-estudios/domain/models/pre-requisito.model';
import { PreRequisitoRepository } from 'src/app/plan-de-estudios/domain/repositories/pre-requisito.repository';

@Component({
  selector: 'malla-curricular-list',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    CicloPageComponent,
    CursoPageComponent,
    UiCardNotItemsComponent,
    UiButtonComponent
  ],
  templateUrl: './malla-curricular-list.component.html',
  styleUrl: './malla-curricular-list.component.scss'
})
export class MallaCurricularListComponent implements OnInit {

  cursoPreRequisito: PreRequisitoInsert;
  preRequisitosFromCursoSelect: number[] = [];

  cursosPlanByCiclo = this.cursoPlanSignal.cursosPlanByCiclo;
  cursosPlanPreRequisitoByCiclo = this.cursoPlanSignal.cursosPlanPreRequisitoByCiclo;
  // cursosPlan: CursoPlanListar[] = []
  cursosPlan = this.cursoPlanSignal.cursosPlan;
  cursosPlanPreRequisito = this.cursoPlanSignal.cursosPlanPreRequisito;
  cicloList = this.cicloSignal.cicloList;
  planEstudioSelect = this.signal.planEstudioSelect;


  cursoSelectPreRequisito = this.cursoSignal.cursoSelectPreRequisito;
  // preRequisitosCursoPlan = this.cursoPlanSignal.preRequisitosCursoPlan;


  idPrograma = this.signal.programaId;
  isModal = this.signal.isModal;
  isModalOfItself = this.signal.isModalOfItself;
  currentRuta = this.rutaSignal.currentRuta;

  constructor(
    private cursosRepository: CursoRepository,
    private cursoPlanRepository: CursoPlanRepository,
    private cicloRepository: CicloRepository,
    private preRequisitoRepository: PreRequisitoRepository,

    private cursoSignal: CursoSignal,
    private cursoPlanSignal: CursoPlanSignal,
    private cicloSignal: CicloSingal,
    private authSignal: AuthSignal,
    private signal: PlanEstudioSignal,
    private rutaSignal: RutasSignal,

    private alert: AlertService,
    private router: Router
  ) {
    effect( () => {
      if( this.planEstudioSelect().id !== 0 ) {
        console.log( this.planEstudioSelect() );
        // this.obtenerCursosPorPlanEstudioPrerequisito();
      }
      
    })
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    console.log(event);
    
    this.resetPreRequisito();
  }

  ngOnInit(): void {
    console.log('Init');
    // console.log( this.planEstudioSelect() );
    this.obtenerCursosPorPlanEstudioPrerequisito();
    
    
  }



  


  obtenerCursosPorPlanEstudio() {
    this.cursoPlanRepository.obtenerCursoPlan( this.planEstudioSelect().id ).subscribe({
      next: ( cursosPlan ) => {

        this.cursosPlan.set( cursosPlan );
        console.log( cursosPlan );
        const cursoByCiclo = this.cursosPlan().reduce( ( a: CursoByCiclo[], b: CursoPlanListar ) => {

          const existeCiclo = a.findIndex( a => a.ciclo == b.cicloRomano);
            if( existeCiclo == -1 ) {

              const newCiclo: CursoByCiclo = {
                cicloNumero: b.cicloNumero,
                idCiclo: 0,
                ciclo: b.cicloRomano,
                cursos: [],
                cursosPlan: [b]
              }
              a.push( newCiclo )
              return a
            }

            a[existeCiclo].cursosPlan.push( b );


          return a
        }, [] )
        console.log( cursoByCiclo );
        this.cursosPlanByCiclo.set( cursoByCiclo.sort( ( a, b) =>  a.cicloNumero - b.cicloNumero ) )

      }, error: ( error ) => {
        console.log(error);
        
      }
    })
  }

  obtenerCursosPorPlanEstudioPrerequisito() {
    this.cursoPlanRepository.obtenerCursoPlanPreRequisito( this.planEstudioSelect().id ).subscribe({
      next: ( cursosPlan ) => {

        this.cursosPlanPreRequisito.set( cursosPlan );
        console.log( cursosPlan );
        const cursoByCiclo = this.cursosPlanPreRequisito().reduce( ( a: CursoPlanByCiclo[], b: CursoPlanBase ) => {
          console.log( b);
          
          const existeCiclo = a.findIndex( a => a.ciclo == b.cicloRomano);
            if( existeCiclo == -1 ) {

              const newCiclo: CursoPlanByCiclo = {
                cicloNumero:  b.cicloNumero,
                idCiclo: 0,
                ciclo: b.cicloRomano,
                cursosPlan: [b]
              }
              a.push( newCiclo )
              return a
            }

            a[existeCiclo].cursosPlan.push( b );


          return a
        }, [] )
        console.log( cursoByCiclo );
        this.cursosPlanPreRequisitoByCiclo.set( cursoByCiclo.sort( ( a, b) =>  a.cicloNumero - b.cicloNumero ) )

      }, error: ( error ) => {
        console.log(error);
        
      }
    })
  }


  obtenerCiclos() {
    this.cicloRepository.obtener().subscribe({
      next: ( ciclos ) => {
        console.log( ciclos );
        this.cicloList.set( ciclos )
      }, error: ( error ) => {
        console.log( error );
        
      }
    })
  }

  getNombreCiclo( idCiclo: number ): Ciclo {
    const ciclo = this.cicloList().find( ciclo => ciclo.id == idCiclo );

    return ciclo!
  }


  volver = () => {
    this.router.navigate(['/plan-de-estudios']);
  }

  onEliminarConfirm = () => {
    
  }

  hoverClass = ( curso: CursoPlanBase) => {

    curso.preRequisitos.map( cursoPre => {
      document.getElementById('pre-'+cursoPre.idCursoPlan.toString() )?.classList.add( 'bg-yellow-200', 'text-yellow-700');
      document.getElementById('pre-requisito'+cursoPre.idCursoPlan.toString())?.classList.add('absolute','-mb-4');
    })
    
    // if( this.readonly ) {
    //   return
    // }


    // document.getElementById(curso.idCursoPlan.toString())?.classList.remove('hidden')
    // document.getElementById(curso.idCursoPlan.toString())?.classList.add('flex')

  }

  removeClass = ( curso: CursoPlanBase ) => {

    curso.preRequisitos.map( cursoPre => {
      document.getElementById('pre-'+cursoPre.idCursoPlan.toString() )?.classList.remove( 'bg-yellow-200', 'text-yellow-700');
      document.getElementById('pre-requisito'+cursoPre.idCursoPlan.toString())?.classList.remove('absolute');

    })
    // if( this.readonly ) {
    //   return
    // }


    // document.getElementById(curso.idCursoPlan.toString())?.classList.add('hidden');
    // document.getElementById(curso.idCursoPlan.toString())?.classList.remove('flex');

  }


  selectPreRequisitoPadre = ( curso: CursoPlanBase ) => {
    console.log( curso );

    // if( !this.cursoPreRequisito || this.cursoPreRequisito.idCursoPlan == 0 ) {
    this.cursoPreRequisito = {
      idCursoPlan: curso.idCursoPlan,
      idCursoPlanPreRequisito: 0,
      curso: curso,
      userId: parseInt( this.authSignal.currentRol().id )
    }

    this.preRequisitosFromCursoSelect = curso.preRequisitos.map( preRequisito => (preRequisito.idCursoPlan) )

    //   return
      
    // } 
    
    
    
  }
  
  selectPreRequsitoHijo = ( curso: CursoPlanBase ) => {

    if( !this.cursoPreRequisito || this.cursoPreRequisito.idCursoPlan == 0 || curso.cicloNumero >= this.cursoPreRequisito.curso.cicloNumero ) {
      console.log('Falta el padre');
      return
    }

    const existePreRequisito = this.cursoPreRequisito.curso.preRequisitos.findIndex( preRequisito => preRequisito.idCursoPlan == curso.idCursoPlan );

    if( existePreRequisito != -1 ) {
      this.cursoPreRequisito.curso.preRequisitos.splice(existePreRequisito, 1);

      this.alert.sweetAlert('question', 'Confirmación', `¿Desea eliminar el prerequisito ${ curso.nombreCurso }?` ).then( isConfirmed => {
        if( !isConfirmed ) {
          return
        }

        const eliminarPreRequisito: PreRequisitoDelete = {
          idCursoPlan: this.cursoPreRequisito.idCursoPlan,
          idCursoPlanPreRequisito: curso.idCursoPlan,
          userId: parseInt( this.authSignal.currentRol().id ),
        }

        this.eliminarPreRequisito( eliminarPreRequisito );
      })

      // this.preRequisitosFromCursoSelect = this.cursoPreRequisito.curso.preRequisitos.map( preRequisito => (preRequisito.idCursoPlan) )
      return
    }

    this.cursoPreRequisito = {
      ...this.cursoPreRequisito,
      idCursoPlanPreRequisito: curso.idCursoPlan,
    }
    
    this.insertarPreRequisito();

  }

  resetPreRequisito = () => {
    this.cursoPreRequisito = {
      idCursoPlan: 0,
      idCursoPlanPreRequisito: 0,
      curso: {} as CursoPlanBase,
      userId: 0
    }

    this.preRequisitosFromCursoSelect = [];

  }


  insertarPreRequisito = () => {
    console.log( this.cursoPreRequisito );
    // return
    this.preRequisitoRepository.insertPreRequisito( this.cursoPreRequisito ).subscribe({
      next: ( response ) => {
        console.log( response );
        this.alert.showAlert('Se inserto correctamente el prerequisito', 'success', 5);
        this.resetPreRequisito();
        this.obtenerCursosPorPlanEstudioPrerequisito();
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrio un error al insertar el prerequisito', 'error', 5);
      }
    })

  }

  eliminarPreRequisito = ( preRequisito: PreRequisitoDelete ) => {
    console.log( preRequisito );
    this.preRequisitoRepository.deletePreRequisito( preRequisito ).subscribe({
      next: ( response ) => {
        console.log( response );
        this.alert.showAlert('Se elimino correctamente el prerequisito', 'success', 5);
        this.resetPreRequisito();
        this.obtenerCursosPorPlanEstudioPrerequisito();
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrio un error al eliminar el prerequisito', 'error', 5);
      }
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }




}
