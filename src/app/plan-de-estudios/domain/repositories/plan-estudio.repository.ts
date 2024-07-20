import { Observable } from "rxjs";
import { CursoPlanEliminar, CursoPlanListar, PlanEstudio, PlanEstudioAdd, PlanEstudioCursoInsertar, PlanEstudioEditCU, PlanEstudioEditDE, PlanEstudioEliminar } from "../models/plan-estudio.model";


export abstract class PlanEstudioRepository {

    abstract obtener( idPrograma: number ): Observable<PlanEstudio[]>
    abstract insertar( newPlan: PlanEstudioAdd ): Observable<void>
    abstract editarDE( editPlan: PlanEstudioEditDE ): Observable<void>
    abstract editarCU( editPlan: PlanEstudioEditCU ): Observable<void>
    abstract eliminar( eliminar: PlanEstudioEliminar ): Observable<void>
    abstract insertarCursoPlan( cursoPlan: PlanEstudioCursoInsertar[] ): Observable<void>

    abstract obtenerCursoPlan( idPlan: number ): Observable <CursoPlanListar[]>
    abstract eliminarCursoPlan( cursos: CursoPlanEliminar[]  ): Observable<void>
    // abstract

}