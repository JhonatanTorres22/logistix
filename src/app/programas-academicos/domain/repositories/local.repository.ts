import { Observable } from "rxjs";
import { Local, LocalCrear, LocalEliminar } from "../models/local.model";

export abstract class LocalRepository {
    abstract obtener(): Observable<Local[]>
    abstract agregar( local: LocalCrear ): Observable<void>
    abstract editar( local: Local ): Observable<void>
    abstract eliminar( local: LocalEliminar ): Observable<void>
}