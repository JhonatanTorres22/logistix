import { Observable } from "rxjs";
import { UsuarioRol, UsuarioRolAgregar, UsuarioRolAlta, UsuarioRolEliminar, UsuarioRolSuspender } from "../../domain/models/usuario-rol.model";
import { UsuarioRolRepository } from "../../domain/repositories/usuario-rol.repository";
import { UsuarioRolService } from "../services/usuario-rol.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UsuarioRolRepositoryImp implements UsuarioRolRepository {


    constructor(
        private usuarioRolService: UsuarioRolService
     ) {

     }
     
    obtenerUsuariosRol = (): Observable<UsuarioRol[]> => {
        return this.usuarioRolService.obtenerUsuariosRol();
    }
    
    asignarRolToUser = (usuarioRolAgregar: UsuarioRolAgregar ): Observable<void> => {
        return this.usuarioRolService.asignarRolToUser( usuarioRolAgregar )
    }
    
    suspenderRolUser = (usuarioRolSuspender: UsuarioRolSuspender): Observable<void> => {
        return this.usuarioRolService.suspenderRolUser( usuarioRolSuspender );
    }
    
    activarRolUser = (usuarioRolActivar: UsuarioRolSuspender): Observable<void> => {
        return this.usuarioRolService.activarRolUser( usuarioRolActivar );
    }
    
    eliminarRolUser = (usuarioRolEliminar: UsuarioRolEliminar): Observable<void> => {
        return this.usuarioRolService.eliminarRolUser( usuarioRolEliminar )
    
    }
    darAltaRolUser = (usuarioRolAlta: UsuarioRolAlta): Observable<void> => {
        return this.usuarioRolService.darAltaRolUser( usuarioRolAlta );
    }
}