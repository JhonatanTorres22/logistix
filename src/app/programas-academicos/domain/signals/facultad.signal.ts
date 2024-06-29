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
    // facultadAsignadas = signal( this.facultades )
    facultadesList = signal( this.facultades );
    facultadEdit = signal (this.facultad);
    idFacultad = signal( 0 );
    idFacultadYaAsignada = signal( 0 );

    setSelectFacultad = ( facultad: Facultad) => {
        this.facultadSelect.set( facultad );
    }

    setSelectFacultadDefault = () => {
        this.facultadSelect.set( this.facultad );
    }

    setFacultadesList = ( facultades: Facultad[] ) => {
        this.facultadesList.set( facultades );
    }

    // setFacultadAsignadas = ( facultades: Facultad[] ) => {
    //     this.facultadAsignadas.set( facultades );
    // }

    setEditFacultad = (facultad: Facultad) => {
        this.facultadEdit.set(facultad)
    }

    setIdFacultad = ( id: number ) => {
        this.idFacultad.set( id )
    }

    setIdFacultadYaAsignado = ( id: number ) => {
        this.idFacultadYaAsignada.set( id )
    }
}