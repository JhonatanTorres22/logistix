import { Component } from '@angular/core';
import { ListAmbienteComponent } from './list-ambiente/list-ambiente.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-apertura-ambiente',
  standalone: true,
  imports: [ListAmbienteComponent, SharedModule],
  templateUrl: './apertura-ambiente.component.html',
  styleUrl: './apertura-ambiente.component.scss'
})
export class AperturaAmbienteComponent {

}
