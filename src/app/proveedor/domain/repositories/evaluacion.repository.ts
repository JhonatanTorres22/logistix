import { Observable } from "rxjs";
import { Criterio, Evaluacion } from "../models/evaluacion.model";

export abstract class EvaluacionRepository {
    abstract obtenerCriterios(): Observable<Criterio[]>
    abstract obtenerEvaluacionProveedor(id: number): Observable<Evaluacion[]>
}