import { Observable } from "rxjs";
import { PlanEstudio, PlanEstudioAdd, PlanEstudioEditCU, PlanEstudioEditDE, PlanEstudioEliminar } from "../models/plan-estudio.model";


export abstract class PlanEstudioRepository {

    abstract obtener( idPrograma: number ): Observable<PlanEstudio[]>
    abstract insertar( newPlan: PlanEstudioAdd ): Observable<void>
    abstract editarDE( editPlan: PlanEstudioEditDE ): Observable<void>
    abstract editarCU( editPlan: PlanEstudioEditCU ): Observable<void>
    abstract eliminar( eliminar: PlanEstudioEliminar ): Observable<void>

    // abstract

}