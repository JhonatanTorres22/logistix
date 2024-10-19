import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CursoMallaInformacionEquiPre, Malla } from 'src/app/plan-de-estudios/domain/models/malla.model';

@Component({
  selector: 'curso-equi-pre',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
  ],
  templateUrl: './curso-equi-pre.component.html',
  styleUrl: './curso-equi-pre.component.scss'
})
export class CursoEquiPreComponent {

  @Input() curso: Malla;
  @Input() detalleCursoMalla: CursoMallaInformacionEquiPre

  constructor() {

  }

}
