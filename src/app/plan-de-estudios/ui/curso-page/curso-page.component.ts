import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CursoListComponent } from './curso-list/curso-list.component';
import { UiButtonIconComponent } from 'src/app/core/components/ui-button-icon/ui-button-icon.component';
import { CicloPageComponent } from '../ciclo-page/ciclo-page.component';
import { CursoPlanEliminar, CursoPlanListar, PlanEstudio, PlanEstudioCursoInsertar } from '../../domain/models/plan-estudio.model';
import { PlanEstidoRepositoryImpl } from '../../infraestructure/repositories/plan-estudio.repository.impl';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { AlertService } from 'src/app/demo/services/alert.service';
import { CursoSingal } from '../../domain/signal/curso.signal';
import { Curso } from '../../domain/models/curso.model';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { uiModalTemplateData } from 'src/app/core/components/ui-modal/ui-modal.interface';
import { PlanEstudioListComponent } from '../plan-estudio-list/plan-estudio-list.component';
import { PlanEstudioSignal } from '../../domain/signal/plan-estudio.signal';
import { Router } from '@angular/router';

@Component({
  selector: 'curso-page',
  standalone: true,
  imports: [ CommonModule, SharedModule, CursoListComponent, UiButtonIconComponent, UiButtonComponent, CicloPageComponent, PlanEstudioListComponent ],
  templateUrl: './curso-page.component.html',
  styleUrl: './curso-page.component.scss'
})
export class CursoPageComponent {

  cursosByCiclos = this.cursoSignal.cursosByCiclos;
  // cursos: Curso[] = [];
  cursosPlan: CursoPlanListar[] = [];
  isModal = this.signal.isModal;
  planEstudioSelect =  this.signal.planEstudioSelect;
  cursosList = this.cursoSignal.cursosList;


  constructor(
    private planEstudioRepository: PlanEstidoRepositoryImpl,
    private authSignal: AuthSignal,
    private cursoSignal: CursoSingal,
    private signal: PlanEstudioSignal,
    private modal: UiModalService,
    private alert: AlertService,
    private router: Router
  ) {}

  asignar = () => {
    const cursos: PlanEstudioCursoInsertar[] = this.cursosList().map( curso => {
      return {
        idCurso: curso.id,
        idPlanEstudio: this.planEstudioSelect().id,
        usuarioId: parseInt( this.authSignal.currentRol().id )
      }
      
    });
    
    console.log( cursos );
    this.planEstudioRepository.insertarCursoPlan(cursos).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alert.showAlert('Los cursos fueron asignados al plan de estudios', 'success', 6)
        this.modal.getRefModal().close('Assign')
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al Asignar los cursos', 'error', 6)
      }
    });

  }

  onSubmit = () => {
    this.isDisponible( this.planEstudioSelect() ) 
      .then( isDisponible => {
        if( !isDisponible ) {
          this.alert.sweetAlert( 'question', 'Confirmación', 'El Plan de Estudios seleccionado, tiene cursos asignados, Desea Eliminarlos y Asignar nuevamente todos los cursos')
            .then( isConfirm => {
              if( !isConfirm ) {
                return
              }

              //ELIMINAR
              this.eliminarCursoPlan()
                .then( isDeleted => {
                  if( !isDeleted ) {
                    return
                  }

                  this.asignar();
                })
            })
          return
        }


        //asignar
        this.alert.sweetAlert( 'question', 'Confirmar', '¿Está seguro que desea Asignar todos los cursos al Plan de Estudios?')
          .then( isConfirm => {
            if( !isConfirm ) {
              return
            }

            this.asignar();
          });


      })
  }

  isDisponible = ( plan: PlanEstudio ) => {

    return new Promise<boolean>( ( resolve) => {
      this.planEstudioRepository.obtenerCursoPlan( plan.id ).subscribe({
        next: ( cursos ) => {
          if( cursos.length == 0 ) {
            resolve( true );
            // return
          }
          this.cursosPlan = cursos;
          resolve( false )
        }, error: ( error ) => {
          console.log( error );
          this.alert.showAlert('Ocurrió un error al verificar información del plan de estudios seleccionado', 'error', 6)
          return
          
        }
      });
    })
  }

  eliminarCursoPlan = () => {
    const cursosEliminar: CursoPlanEliminar[] = this.cursosPlan.map( curso => {
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

  showPlanes = ( template: TemplateRef<any> ) => {
    this.isModal.set( true );
    this.modal.openTemplate( {
      template,
      titulo: 'Lista de Planes de Estudios'
    } ).afterClosed().subscribe( response => {
      
      if( response == 'cancelar' ) {
        return;
      }

      this.router.navigate(['/plan-de-estudios/malla-curricular']);
    })
  }

}
