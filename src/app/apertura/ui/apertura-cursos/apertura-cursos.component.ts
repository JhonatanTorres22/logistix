import { Component } from '@angular/core';
import { AperturaCursosListComponent } from './apertura-cursos-list/apertura-cursos-list.component';

@Component({
  selector: 'app-apertura-cursos',
  standalone: true,
  imports: [AperturaCursosListComponent],
  templateUrl: './apertura-cursos.component.html',
  styleUrl: './apertura-cursos.component.scss'
})
export class AperturaCursosComponent {

}
