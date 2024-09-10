import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { TicketModalComponent } from '../ticket-modal/ticket-modal.component';
import { Observacion, Ticket } from 'src/app/panel-de-control/domain/models/obserbacion.model';
import { detalleTickets } from '../ticket-list/detalle-tickets';
import { ObservacionSignal } from 'src/app/panel-de-control/domain/signals/observacion.signal';

@Component({
  selector: 'ticket-card',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiButtonComponent,
    TicketModalComponent,
  ],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.scss'
})
export class TicketCardComponent {

  // tickets: Observacion[] = detalleTickets;
  ticketSelect = this.signal.ticketSelect;

  @Input() ticket: Ticket = {
    estado: '',
    fechaObservacion: '',
    id: 0,
    mensajeId: 0,
    rol: '',
    ticket: '',
    usuario: ''
  }



  detalleTickets = detalleTickets;

  constructor(
    private modal: UiModalService,
    private signal: ObservacionSignal,

  ) {

  }

  openModalTicket = ( template: TemplateRef<any>, ticket: Ticket ) => {

    this.ticketSelect.set( detalleTickets.find( tik => tik.ticket == ticket.ticket )!);

    this.modal.openTemplate({
      template,
      titulo: ''
    })
  }
}

