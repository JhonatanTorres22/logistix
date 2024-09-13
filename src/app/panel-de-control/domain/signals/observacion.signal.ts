import { Injectable, signal } from "@angular/core";
import { Observacion, ObservacionPendiente } from "../models/obserbacion.model";

@Injectable({
    providedIn: 'root'
})

export class ObservacionSignal {

    filtroTipos: 'all' | 'pen' | 'apr' | 'pro'

    observacionDefault: Observacion = {
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
        fechaResuelto: ""
    }

    ticketsDefault: ObservacionPendiente[] = []

    observacionSelect = signal( this.observacionDefault );

    ticketSelect = signal( this.observacionDefault );

    filtroSelect = signal( 'all');

    tikets = signal( this.ticketsDefault );

    buscador = signal(['', '']);

    mensajeRespuestaTicket = signal('');

    conformeIsChecked = signal( false );

    rating = signal(0);
}   