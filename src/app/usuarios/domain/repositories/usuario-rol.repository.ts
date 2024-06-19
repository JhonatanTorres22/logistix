import { Observable } from "rxjs";
import { UsuarioRol, UsuarioRolAgregar, UsuarioRolAlta, UsuarioRolEliminar, UsuarioRolSuspender } from "../models/usuario-rol.model";


export abstract class UsuarioRolRepository {

    abstract obtenerUsuariosRol(): Observable<UsuarioRol[]>
    abstract asignarRolToUser( usuarioRolAgregar: UsuarioRolAgregar ): Observable<void>
    abstract suspenderRolUser( usuarioRolSuspender: UsuarioRolSuspender): Observable<void>
    abstract activarRolUser( usuarioRolActivar: UsuarioRolSuspender): Observable<void>
    abstract eliminarRolUser( usuarioRolEliminar: UsuarioRolEliminar ): Observable<void>
    abstract darAltaRolUser( usuarioRolAlta: UsuarioRolAlta ): Observable<void>
}