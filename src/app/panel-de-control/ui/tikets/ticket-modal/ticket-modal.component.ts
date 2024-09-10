import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UiButtonIconComponent } from 'src/app/core/components/ui-button-icon/ui-button-icon.component';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { TicketDetalleComponent } from '../ticket-detalle/ticket-detalle.component';
import { ObservacionSignal } from 'src/app/panel-de-control/domain/signals/observacion.signal';

@Component({
  selector: 'ticket-modal',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TicketDetalleComponent,
    UiButtonComponent,
  ],
  templateUrl: './ticket-modal.component.html',
  styleUrl: './ticket-modal.component.scss'
})
export class TicketModalComponent {

  ticketSelect = this.signal.ticketSelect;

  constructor(
    private signal: ObservacionSignal
  ) {

  }

}
