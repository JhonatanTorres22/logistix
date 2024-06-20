import { Injectable, signal } from "@angular/core";
import { Programa, ProgramaFacultad } from "../models/programa.model";


@Injectable({
    providedIn: 'root'
})


export class ProgramaSignal {
    programa: ProgramaFacultad = {
        id: 0,
        definicion: '',
        nombre: '',
        usuarioId: 0
    }

    programas: ProgramaFacultad[] = [];

    programaSelect = signal( this.programa);
    programasList = signal( this.programas )
    programaEdit = signal(this.programa)

    setSelectPrograma = ( programa: ProgramaFacultad) => {
        this.programaSelect.set( programa );
    }

    setProgramaesList = ( programas: ProgramaFacultad[] ) => {
        this.programasList.set( programas );
    }

    setProgramaEdit = (programa : ProgramaFacultad) => {
        this.programaEdit.set( programa );
    }
}