import { Component } from '@angular/core';
import { ListAmbienteComponent } from './list-ambiente/list-ambiente.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { SelectSemestreLocalComponent } from '../select-semestre-local/select-semestre-local.component';
import { CursoAperturadoSignal } from '../../domain/signal/curso-aperturado.signal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apertura-ambiente',
  standalone: true,
  imports: [ListAmbienteComponent, CommonModule, SelectSemestreLocalComponent, SharedModule],
  templateUrl: './apertura-ambiente.component.html',
  styleUrl: './apertura-ambiente.component.scss'
})
export class AperturaAmbienteComponent {
  selectProgramaSeleccionado = this.cursoAperturadoSignal.selectProgramaSeleccionado
  constructor(
    private cursoAperturadoSignal: CursoAperturadoSignal, 
  ){}
}
