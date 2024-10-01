import { Observable } from "rxjs";
import { CursoPlanEliminar, CursoPlanEquivalencia, CursoPlanListar, CursoPlanPreRequisito, PlanEstudioCursoInsertar } from "../models/curso-plan.model";

export abstract class CursoPlanRepository {

    abstract insertarCursoPlan( cursoPlan: PlanEstudioCursoInsertar[] ): Observable<void>
    abstract obtenerCursoPlan( idPlan: number ): Observable <CursoPlanListar[]>
    abstract eliminarCursoPlan( cursos: CursoPlanEliminar[]  ): Observable<void>
    abstract obtenerCursoPlanEquivalencia( idCursoPlan: number ): Observable<CursoPlanEquivalencia[]>
    abstract obtenerCursoPlanPreRequisito( idCursoPlan: number ): Observable<CursoPlanPreRequisito[]>

}