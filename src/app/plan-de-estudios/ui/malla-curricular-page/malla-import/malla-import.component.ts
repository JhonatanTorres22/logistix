import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { PlanEstudioCardComponent } from '../../plan-estudio-card/plan-estudio-card.component';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';


@Component({
  selector: 'malla-import',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,

  ],
  templateUrl: './malla-import.component.html',
  styleUrl: './malla-import.component.scss'
})
export class MallaImportComponent {



  constructor(
    private signal: PlanEstudioSignal
  ) { }


}
