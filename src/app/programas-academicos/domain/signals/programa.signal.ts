import { Injectable, signal, WritableSignal } from "@angular/core";
import { Programa, ProgramaFacultad } from "../models/programa.model";
import { AsignacionPrograma } from "../models/asignacion.model";


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

    programaAsignacionDefault: AsignacionPrograma = {
        idPrograma: 0,
        nombrePrograma: "",
        idDirector: 0,
        nombreDirector: "",
        locales: []
    }

    programas: ProgramaFacultad[] = [];

    programaSelect = signal( this.programa);
    programaEditDirector = signal( this.programaAsignacionDefault );
    programasList = signal( this.programas )
    programaEdit = signal(this.programa)

    programasGlobal: WritableSignal<ProgramaFacultad[]> = signal( this.programas );
    setSelectPrograma = ( programa: ProgramaFacultad) => {
        this.programaSelect.set( programa );
    }

    setSelectProgramaDefault = () => {
        this.programaSelect.set( this.programa );

    }

    setProgramaesList = ( programas: ProgramaFacultad[] ) => {
        this.programasList.set( programas );
    }

    setProgramaEdit = (programa : ProgramaFacultad) => {
        this.programaEdit.set( programa );
    }
}