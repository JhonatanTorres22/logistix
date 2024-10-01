import { Observable } from "rxjs";
import { CursoPlanEliminar, CursoPlanEquivalencia, CursoPlanListar, CursoPlanPreRequisito, PlanEstudioCursoInsertar } from "../../domain/models/curso-plan.model";
import { CursoPlanRepository } from "../../domain/repositories/curso-plan.repository";
import { inject, Injectable } from "@angular/core";
import { CursoPlanService } from "../services/curso-plan.service";

@Injectable({
    providedIn: 'root'
})

export class CursoPlanRepositoryImpl implements CursoPlanRepository {

    // private readonly service = inject(CursoPlanService);
    constructor( private service: CursoPlanService ) {}

    insertarCursoPlan( cursosPlan: PlanEstudioCursoInsertar[] ): Observable<void> {
        return this.service.insertarCursoPlanEstudio( cursosPlan );
    }

    obtenerCursoPlan( idPlan: number ): Observable<CursoPlanListar[]> {
        return this.service.obtenerCursoPlan( idPlan );
    }
    
    eliminarCursoPlan( cursos: CursoPlanEliminar[] ): Observable<void> {
        return this.service.eliminarCursoPlan( cursos );
    }

    obtenerCursoPlanPreRequisito(idCursoPlan: number): Observable<CursoPlanPreRequisito[]> {
        return this.service.listarCursosPlanPreRequisito( idCursoPlan );
    }

    obtenerCursoPlanEquivalencia( idCursoPlan: number ): Observable<CursoPlanEquivalencia[]> {
        return this.service.listarCursosPlanEquivalencia( idCursoPlan );
    }
}