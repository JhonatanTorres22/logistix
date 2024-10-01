import { Component, effect, Input, TemplateRef, ViewChild } from '@angular/core';
import { PlanEstudio, PlanEstudioEliminar } from '../../domain/models/plan-estudio.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Router } from '@angular/router';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SemestreSignal } from 'src/app/programas-academicos/domain/signals/semestre.signal';
import { PlanEstudioRepository } from '../../domain/repositories/plan-estudio.repository';
import { PlanEstudioSignal } from '../../domain/signal/plan-estudio.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { PlanEstudioAddComponent } from '../plan-estudio-add/plan-estudio-add.component';
import { MallaCurricularSideComponent } from '../malla-curricular-page/malla-curricular-side/malla-curricular-side.component';
import { PlanEstudioPerfilEgresadoComponent } from "../plan-estudio-perfil-egresado/plan-estudio-perfil-egresado.component";
import { environment } from 'src/environments/environment';
import { UiAlertComponent } from 'src/app/core/components/ui-alert/ui-alert.component';
import { pl } from 'date-fns/locale';

@Component({
  selector: 'plan-estudio-card',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    PlanEstudioAddComponent,
    MallaCurricularSideComponent,
    UiButtonComponent,
    UiAlertComponent,
    PlanEstudioPerfilEgresadoComponent,
    PlanEstudioCardComponent
],
  templateUrl: './plan-estudio-card.component.html',
  styleUrl: './plan-estudio-card.component.scss'
})
export class PlanEstudioCardComponent {

  @ViewChild('ultimoPlanConRCU') ultimoPlanConRCU: TemplateRef<any>;

  @Input() planEstudio: PlanEstudio;
  @Input() tipo: string;
  planesDeEstudio = this.signal.planesDeEstudio;
  planEstudioEdit = this.signal.planEstudioEdit;  
  planEstudioSelect =  this.signal.planEstudioSelect;
  planEstudioStepper = this.signal.planEstudioStepper;  
  renderizarPor = this.signal.renderizarPor;
  semestreSelect = this.semestreSignal.semestreSelect;
  isModal = this.signal.isModal;
  isModalOfItself = this.signal.isModalOfItself;
  idSemestres = this.authSignal.idSemestres;
  currentInfoDirector = this.authSignal.currentInfoDirector;
  idPrograma = this.signal.programaId;
  openMallaCursos = this.signal.openMallaCursos;
  planEstudioUltimoConResolucion = this.signal.planEstudioUltimoConResolucion;
  idProgramaSelect: number = 0;

  constructor(
    private router: Router,
    private repository: PlanEstudioRepository,
    private alert: AlertService,
    private signal: PlanEstudioSignal,
    private semestreSignal: SemestreSignal,
    private authSignal: AuthSignal,
    private modal: UiModalService 
  ) {
    effect( () => {
      // console.log( this.planEstudioSelect() );
      localStorage.setItem('selectPlanEstudio', JSON.stringify(this.planEstudioSelect()));
      
    } )
  }


  verMalla = ( plan: PlanEstudio) => {
    console.log( plan );
    
    this.planEstudioSelect.set( plan );
    if( !this.isModal() && !this.isModalOfItself() ) {
      this.router.navigate(['plan-de-estudios/malla-curricular']);
      return
    }
    if( this.isModalOfItself() ) {

      console.log( this.ultimoPlanConRCU );
      // this.ultimoPlanConRCU.elementRef.nativeElement.classList.add('hidden');
      document.getElementsByClassName('cdk-overlay-container')[0].classList.add('hidden');
      this.openMallaCursos.set( true );

      return;

    }

    this.openMallaCursos.set( true );

  }

  showFormEdit = ( plan: PlanEstudio, template: TemplateRef<any>, tipo: string ) => {

    this.planEstudioEdit.set( plan );
    console.log(this.planEstudioEdit());
    
    this.modal.openTemplate( {
      template,
      titulo: tipo === 'Edit' ? 'Editar Plan de Estudio' : 'Perfil'
    } ).afterClosed().subscribe( response => {
      // console.log( response );
      this.planEstudioEdit.set( this.signal.planEstudioDefault );
      if( response == 'cancelar' ) {
        console.log( response );
        return
      }

      // this.obtener();
      this.renderizarPor.set('Edit');
    });
  }

  eliminarConfirm( plan: PlanEstudio ) {
    if(plan.resolucion !== null ){
      this.alert.showAlert('No puede eliminar el plan, porque ya cuenta con una resolución','error')
      return
    }
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
        // this.obtener();
        this.renderizarPor.set('Delete');

        
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al eliminar el plan de estudios', 'error', 6);

      }
    })

  }


  mostrarArchivoPlanEstudio(plan: PlanEstudio){
    if(plan.archivo == null){
      this.alert.showAlert('El consejo aún no ha emitido una resolución', 'warning')
      return;
    }
    window.open(`${environment.EndPoint}Archivos/${plan.archivo}`, "_blank")
    return;
  }

  duplicarConfirm = ( ultimoPlanConRCU: TemplateRef<any>, planEstudio: PlanEstudio) => {

    this.planEstudioStepper.set( planEstudio );
    this.planEstudioSelect.set( planEstudio );
    console.log( planEstudio);
    
    // console.log( this.planEstudioUltimoConResolucion() );
    // if( this.planEstudioUltimoConResolucion().id == 0 ) {
      this.router.navigate(['plan-de-estudios/disenar']);
      return;
    // }

    // this.isModalOfItself.set( true );
    // this.modal.openTemplate( {
    //   template: ultimoPlanConRCU,
    //   titulo: 'Diseñar Plan de Estudio'
    // }).afterClosed().subscribe( response => {
    //   this.isModalOfItself.set( false );
    //   if( response == 'cancelar' ) {
    //     return
    //   }

    // });
  }

  duplicar = ( plan: PlanEstudio ) => {
    console.log( plan );
    
    this.alert.sweetAlert('question', 'Confirmar', '¿Está seguro que desea DUPLICAR este Plan de Estudios?')
      .then( isConfirm => {
        if( !isConfirm ) return
        
        this.planEstudioSelect.set( plan );
        this.router.navigate(['plan-de-estudios/disenar']);
        this.modal.getRefModal().close('cerrar');
    })


  }

}
