import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectSemestreLocalComponent } from 'src/app/apertura/ui/select-semestre-local/select-semestre-local.component';
import { ValidarHorarioRepository } from '../../domain/repositories/validar-horario.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { ValidarHorarioSignal } from '../../domain/signal/validar-horario.signal';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ValidarHorario } from '../../domain/models/validar-horario.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListValidarHorarioComponent } from './list-validar-horario/list-validar-horario.component';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';

@Component({
  selector: 'app-validar-informacion',
  standalone: true,
  imports: [SelectSemestreLocalComponent, CommonModule, SharedModule, ListValidarHorarioComponent],
  templateUrl: './validar-informacion.component.html',
  styleUrl: './validar-informacion.component.scss'
})
export class ValidarInformacionComponent {
  selectProgramaSeleccionado = this.cursoAperturadoSignal.selectProgramaSeleccionado
  constructor(
    private cursoAperturadoSignal: CursoAperturadoSignal
  ) { }
}
