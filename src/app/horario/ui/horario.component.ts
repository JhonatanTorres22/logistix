import { Component } from '@angular/core';
import { ValidarInformacionComponent } from './validar-informacion/validar-informacion.component';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [ValidarInformacionComponent],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.scss'
})
export class HorarioComponent {

}
