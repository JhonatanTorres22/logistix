import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { UiButtonIconComponent } from 'src/app/core/components/ui-button-icon/ui-button-icon.component';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Curso, CursoByCiclo, CursoEliminar } from 'src/app/plan-de-estudios/domain/models/curso.model';
import { CursoRepository } from 'src/app/plan-de-estudios/domain/repositories/curso.repository';
import { CursoSingal } from 'src/app/plan-de-estudios/domain/signal/curso.signal';
import { CursoService } from 'src/app/plan-de-estudios/infraestructure/services/curso.service';
import { CursoAddComponent } from '../curso-add/curso-add.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { UiModalTemplateComponent } from 'src/app/core/components/ui-modal-template/ui-modal-template.component';
import { Ciclo } from 'src/app/plan-de-estudios/domain/models/ciclo.model';
import { CicloRepository } from 'src/app/plan-de-estudios/domain/repositories/ciclo.repository';
import { CicloSingal } from 'src/app/plan-de-estudios/domain/signal/ciclo.signal';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';


@Component({
  selector: 'curso-list',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiButtonIconComponent, UiButtonComponent, CursoAddComponent, UiModalTemplateComponent ],
  templateUrl: './curso-list.component.html',
  styleUrl: './curso-list.component.scss'
})
export class CursoListComponent implements OnInit {

  cursosByCiclos = this.signal.cursosByCiclos;
  cicloList = this.cicloSignal.cicloList;
  cursosList = this.signal.cursosList;
  idPrograma = this.planEstudioSignal.programaId;

  constructor( 
    private authSignal: AuthSignal,
    private repository: CursoRepository,
    private service: CursoService,
    private cicloRepository: CicloRepository,
    private alert: AlertService,
    private signal: CursoSingal,
    private planEstudioSignal: PlanEstudioSignal,
    private cicloSignal: CicloSingal,
    private modal: UiModalService

  ) {}

  ngOnInit(): void {
    this.obtener();
    this.obtenerCiclos();
  }


  obtener() {
    this.repository.obtenerPorPrograma( this.idPrograma() ).subscribe({
      next: ( cursos ) => {
        console.log( cursos );
        this.cursosList.set( cursos )
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

  // obtenerMSW() {
  //   this.service.obtenerMSW().subscribe({
  //     next: ( data ) => {
  //       console.log(data);
        
  //     }, error: ( error ) => {
  //       console.log( error );
        
  //     }
  //   })
  // }


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


  openFormCurso( template: TemplateRef<any>, ciclo?: CursoByCiclo, curso?: Curso, ) {
    console.log( curso );
    let titleModal = 'Editar Curso';
    ciclo ? this.signal.cursoCicloSelect.set( ciclo ) : '';
    curso ? this.signal.cursoSelect.set( curso ) : titleModal = 'Crear Curso';
    this.modal.openTemplate( {
      template,
      titulo: titleModal
    } ).afterClosed().subscribe( resp => {
      console.log(resp);
      if( resp == 'cancelar') {
        this.signal.setCursoSelectDefault();
        return
      }

      this.obtener();

    });
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

  addPreRequisito = ( curso: Curso) => {
    this.alert.sweetAlert('info', 'ATENCIÓN', 'PENDIENTE DE IMPLEMENTAR');
    console.log(curso);
    
  }

  eliminarConfirm = (curso:Curso) => {
    this.alert.sweetAlert('question', 'Confirmar', '¿Está seguro que desea eliminar el curso?').
    then(isConfirm => {
      if(!isConfirm){return}
      const eliminarCurso: CursoEliminar = {
        id : curso.id,
        usuarioId: parseInt( this.authSignal.currentRol().id )
      }     
      this.eliminar( eliminarCurso )
    })
  }

  eliminar = ( curso : CursoEliminar ) => {
    this.repository.eliminar(curso).subscribe({
      next: ( data ) => {
        console.log(data);
        this.alert.showAlert('El curso fue eliminado de manera correcta', 'success', 6)
        setTimeout(() => {
          this.obtener()
        }, 300);
      }, error: ( error ) => {
        console.log( error );
        this.alert.sweetAlert('error')

      }
    })
  }
}
