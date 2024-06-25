import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ResolucionListComponent } from './resolucion-list/resolucion-list.component';

@Component({
  selector: 'resolucion-page',
  standalone: true,
  imports: [ CommonModule, SharedModule, ResolucionListComponent ],
  templateUrl: './resolucion-page.component.html',
  styleUrl: './resolucion-page.component.scss'
})
export class ResolucionPageComponent {

}
