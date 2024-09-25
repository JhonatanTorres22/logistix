import { Injectable, signal, WritableSignal } from "@angular/core";
import { UsuarioRol } from "../models/usuario-rol.model";
import { Rol } from "src/app/roles/domain/models/rol.model";



@Injectable({
    providedIn: 'root'
})


export class UsuarioRolSignal {
    usuarioRol: UsuarioRol = {
        id: 0,
        usuario: '',
        alta: '',
        estado: '',
        rol: '',
    }

    usuarios: UsuarioRol[] = [];

    usuarioSelect = signal( this.usuarioRol);
    usuariosList = signal( this.usuarios )

    setSelectUsuarioRol = ( usuarioRol: UsuarioRol) => {
        this.usuarioSelect.set( usuarioRol );
    }

    setUsuariosRolesList = ( usuarios: UsuarioRol[] ) => {
        this.usuariosList.set( usuarios );
    }
    rolesDefault: Rol[] = [];
    roles = signal( this.rolesDefault );
}