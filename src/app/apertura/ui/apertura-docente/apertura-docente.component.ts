import { Component } from '@angular/core';
import { DocenteListComponent } from './docente-list/docente-list.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-apertura-docente',
  standalone: true,
  imports: [DocenteListComponent, SharedModule],
  templateUrl: './apertura-docente.component.html',
  styleUrl: './apertura-docente.component.scss'
})
export class AperturaDocenteComponent {

}
