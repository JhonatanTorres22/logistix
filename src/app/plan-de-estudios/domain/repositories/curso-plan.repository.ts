import { Observable } from "rxjs";
import { CursoPlanEquivalencia } from "../models/curso-plan.model";

export abstract class CursoPlanRepository {

    abstract obtenerCursoPlanEquivalencia( idCursoPlan: number ): Observable<CursoPlanEquivalencia[]>

}