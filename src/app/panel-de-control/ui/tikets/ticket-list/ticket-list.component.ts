import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { TicketCardComponent } from '../ticket-card/ticket-card.component';
import { Observacion, ObservacionPendiente, Ticket } from 'src/app/panel-de-control/domain/models/obserbacion.model';
import { detalleTickets } from './detalle-tickets';
import { dataTickets } from './data-tickets';
import { ObservacionSignal } from 'src/app/panel-de-control/domain/signals/observacion.signal';
import { ObservacionRepository } from 'src/app/panel-de-control/domain/repositories/observacion.repository';
import { AlertService } from 'src/app/demo/services/alert.service';

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
export class TicketListComponent implements OnInit {

  ticketsPendientes: ObservacionPendiente[] = [];
  filtroSelect = this.signal.filtroSelect;
  tickets = this.signal.tikets;
  buscador = this.signal.buscador;
  constructor(
    private signal: ObservacionSignal,
    private repository: ObservacionRepository,
    private alert: AlertService,
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
  ngOnInit(): void {
    this.listarPendientes();
  }

  listarPendientes = () => {
    this.repository.listarPendientes().subscribe({
      next: ( tickets ) => {
        console.log( tickets );
        this.alert.showAlert('Listando los tikets pendientes', 'success', 6);
        this.tickets.set( tickets )
        this.ticketsPendientes = this.tickets();
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener los tikets pendientes....', 'error', 6)
      }
    })
  }

  filtrar = () => {    
    if( this.filtroSelect() == 'all' || this.filtroSelect() == 'search' ) {
      this.ticketsPendientes = this.tickets();
      return
    }

    // this.tickets = dataTickets.filter( tick => tick.estado.toLowerCase() == this.filtroSelect())
  }
  
  buscar = () => {
    let ticketFiltrado: ObservacionPendiente[] = [];
    if( this.tickets.length == 0) {
      // this.tickets = dataTickets
      this.ticketsPendientes = this.tickets()
    }
    const dataActual = this.ticketsPendientes;
    dataActual.map( tick => {

      const ticket = JSON.stringify( tick ).toLowerCase();

      if( ticket.includes( this.buscador()[1] ) ) {
        ticketFiltrado.push( tick )
      }

    } )
    // console.log(ticketFiltrado );    
    this.ticketsPendientes = ticketFiltrado;
  }

}
