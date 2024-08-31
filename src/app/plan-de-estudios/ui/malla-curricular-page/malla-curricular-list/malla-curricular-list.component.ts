import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CicloPageComponent } from '../../ciclo-page/ciclo-page.component';
import { CursoPageComponent } from '../../curso-page/curso-page.component';
import { UiButtonComponent } from "../../../../core/components/ui-button/ui-button.component";
import { CursoRepository } from 'src/app/plan-de-estudios/domain/repositories/curso.repository';
import { CursoByCiclo, Curso } from 'src/app/plan-de-estudios/domain/models/curso.model';
import { CursoSingal } from 'src/app/plan-de-estudios/domain/signal/curso.signal';
import { PlanEstidoRepositoryImpl } from 'src/app/plan-de-estudios/infraestructure/repositories/plan-estudio.repository.impl';
import { CursoPlanListar, PlanEstudioCursoInsertar } from 'src/app/plan-de-estudios/domain/models/plan-estudio.model';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { AlertService } from 'src/app/demo/services/alert.service';
import { CicloRepository } from 'src/app/plan-de-estudios/domain/repositories/ciclo.repository';
import { CicloSingal } from 'src/app/plan-de-estudios/domain/signal/ciclo.signal';
import { Ciclo } from 'src/app/plan-de-estudios/domain/models/ciclo.model';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { Router } from '@angular/router';
import { UiCardNotItemsComponent } from 'src/app/core/components/ui-card-not-items/ui-card-not-items.component';

@Component({
  selector: 'malla-curricular-list',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    CicloPageComponent,
    CursoPageComponent,
    UiCardNotItemsComponent,
    UiButtonComponent],
  templateUrl: './malla-curricular-list.component.html',
  styleUrl: './malla-curricular-list.component.scss'
})
export class MallaCurricularListComponent implements OnInit {

  cursosPlanByCiclos = this.cursoSignal.cursosPlanByCiclos;
  cursosPlan: CursoPlanListar[] = []
  cicloList = this.cicloSignal.cicloList;
  planEstudioSelect = this.signal.planEstudioSelect;
  idPrograma = this.signal.programaId;
  isModal = this.signal.isModal;

  constructor(
    private cursosRepository: CursoRepository,
    private cursoSignal: CursoSingal,
    private planEstudioRepository: PlanEstidoRepositoryImpl,
    private cicloRepository: CicloRepository,
    private cicloSignal: CicloSingal,
    private authSignal: AuthSignal,
    private signal: PlanEstudioSignal,
    private alert: AlertService,
    private router: Router
  ) {
    effect( () => {
      if( this.planEstudioSelect().id !== 0 ) {
        console.log( this.planEstudioSelect() );
        this.obtener();
      }
      
    })
  }
  ngOnInit(): void {
    console.log('Init');
    // console.log( this.planEstudioSelect() );
    
    
  }



  


  obtener() {
    this.planEstudioRepository.obtenerCursoPlan( this.planEstudioSelect().id ).subscribe({
      next: ( cursosPlan ) => {

        this.cursosPlan = cursosPlan;
        console.log( cursosPlan );
        const cursoByCiclo = cursosPlan.reduce( ( a: CursoByCiclo[], b: Curso ) => {

          const existeCiclo = a.findIndex( a => a.idCiclo == b.idCiclo);
            if( existeCiclo == -1 ) {

              const newCiclo: CursoByCiclo = {
                // ciclo: b.id,
                idCiclo: b.idCiclo,
                ciclo: b.definicionCiclo,
                cursos: [b]
              }
              a.push( newCiclo )
              return a
            }

            a[existeCiclo].cursos.push( b );


          return a
        }, [] )
        console.log( cursoByCiclo );
        this.cursosPlanByCiclos.set( cursoByCiclo.sort( ( a, b) =>  a.idCiclo  - b.idCiclo ) )

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

  hoverClass = ( curso: Curso) => {
    // this.buttons.nativeElement.classList.remove('hidden')
    // console.log( this.buttons.nativeElement );
    // const buttonId = 
    document.getElementById(curso.id.toString())?.classList.remove('hidden')
    document.getElementById(curso.id.toString())?.classList.add('flex')
    curso.preRequisitos.map( cursoPre => {
      document.getElementById('pre-'+cursoPre.id.toString() )?.classList.add( 'bg-yellow-200', 'text-yellow-700');
      document.getElementById('pre-requisito'+cursoPre.id.toString())?.classList.add('absolute','-mb-4');
    })

  }

  removeClass = ( curso: Curso ) => {
    // this.buttons.nativeElement.classList.add('hidden')
    document.getElementById(curso.id.toString())?.classList.add('hidden');
    document.getElementById(curso.id.toString())?.classList.remove('flex');
    curso.preRequisitos.map( cursoPre => {
      document.getElementById('pre-'+cursoPre.id.toString() )?.classList.remove( 'bg-yellow-200', 'text-yellow-700');
      document.getElementById('pre-requisito'+cursoPre.id.toString())?.classList.remove('absolute');

    })



  }

}
