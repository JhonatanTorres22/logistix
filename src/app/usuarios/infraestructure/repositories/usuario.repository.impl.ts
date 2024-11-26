import { Injectable } from "@angular/core";
import { UsuarioRepository } from "../../domain/repositories/usuario.repository";
import { UsuarioService } from "../services/usuario.service";
import { Observable } from "rxjs";
import { Usuario, UsuarioCrearMasivo } from "../../domain/models/usuario.model";


@Injectable({
    providedIn: 'root'
})

export class UsuarioRepositoryImpl implements UsuarioRepository {

    constructor( private usuarioService: UsuarioService) {}

    obtenerUsuarios = (): Observable<Usuario[]> => {
        return this.usuarioService.obtenerUsuarios();
    }

    agregarUsuario = (usuario: Usuario): Observable<Usuario> => {
        return this.usuarioService.agregarUsuario( usuario );
    }

    editarUsuario = (usuario: Usuario): Observable<void> => {
        return this.usuarioService.editarUsuario( usuario );
    }

    eliminarUsuario = (idUsuario: number): Observable<void> => {
        return this.usuarioService.eliminarUsuario( idUsuario );
    }

    buscarNumeroDocumento = (numeroDocumento: number): Observable<Usuario> => {
        return this.usuarioService.buscarNumeroDocumento( numeroDocumento );
    }
     agregarUsuarioMasivo(agregarUsuario: UsuarioCrearMasivo[]): Observable<void> {
        return this.usuarioService.agregarUsaurioMasivo(agregarUsuario)
    }
}