import { Observable } from "rxjs";
import { Usuario } from "../models/usuario.model";



export abstract class UsuarioRepository {
    abstract obtenerUsuarios(): Observable<Usuario[]>;
    abstract agregarUsuario( usuario: Usuario): Observable<Usuario>;
    abstract editarUsuario( usuario: Usuario): Observable<void>;
    abstract eliminarUsuario( idUsuario: number): Observable<void>;
    abstract buscarNumeroDocumento( numeroDocumento: number ):Observable<Usuario>;
}