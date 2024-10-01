import { Observable } from "rxjs";
import { EquivalenciaDelete, EquivalenciaPrimarioInsert, EquivalenciaSecundarioInsert } from "../models/equivalencia.model";

export abstract class EquivalenciaRepository {

    abstract insertarEquivalenciaPrimario( equivalencia: EquivalenciaPrimarioInsert[] ): Observable<void>
    abstract insertarEquivalenciaSecundario( equivalencia: EquivalenciaSecundarioInsert[] ): Observable<void>
    abstract eliminarEquivalencia( equivalencia: EquivalenciaDelete ): Observable<void>

}