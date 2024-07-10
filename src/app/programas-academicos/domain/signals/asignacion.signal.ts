import { Injectable, WritableSignal, signal } from "@angular/core";
import { UsuarioRol } from "src/app/usuarios/domain/models/usuario-rol.model";
import { Asignacion, AsignacionRenderizar } from "../models/asignacion.model";



@Injectable({
    providedIn: 'root'
})


export class AsignacionSignal {
    asignacionesDefault: Asignacion[] = [];
    // renderizarAsignacionDefault: AsignacionRenderizar = '';

    
    asignaciones = signal( this.asignacionesDefault );
    renderizarAsignaciones: WritableSignal<AsignacionRenderizar> = signal( '' );


    setAsignaciones = ( asignaciones: Asignacion[] ) => {
        this.asignaciones.set( asignaciones );
    }
}