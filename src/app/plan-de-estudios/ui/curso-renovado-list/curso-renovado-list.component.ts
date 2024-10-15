import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UiCardNotItemsComponent } from 'src/app/core/components/ui-card-not-items/ui-card-not-items.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MallaSignal } from '../../domain/signal/malla.signal';
import { MallaRepository } from '../../domain/repositories/malla.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { CursoMallaRenovado } from '../../domain/models/malla.model';
import { PlanEstudioSignal } from '../../domain/signal/plan-estudio.signal';
import { UiAlertComponent } from 'src/app/core/components/ui-alert/ui-alert.component';

@Component({
  selector: 'curso-renovado-list',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiCardNotItemsComponent,
    UiAlertComponent,
  ],
  templateUrl: './curso-renovado-list.component.html',
  styleUrl: './curso-renovado-list.component.scss'
})
export class CursoRenovadoListComponent implements OnInit, OnDestroy {

  cursoMallaRenovadoSelected = this.signal.cursoMallaRenovadoSelected;
  planEstudioSelect = this.PlanSignal.planEstudioSelect;
  
  cursosRenovados: CursoMallaRenovado[] = [];
  
  constructor(
    private signal: MallaSignal,
    private PlanSignal: PlanEstudioSignal,
    private repository: MallaRepository,
    private alert: AlertService,
  ) {}

  ngOnDestroy(): void {
    this.cursoMallaRenovadoSelected.set(this.signal.cursoMallaRenovadoDefault);
  }
  

  ngOnInit(): void {
    this.getDesfasados();
  }


  getDesfasados = () => {
    this.repository.getCursoMallaRenovados( this.planEstudioSelect().id ).subscribe({
      next: ( cursos ) => {
        console.log( cursos );
        this.cursosRenovados = cursos;
        this.alert.showAlert('Listando los cursos renovados...', 'success', 5)
        
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener los cursos renovados', 'error', 5)
      }
    })
  }

}
