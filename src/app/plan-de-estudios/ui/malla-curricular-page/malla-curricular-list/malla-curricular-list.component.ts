import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CicloPageComponent } from '../../ciclo-page/ciclo-page.component';
import { CursoPageComponent } from '../../curso-page/curso-page.component';
import { UiButtonComponent } from "../../../../core/components/ui-button/ui-button.component";
import { CursoRepository } from 'src/app/plan-de-estudios/domain/repositories/curso.repository';
import { CursoByCiclo, Curso } from 'src/app/plan-de-estudios/domain/models/curso.model';
import { CursoSingal } from 'src/app/plan-de-estudios/domain/signal/curso.signal';
import { PlanEstidoRepositoryImpl } from 'src/app/plan-de-estudios/infraestructure/repositories/plan-estudio.repository.impl';
import { PlanEstudioCursoInsertar } from 'src/app/plan-de-estudios/domain/models/plan-estudio.model';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { AlertService } from 'src/app/demo/services/alert.service';
import { CicloRepository } from 'src/app/plan-de-estudios/domain/repositories/ciclo.repository';
import { CicloSingal } from 'src/app/plan-de-estudios/domain/signal/ciclo.signal';
import { Ciclo } from 'src/app/plan-de-estudios/domain/models/ciclo.model';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';

@Component({
  selector: 'malla-curricular-list',
  standalone: true,
  imports: [CommonModule, SharedModule, CicloPageComponent, CursoPageComponent, UiButtonComponent],
  templateUrl: './malla-curricular-list.component.html',
  styleUrl: './malla-curricular-list.component.scss'
})
export class MallaCurricularListComponent implements OnInit {

  cursosByCiclos = this.cursoSignal.cursosByCiclos;
  cursos: Curso[] = []
  cicloList = this.cicloSignal.cicloList;
  planEstudioSelect = this.signal.planEstudioSelect;

  constructor(
    private cursosRepository: CursoRepository,
    private cursoSignal: CursoSingal,
    private planEstudioRepository: PlanEstidoRepositoryImpl,
    private cicloRepository: CicloRepository,
    private cicloSignal: CicloSingal,
    private authSignal: AuthSignal,
    private signal: PlanEstudioSignal,
    private alert: AlertService,
  ) {

  }
  ngOnInit(): void {
    this.obtener();
  }



  


  obtener() {
    this.cursosRepository.obtenerPorPrograma( 1 ).subscribe({
      next: ( cursos ) => {

        this.cursos = cursos;
        console.log( cursos );
        const cursoByCiclo = cursos.reduce( ( a: CursoByCiclo[], b: Curso ) => {

          const existeCiclo = a.findIndex( a => a.idCiclo == b.idCiclo);
            if( existeCiclo == -1 ) {

              const newCiclo: CursoByCiclo = {
                // ciclo: b.id,
                idCiclo: b.idCiclo,
                cursos: [b]
              }
              a.push( newCiclo )
              return a
            }

            a[existeCiclo].cursos.push( b );


          return a
        }, [] )
        console.log( cursoByCiclo );
        this.cursosByCiclos.set( cursoByCiclo.sort( ( a, b) =>  a.idCiclo  - b.idCiclo ) )
        console.log();
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

}
