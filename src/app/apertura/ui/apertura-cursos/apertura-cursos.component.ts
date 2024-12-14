import { Component } from '@angular/core';
import { AperturaCursosListComponent } from './apertura-cursos-list/apertura-cursos-list.component';
import { SelectSemestreLocalComponent } from '../select-semestre-local/select-semestre-local.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CursoAperturadoSignal } from '../../domain/signal/curso-aperturado.signal';
import { CommonModule } from '@angular/common';
import { LeyendaPlanEstudioComponent } from './leyenda-plan-estudio/leyenda-plan-estudio.component';

@Component({
  selector: 'app-apertura-cursos',
  standalone: true,
  imports: [AperturaCursosListComponent,CommonModule, SelectSemestreLocalComponent, SharedModule,LeyendaPlanEstudioComponent],
  templateUrl: './apertura-cursos.component.html',
  styleUrl: './apertura-cursos.component.scss'
})
export class AperturaCursosComponent {

  selectProgramaSeleccionado = this.cursoAperturadoSignal.selectProgramaSeleccionado

  constructor(
    private cursoAperturadoSignal: CursoAperturadoSignal, 
  ){
    
  }
}
