import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Malla } from 'src/app/plan-de-estudios/domain/models/malla.model';

@Component({
  selector: 'curso-equivalencia',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
  ],
  templateUrl: './curso-equivalencia.component.html',
  styleUrl: './curso-equivalencia.component.scss'
})
export class CursoEquivalenciaComponent {

  @Input() curso: Malla;
  @Input() color: string = 'transparent';
  @Input() isConvalidado: boolean = false;
  @Input() porcentaje: number = 0;
  @Input() isOrigen: boolean = false;

}