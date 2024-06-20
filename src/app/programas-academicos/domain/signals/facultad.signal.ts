import { Injectable, signal } from "@angular/core";
import { Facultad } from "../models/facultad.model";


@Injectable({
    providedIn: 'root'
})


export class FacultadSignal {
    facultad: Facultad = {
        id: 0,
        definicion: '',
        nombre: '',
        usuarioId: 0
    }

    facultades: Facultad[] = [];

    facultadSelect = signal( this.facultad);
    facultadesList = signal( this.facultades )
    facultadEdit = signal (this.facultad);

    setSelectFacultad = ( facultad: Facultad) => {
        this.facultadSelect.set( facultad );
    }

    setFacultadesList = ( facultades: Facultad[] ) => {
        this.facultadesList.set( facultades );
    }

    setEditFacultad = (facultad: Facultad) => {
        this.facultadEdit.set(facultad)
    }
}