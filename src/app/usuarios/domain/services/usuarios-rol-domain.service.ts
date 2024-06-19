import { Injectable, signal } from "@angular/core";
import { UsuarioRol } from "../models/usuario-rol.model";


@Injectable({
    providedIn: 'root'
})

export class UsuariosRolDomainService {

    usuariosRolDefault: UsuarioRol[] = [];

    usuariosRol = signal( this.usuariosRolDefault );

    setUsuariosRol = ( usuarios: UsuarioRol[] ) => {
        this.usuariosRol.set( usuarios )
    }

}