import { CommonModule } from '@angular/common';
import { Component, effect, OnDestroy, OnInit, TemplateRef } from '@angular/core';
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
import { SemestreAcademicoPageComponent } from 'src/app/programas-academicos/ui/semestre-academico-page/semestre-academico-page.component';
import { SemestreOptionsComponent } from 'src/app/programas-academicos/ui/semestre-academico-page/semestre-options/semestre-options.component';
import { SemestreSignal } from 'src/app/programas-academicos/domain/signals/semestre.signal';
import { UiCardNotItemsComponent } from 'src/app/core/components/ui-card-not-items/ui-card-not-items.component';
import { PlanEstudioCardComponent } from '../plan-estudio-card/plan-estudio-card.component';
import { MallaCurricularSideComponent } from '../malla-curricular-page/malla-curricular-side/malla-curricular-side.component';

@Component({
  selector: 'plan-estudio-list',
  standalone: true,
  imports: [ 
    CommonModule,
    SharedModule,
    UiButtonComponent,
    UiButtonIconComponent,
    SemestreAcademicoPageComponent,
    SemestreOptionsComponent,
    PlanEstudioCardComponent,
    PlanEstudioAddComponent,
    MallaCurricularSideComponent,
    UiCardNotItemsComponent
  ],
  templateUrl: './plan-estudio-list.component.html',
  styleUrl: './plan-estudio-list.component.scss'
})
export class PlanEstudioListComponent implements OnInit, OnDestroy {

  planesDeEstudio = this.signal.planesDeEstudio;
  planEstudioEdit = this.signal.planEstudioEdit;
  planEstudioSelect =  this.signal.planEstudioSelect;
  renderizarPor = this.signal.renderizarPor;
  semestreSelect = this.semestreSignal.semestreSelect;
  isModal = this.signal.isModal;
  idSemestres = this.authSignal.idSemestres;
  currentInfoDirector = this.authSignal.currentInfoDirector;
  idPrograma = this.signal.programaId;
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
      console.log( this.renderizarPor() );

      this.obtener();

      this.renderizarPor.set('');
      // this.prepareIdPrograma();
      // if( this.idProgramaSelect != 0 ) {
      // localStorage.setItem('current')
      //   this.obtener();
      // }

    }, { allowSignalWrites: true } )
  }
  ngOnDestroy(): void {
    
    // this.idProgramaSelect = 0;
    // this.idSemestres.set([]);
    // this.idPrograma.set( 0 );
    this.isModal.set( false );

  }

  ngOnInit(): void {


    this.preparedIdSemestres();
    // this.prepareIdPrograma();
    // if( this.idProgramaSelect != 0 ) {
    //   console.log(this.idProgramaSelect );
    //   console.log(this.semestreSelect());
      // this.obtener();
    // }
  }

  preparedIdSemestres = () => {
    // console.log(this.currentInfoDirector());
    if(this.currentInfoDirector().length == 0) {
      console.log('ZERO');
      
      return
    }
    this.idPrograma.set(this.currentInfoDirector()[0].idProgramaAcademico);

    // this.idSemestres.set(this.currentInfoDirector().map( semestre => semestre.idSemestre ));
    // console.log(this.idSemestres);
  }

  // prepareIdPrograma = () => {

  //   this.idProgramaSelect = this.currentInfoDirector()[0].idProgramaAcademico;
  //   this.idPrograma.set( this.idProgramaSelect );
  //   if( this.idProgramaSelect != 0 ) {
      
  //     this.obtener();
  //   }

  // }
  
  obtener() {
    console.log('Programa Id ', this.idSemestres()[0]);
    
    this.repository.obtener( this.idPrograma() ).subscribe({
      next: ( planes ) => {
        console.log( planes );
        this.planesDeEstudio.set( planes )
        this.planEstudioUltimoConResolucion.set( this.planesDeEstudio().filter( plan => plan.resolucion !== null )[ this.planesDeEstudio().length - 2] ?? this.signal.planEstudioDefault ) 

        // this.
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener los planes de estudios', 'error', 6);
      }
    })
  }
  
  

  agregarPlan = ( template: TemplateRef<any> ) => {
    let hayPlanesSinResolucion = this.planesDeEstudio().some (planEstudio => planEstudio.archivo === null)
    if(hayPlanesSinResolucion){
      this.alert.showAlert('No puede crear por motivo que hay plan de estudio sin resolución','warning')
      return;
    }
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

  

  showSemestres = ( template: TemplateRef<any>) => {
    this.modal.openTemplate({
      template,
      titulo: 'Semestres Académicos'
    })
  }

  selectPlan = ( plan: PlanEstudio) => {
    console.log( plan );
    
    this.planEstudioSelect.set( plan )
  }

}
