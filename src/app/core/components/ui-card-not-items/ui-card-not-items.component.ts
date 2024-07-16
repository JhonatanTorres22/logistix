import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';


@Component({
  selector: 'ui-card-not-items',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './ui-card-not-items.component.html',
  styleUrl: './ui-card-not-items.component.scss'
})
export class UiCardNotItemsComponent {

  @Input() text: string = 'No hay ningún elemento seleccionado'

}
