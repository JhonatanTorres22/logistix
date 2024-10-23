import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'time-line-equivalencia-buttons',
  standalone: true,
  imports: [ 
    CommonModule,
    SharedModule,
    TimelineModule
  ],
  templateUrl: './time-line-equivalencia-buttons.component.html',
  styleUrl: './time-line-equivalencia-buttons.component.scss'
})
export class TimeLineEquivalenciaButtonsComponent {

  

  hitos = [
    { tipo: 'Primarios Automáticos' },
    { tipo: 'Secundarios Automáticos'},
    { tipo: 'Secundarios Manual'},
  ] 

}
