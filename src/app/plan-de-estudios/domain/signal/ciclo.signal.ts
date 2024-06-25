import { Injectable, WritableSignal, signal } from "@angular/core";
import { Ciclo, CicloCrear } from "../models/ciclo.model";


@Injectable({
    providedIn: 'root'
})

export class CicloSingal {


    cicloListDefault: Ciclo[] = [];
    cicloCrearDafault: CicloCrear = {
        cicloLetra: '',
        cicloNumero: '',
        definicion: '',
    }
    cicloDafault: Ciclo = {
        id: 0,
        cicloLetra: '',
        cicloNumero: '',
        definicion: '',
    }

    cicloList: WritableSignal<Ciclo[]> = signal( this.cicloListDefault );
    cicloAdd:WritableSignal<CicloCrear> = signal( this.cicloCrearDafault );
    cicloEdit:WritableSignal<Ciclo> = signal( this.cicloDafault );
    showForm: WritableSignal<boolean> = signal( false );
    cerrarFormCiclo: WritableSignal<string> = signal( '' );


    setCiclos( cicloList: Ciclo[]) {
        this.cicloList.set( cicloList )
    }

    setCicloAdd( ciclo: CicloCrear) {
        this.cicloAdd.set( ciclo );
    }

    setCicloEdit( ciclo: Ciclo ) {
        this.cicloEdit.set( ciclo );
    }

    setCerrarFormCiclo( estado: 'cancelar' | 'Add' | 'Edit' | '' ) {
        this.cerrarFormCiclo.set( estado );
    }

    setShowForm( show: boolean ) {
        this.showForm.set( show );
    }

}