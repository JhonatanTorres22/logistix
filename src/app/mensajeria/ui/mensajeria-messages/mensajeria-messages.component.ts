import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MensajeriaNoMessagesComponent } from '../mensajeria-no-messages/mensajeria-no-messages.component';

@Component({
  selector: 'mensajeria-messages',
  standalone: true,
  imports: [ CommonModule, SharedModule, MatExpansionModule, MensajeriaNoMessagesComponent ],
  templateUrl: './mensajeria-messages.component.html',
  styleUrl: './mensajeria-messages.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class MensajeriaMessagesComponent {

  @Input() star = false;
  @Input() unStar = true;
  readonly panelOpenState = signal(false);


}
