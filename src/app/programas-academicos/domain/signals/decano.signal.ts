import { Injectable, signal } from "@angular/core";
import { UsuarioRol } from "src/app/usuarios/domain/models/usuario-rol.model";



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

    decanos: UsuarioRol[] = [];

    decanoSelect = signal( this.decano);
    decanosList = signal( this.decanos )

    setSelectDecano = ( decano: UsuarioRol) => {
        this.decanoSelect.set( decano );
    }

    setDecanosList = ( decanos: UsuarioRol[] ) => {
        this.decanosList.set( decanos );
    }
}