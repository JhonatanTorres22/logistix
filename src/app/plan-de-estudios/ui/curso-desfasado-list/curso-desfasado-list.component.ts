import { Component, OnDestroy, OnInit } from '@angular/core';
import { CursoRepository } from '../../domain/repositories/curso.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { CursoDesfasado } from '../../domain/models/curso.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CursoSignal } from '../../domain/signal/curso.signal';
import { UiCardNotItemsComponent } from 'src/app/core/components/ui-card-not-items/ui-card-not-items.component';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';


@Component({
  selector: 'curso-desfasado-list',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiCardNotItemsComponent,
  ],
  templateUrl: './curso-desfasado-list.component.html',
  styleUrl: './curso-desfasado-list.component.scss'
})
export class CursoDesfasadoListComponent implements OnInit, OnDestroy {

  cursosDesfasados: CursoDesfasado[] = [];



  cursoDesfasadoSelected = this.signal.cursoDesfasadoSelected;
  currentInfoDirector = this.authSignal.currentInfoDirector;

  constructor(
    private repository: CursoRepository,
    private alert: AlertService,
    private authSignal: AuthSignal,
    private signal: CursoSignal,


  ) { }

  ngOnDestroy(): void {
    this.cursoDesfasadoSelected.set(this.signal.cursoDesfasadoDefault);
  }

  ngOnInit(): void {
    this.obtenerCursosDesfasados();
  }

  obtenerCursosDesfasados = () => {
    this.repository.obtenerCursosDesfasados(this.currentInfoDirector()[0].idProgramaAcademico).subscribe({
      next: (data) => {
        console.log(data);
        this.cursosDesfasados = data;
        this.alert.showAlert('Cursos desfasados obtenidos correctamente', 'success');
      },
      error: (error) => {
        this.alert.showAlert('Ocurrío un error al obtener los cursos desfasados', 'error');
        console.log( error );
        
      }
    })
  }

}
