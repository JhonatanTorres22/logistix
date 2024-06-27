import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'mensajeria-no-messages',
  standalone: true,
  imports: [ CommonModule, SharedModule ],
  templateUrl: './mensajeria-no-messages.component.html',
  styleUrl: './mensajeria-no-messages.component.scss'
})
export class MensajeriaNoMessagesComponent {

}
