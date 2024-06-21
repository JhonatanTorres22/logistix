import { Injectable, signal } from "@angular/core";
import { UsuarioRol } from "src/app/usuarios/domain/models/usuario-rol.model";



@Injectable({
    providedIn: 'root'
})


export class DirectorSignal {
    director: UsuarioRol = {
        id: 0,
        usuario: '',
        alta: '',
        estado: '',
        rol: '',
    }

    directores: UsuarioRol[] = [];

    directorSelect = signal( this.director);
    directoresList = signal( this.directores )

    setSelectDirector = ( director: UsuarioRol) => {
        this.directorSelect.set( director );
    }

    setSelectDirectorDefault = () => {
        this.directorSelect.set( this.director );
    }

    setDirectoresList = ( directors: UsuarioRol[] ) => {
        this.directoresList.set( directors );
    }
}