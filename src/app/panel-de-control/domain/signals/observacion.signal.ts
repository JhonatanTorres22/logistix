import { Injectable, signal } from "@angular/core";
import { ObservacionListar } from "../models/obserbacion.model";

@Injectable({
    providedIn: 'root'
})

export class ObservacionSignal {

    observacionDefault: ObservacionListar = {
        id: 0,
        mensajeId: 0,
        ticket: "",
        categoriaNombre: "",
        subCategoriaNombre: "",
        mensaje: "",
        fechaObservacion: ""
    }

    observacionSelect = signal( this.observacionDefault );
}   