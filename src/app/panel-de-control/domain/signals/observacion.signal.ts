import { Injectable, signal } from "@angular/core";
import { Observacion } from "../models/obserbacion.model";

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
        fechaObservacion: ""
    }

    observacionSelect = signal( this.observacionDefault );

    ticketSelect = signal( this.observacionDefault );

    filtroSelect = signal( 'all');

    buscador = signal(['', '']);
}   