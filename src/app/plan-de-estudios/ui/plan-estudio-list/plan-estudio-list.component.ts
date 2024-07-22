import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { PlanEstudioRepository } from '../../domain/repositories/plan-estudio.repository';
import { PlanEstudioSignal } from '../../domain/signal/plan-estudio.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiButtonIconComponent } from 'src/app/core/components/ui-button-icon/ui-button-icon.component';
import { PlanEstudioAddComponent } from '../plan-estudio-add/plan-estudio-add.component';
import { PlanEstudio, PlanEstudioEliminar } from '../../domain/models/plan-estudio.model';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { InfoDirectorSignal } from 'src/app/auth/domain/signals/infoDirector.signal';

@Component({
  selector: 'plan-estudio-list',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiButtonComponent, UiButtonIconComponent, PlanEstudioAddComponent],
  templateUrl: './plan-estudio-list.component.html',
  styleUrl: './plan-estudio-list.component.scss'
})
export class PlanEstudioListComponent implements OnInit {

  planesDeEstudio = this.signal.planesDeEstudio;
  planEstudioEdit = this.signal.planEstudioEdit;
  planEstudioSelect =  this.signal.planEstudioSelect;
  isModal = this.signal.isModal;
  director = this.infoDirectorSignal.infoDirector
  constructor(
    private infoDirectorSignal:InfoDirectorSignal,
    private router: Router,
    private repository: PlanEstudioRepository,
    private alert: AlertService,
    private signal: PlanEstudioSignal,
    private authSignal: AuthSignal,
    private modal: UiModalService
  ) {}
  ngOnInit(): void {
    this.obtener();
  }

  
  obtener() {
    this.repository.obtener(this.director()[0].CodigoProgramaAcademico).subscribe({
      next: ( planes ) => {
        console.log( planes );
        this.planesDeEstudio.set( planes )
        // this.
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener los planes de estudios', 'error', 6);
      }
    })
  }
  
  verMalla = ( plan: PlanEstudio) => {
    this.router.navigate(['plan-de-estudios/malla-curricular']);
    this.planEstudioSelect.set( plan )
  }

  agregarPlan = ( template: TemplateRef<any> ) => {
    this.modal.openTemplate({
      template,
      titulo: 'Plan de Estudio'
    }).afterClosed().subscribe( response => {
      // console.log( response );
      if( response == 'cancelar' ) {
        console.log( response );
        
        return
      }

      this.obtener();
    });
  }

  showFormEdit = ( plan: PlanEstudio, template: TemplateRef<any> ) => {

    this.planEstudioEdit.set( plan );
    console.log(this.planEstudioEdit());
    
    this.modal.openTemplate( {
      template,
      titulo: 'Editar Plan de Estudio'
    } ).afterClosed().subscribe( response => {
      // console.log( response );
      this.planEstudioEdit.set( this.signal.planEstudioDefault )
      if( response == 'cancelar' ) {
        console.log( response );
        return
      }

      this.obtener();
    });
  }

  eliminarConfirm( plan: PlanEstudio ) {
    this.alert.sweetAlert('question', 'Confirmar', '¿Está seguro que desea eliminar el Plan de Estudios?')
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }

        const eliminar:PlanEstudioEliminar = {
          idPlanEstudio: plan.id,
          usuarioId: parseInt( this.authSignal.currentRol().id )
        }

        this.eliminar( eliminar );
      })
  }

  eliminar( planEliminar: PlanEstudioEliminar ) {
    
    this.repository.eliminar( planEliminar ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alert.showAlert('El plan de estudios fué eliminado de manera correcta', 'success', 6);
        this.obtener();
        
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al eliminar el plan de estudios', 'error', 6);

      }
    })

  }

  selectPlan = ( plan: PlanEstudio) => {
    console.log( plan );
    
    this.planEstudioSelect.set( plan )
  }

}
