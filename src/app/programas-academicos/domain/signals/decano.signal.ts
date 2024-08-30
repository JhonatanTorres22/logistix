import { Injectable, signal } from "@angular/core";
import { UsuarioRol } from "src/app/usuarios/domain/models/usuario-rol.model";
import { Asignacion } from "../models/asignacion.model";



@Injectable({
    providedIn: 'root'
})


export class DecanoSignal {
    decano: UsuarioRol = {
        id: 0,
        usuario: '',
        alta: '',
        estado: '',
        rol: '',
    }

    facultadEditDecanoDefault: Asignacion = {
        idFacultad: 0,
        nombreFacultad: "",
        idDecano: 0,
        nombreDecano: "",
        programas: []
    }
    
    decanos: UsuarioRol[] = [];

    decanoSelect = signal( this.decano);
    decanosList = signal( this.decanos )

    facultadEditDecano = signal( this.facultadEditDecanoDefault );


    setSelectDecano = ( decano: UsuarioRol) => {
        this.decanoSelect.set( decano );
    }

    setDecanosList = ( decanos: UsuarioRol[] ) => {
        this.decanosList.set( decanos );
    }

    setSelectDecanoDefault = () => {
        this.decanoSelect.set(this.decano)
    }

    
}