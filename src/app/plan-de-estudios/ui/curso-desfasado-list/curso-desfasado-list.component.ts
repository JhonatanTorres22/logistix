import { Component, OnDestroy, OnInit } from '@angular/core';
import { CursoRepository } from '../../domain/repositories/curso.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { CursoDesfasado } from '../../domain/models/curso.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CursoSignal } from '../../domain/signal/curso.signal';
import { UiCardNotItemsComponent } from 'src/app/core/components/ui-card-not-items/ui-card-not-items.component';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { MallaRepository } from '../../domain/repositories/malla.repository';
import { MallaSignal } from '../../domain/signal/malla.signal';
import { CursoMallaDesfasado } from '../../domain/models/malla.model';
import { PlanEstudioSignal } from '../../domain/signal/plan-estudio.signal';
import { UiAlertComponent } from 'src/app/core/components/ui-alert/ui-alert.component';


@Component({
  selector: 'curso-desfasado-list',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiCardNotItemsComponent,
    UiAlertComponent,
  ],
  templateUrl: './curso-desfasado-list.component.html',
  styleUrl: './curso-desfasado-list.component.scss'
})
export class CursoDesfasadoListComponent implements OnInit, OnDestroy {

  cursosMallaDesfasados: CursoMallaDesfasado[] = [];



  planEstudioSelect = this.planSignal.planEstudioSelect;
  cursoMallaDesfasadoSelected = this.signal.cursoMallaDesfasadoSelected;
  currentInfoDirector = this.authSignal.currentInfoDirector;

  constructor(
    private repository: MallaRepository,
    private alert: AlertService,
    private authSignal: AuthSignal,
    private signal: MallaSignal,
    private planSignal: PlanEstudioSignal,


  ) { }

  ngOnDestroy(): void {
    this.cursoMallaDesfasadoSelected.set(this.signal.cursoMallaDesfasadoDefault);
  }

  ngOnInit(): void {
    this.obtenerCursosDesfasados();
  }

  obtenerCursosDesfasados = () => {
    this.repository.getMallaDesfasados(this.planEstudioSelect().id).subscribe({
      next: (data) => {
        console.log(data);
        this.cursosMallaDesfasados = data;
        this.alert.showAlert('Cursos desfasados obtenidos correctamente', 'success');
      },
      error: (error) => {
        this.alert.showAlert('Ocurrío un error al obtener los cursos desfasados', 'error');
        console.log( error );
        
      }
    })
  }

}
