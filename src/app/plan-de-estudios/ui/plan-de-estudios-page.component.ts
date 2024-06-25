import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ResolucionPageComponent } from './resolucion-page/resolucion-page.component';

@Component({
  selector: 'plan-de-estudios-page',
  standalone: true,
  imports: [ CommonModule, SharedModule, ResolucionPageComponent],
  templateUrl: './plan-de-estudios-page.component.html',
  styleUrl: './plan-de-estudios-page.component.scss'
})
export class PlanDeEstudiosPageComponent {

}
