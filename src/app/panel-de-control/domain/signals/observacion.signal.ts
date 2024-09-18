import { Injectable, signal } from "@angular/core";
import { Observacion, ObservacionBase, ObservacionConforme, ObservacionPendiente } from "../models/obserbacion.model";

@Injectable({
    providedIn: 'root'
})

export class ObservacionSignal {

    filtroTipos: 'all' | 'pen' | 'apr' | 'pro'

    observacionDefault: ObservacionBase = {
        id: 0,
        mensajeId: 0,
        ticket: "",
        categoriaNombre: "",
        subCategoriaNombre: "",
        mensaje: "",
        estado: '',
        rol: '',
        usuario: '',
        fechaObservacion: "",
        mensajeResuelto: "",
        fechaResuelto: "",
        fechaConforme: '',
        historial: []
    }

    ticketsPendientesDefault: ObservacionPendiente[] = [];
    ticketsConformesDefault: ObservacionConforme[] = [];
    ticketsCierreForzadoDefault: ObservacionBase[] = [];


    observacionSelect = signal( this.observacionDefault );

    ticketSelect = signal( this.observacionDefault );

    filtroSelect = signal( 'all');

    ticketsPendientes = signal( this.ticketsPendientesDefault );
    ticketsConformes = signal( this.ticketsConformesDefault );
    ticketsCierreForzados = signal( this.ticketsCierreForzadoDefault );

    buscador = signal(['', '']);

    mensajeRespuestaTicket = signal('');

    conformeIsChecked = signal( false );

    renderizarTickets = signal('');

    rating = signal(0);
}   