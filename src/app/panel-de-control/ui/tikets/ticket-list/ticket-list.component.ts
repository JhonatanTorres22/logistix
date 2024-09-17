import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { TicketCardComponent } from '../ticket-card/ticket-card.component';
import { Observacion, ObservacionBase, ObservacionConforme, ObservacionPendiente, Ticket } from 'src/app/panel-de-control/domain/models/obserbacion.model';
import { detalleTickets } from './detalle-tickets';
import { dataTickets } from './data-tickets';
import { ObservacionSignal } from 'src/app/panel-de-control/domain/signals/observacion.signal';
import { ObservacionRepository } from 'src/app/panel-de-control/domain/repositories/observacion.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { de } from 'date-fns/locale';
import { UiCardNotItemsComponent } from "../../../../core/components/ui-card-not-items/ui-card-not-items.component";

@Component({
  selector: 'ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TicketCardComponent,
    UiCardNotItemsComponent
],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss'
})
export class TicketListComponent implements OnInit {

  ticketList: ObservacionPendiente[] | ObservacionConforme[] = [];
  // ticketsPendientes: ObservacionPendiente[] = [];
  showConformes: boolean = false;
  listConformes: ObservacionConforme[] = [];
  filtroSelect = this.signal.filtroSelect;
  ticketsPendientes = this.signal.ticketsPendientes;
  ticketsConformes = this.signal.ticketsConformes;
  buscador = this.signal.buscador;
  renderizarTickets = this.signal.renderizarTickets;
  constructor(
    private signal: ObservacionSignal,
    private repository: ObservacionRepository,
    private alert: AlertService,
  ) {

    effect( () => {

      if( this.renderizarTickets() == 'Listar' ) {
        this.listarConformes();
        this.listarPendientes();
        this.renderizarTickets.set('');
        return;
      }

      console.log( this.buscador());
      if( this.buscador()[0] != 'Buscador' || this.buscador()[1] == '' ) {
        this.filtrar();
        return;
      }

      this.buscar();

    }, { allowSignalWrites: true } );

  }
  ngOnInit(): void {
    this.listarPendientes();
    this.listarConformes();
  }

  listarPendientes = () => {
    this.repository.listarPendientes().subscribe({
      next: ( tickets ) => {
        console.log( tickets );
        this.alert.showAlert('Listando los tikets pendientes', 'success', 6);
        this.ticketsPendientes.set( tickets )
        this.ticketList = this.ticketsPendientes() as ObservacionPendiente[];
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener los tikets pendientes....', 'error', 6)
      }
    })
  }

  listarConformes = () => {
    this.repository.listarConformes().subscribe({
      next: ( tickets ) => {
        console.log( tickets );
        this.alert.showAlert('Listando los tikets conformes', 'success', 6);
        this.ticketsConformes.set( tickets )
        this.listConformes = this.ticketsConformes() as ObservacionConforme[];
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener los tikets conformes....', 'error', 6)
      }
    })
  }

  filtrar = () => {    
    if( this.filtroSelect() == 'all' || this.filtroSelect() == 'search' ) {
      this.showConformes = false;
      this.ticketList = this.ticketsPendientes() as ObservacionPendiente[];
      return
    }

    console.log(this.filtroSelect());
    

    switch( this.filtroSelect() ) {
      case 'resuelto': {
        this.showConformes = true;
        // this.ticketList = 
        //   this.ticketsConformes().filter( (tick: ObservacionBase) => tick.estado.toLowerCase() == 'resuelto') as ObservacionConforme[];
          break;
      };

      default: {
        this.showConformes = false;
        this.ticketList = this.ticketsPendientes().filter( tick => tick.estado.toLowerCase() == this.filtroSelect()) as ObservacionPendiente[];
      }
    }

  }
  
  buscar = () => {
    let ticketFiltrado: ObservacionPendiente[] = [];
    let ticketFiltradoConforme: ObservacionConforme[] = [];

    if( this.ticketList.length == 0) {
      this.ticketList = this.ticketsPendientes() as ObservacionPendiente[];
    }
    const dataActual = this.ticketList;
    dataActual.map( tick => {

      const ticket = JSON.stringify( tick ).toLowerCase();

      if( ticket.includes( this.buscador()[1] ) ) {
        ticketFiltrado.push( tick as ObservacionPendiente );
      }

    } )
 
    this.ticketList = ticketFiltrado;
  }

}
