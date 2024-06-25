import { Observable } from "rxjs";
import { Ciclo, CicloCrear, CicloEliminar } from "../models/ciclo.model";

export abstract class CicloRepository {

    abstract obtener(): Observable<Ciclo[]>
    abstract agregar( ciclo: CicloCrear): Observable<void>
    abstract editar( ciclo: Ciclo ): Observable<void>
    abstract eliminar( ciclo: CicloEliminar ): Observable<void>

}