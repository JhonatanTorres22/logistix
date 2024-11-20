import { Component } from '@angular/core';
import { SeccionesAddComponent } from './secciones-add/secciones-add.component';
import { SeccionesListComponent } from './secciones-list/secciones-list.component';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';

@Component({
  selector: 'apertura-secciones',
  standalone: true,
  imports: [SeccionesAddComponent, SeccionesListComponent, UiButtonComponent],
  templateUrl: './apertura-secciones.component.html',
  styleUrl: './apertura-secciones.component.scss'
})
export class AperturaSeccionesComponent {

}
