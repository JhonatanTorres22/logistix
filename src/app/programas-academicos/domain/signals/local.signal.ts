import { Injectable, signal } from "@angular/core";
import { Facultad } from "../models/facultad.model";
import { Local } from "../models/local.model";


@Injectable({
    providedIn: 'root'
})


export class LocalSignal {
    local: Local = {
        id: 0,
        definicion: '',
        nombre: '',
        latitud: 0,
        longitud: 0,
        usuarioId: 0
    }

    locales: Local[] = [];

    localSelect = signal( this.local);
    localList = signal( this.locales )

    setSelectLocal = ( local: Local) => {
        this.localSelect.set( local );
    }

    setLocalesList = ( locales: Local[] ) => {
        this.localList.set( locales );
    }
}