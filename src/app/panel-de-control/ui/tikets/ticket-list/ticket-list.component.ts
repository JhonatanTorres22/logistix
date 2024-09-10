import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { TicketCardComponent } from '../ticket-card/ticket-card.component';
import { Observacion, Ticket } from 'src/app/panel-de-control/domain/models/obserbacion.model';
import { detalleTickets } from './detalle-tickets';
import { dataTickets } from './data-tickets';
import { ObservacionSignal } from 'src/app/panel-de-control/domain/signals/observacion.signal';

@Component({
  selector: 'ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TicketCardComponent,
  ],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss'
})
export class TicketListComponent {

  tickets: Ticket[] = dataTickets;
  filtroSelect = this.signal.filtroSelect;
  buscador = this.signal.buscador;
  constructor(
    private signal: ObservacionSignal,
  ) {

    effect( () => {
      console.log( this.buscador());
      if( this.buscador()[0] != 'Buscador' || this.buscador()[1] == '' ) {
        this.filtrar();
        return;
      }

      this.buscar();

    })

  }

  filtrar = () => {
    console.log('filt');
    
    if( this.filtroSelect() == 'all' ) {
      this.tickets = dataTickets;
      return
    }

    this.tickets = dataTickets.filter( tick => tick.estado.toLowerCase() == this.filtroSelect())
  }
  
  buscar = () => {
    let ticketFiltrado: Ticket[] = [];

    const dataActual = this.tickets;

    dataActual.map( tick => {

      const ticket = JSON.stringify( tick ).toLowerCase();

      if( ticket.includes( this.buscador()[1] ) ) {
        ticketFiltrado.push( tick )
      }

    } )

    console.log(ticketFiltrado );
    
    this.tickets = ticketFiltrado;
  }

}
