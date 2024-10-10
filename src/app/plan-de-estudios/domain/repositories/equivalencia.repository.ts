import { Observable } from "rxjs";
import { CursoMallaEquivalenciaDelete, CursoMallaEquivalenciaPrimarioInsert, CursoMallaEquivalenciaSecundarioInsert, CursoMallaEquivalenciaSimulacion, EquivalenciaDelete, EquivalenciaPrimarioInsert, EquivalenciaSecundarioInsert } from "../models/equivalencia.model";

export abstract class EquivalenciaRepository {

    abstract insertarEquivalenciaPrimario( equivalencia: EquivalenciaPrimarioInsert[] ): Observable<void>
    abstract insertarEquivalenciaSecundario( equivalencia: EquivalenciaSecundarioInsert[] ): Observable<void>
    abstract eliminarEquivalencia( equivalencia: EquivalenciaDelete ): Observable<void>

    abstract insertarEquivalenciaPrimarioMalla( equivalencia: CursoMallaEquivalenciaPrimarioInsert[] ): Observable<void>
    abstract insertarEquivalenciaSecundarioMalla( equivalencia: CursoMallaEquivalenciaSecundarioInsert[] ): Observable<void>
    abstract eliminarEquivalenciaMalla( equivalencia: CursoMallaEquivalenciaDelete ): Observable<void>

    abstract simularEquivalenciaMalla( idPlanOrigen: number, idPlanDestino: number ): Observable<CursoMallaEquivalenciaSimulacion[]>
}