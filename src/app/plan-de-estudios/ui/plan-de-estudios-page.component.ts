import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ResolucionPageComponent } from './resolucion-page/resolucion-page.component';
import { PlanEstudioListComponent } from './plan-estudio-list/plan-estudio-list.component';
import { PlanEstudioRepository } from '../domain/repositories/plan-estudio.repository';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { AuthRepository } from 'src/app/auth/domain/repositories/auth.repository';
import { ListarInfoDirectorRepository } from 'src/app/auth/domain/repositories/listarInfoDirector.repository';
import { PlanEstudioSignal } from '../domain/signal/plan-estudio.signal';
import { SemestreSignal } from 'src/app/programas-academicos/domain/signals/semestre.signal';
import { ListarInfoDirector } from 'src/app/auth/domain/models/listarInfoDirector.model';

@Component({
  selector: 'plan-de-estudios-page',
  standalone: true,
  imports: [ CommonModule, SharedModule, ResolucionPageComponent, PlanEstudioListComponent],
  templateUrl: './plan-de-estudios-page.component.html',
  styleUrl: './plan-de-estudios-page.component.scss'
})
export class PlanDeEstudiosPageComponent {

}
