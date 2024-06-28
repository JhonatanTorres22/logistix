import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'mensajeria-no-messages',
  standalone: true,
  imports: [ CommonModule, SharedModule ],
  templateUrl: './mensajeria-no-messages.component.html',
  styleUrl: './mensajeria-no-messages.component.scss'
})
export class MensajeriaNoMessagesComponent {

  @Input() text: string = 'Seleccione un mensaje';
  @Input() icon: string = 'ti ti-mail-opened f-80';

}
