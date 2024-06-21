import { Injectable, signal } from "@angular/core";
import { UsuarioRol } from "src/app/usuarios/domain/models/usuario-rol.model";
import { Asignacion } from "../models/asignacion.model";



@Injectable({
    providedIn: 'root'
})


export class AsignacionSignal {
    asignacionesDefault: Asignacion[] = []

    
    asignaciones = signal( this.asignacionesDefault );

    setAsignaciones = ( asignaciones: Asignacion[] ) => {
        this.asignaciones.set( asignaciones );
    }
}