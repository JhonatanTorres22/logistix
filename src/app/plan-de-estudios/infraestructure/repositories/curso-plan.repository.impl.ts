import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CursoPlanEquivalencia } from "../../domain/models/curso-plan.model";
import { CursoPlanRepository } from "../../domain/repositories/curso-plan.repository";
import { inject, Injectable } from "@angular/core";
import { CursoPlanService } from "../services/curso-plan.service";

@Injectable({
    providedIn: 'root'
})

export class CursoPlanRepositoryImpl implements CursoPlanRepository {

    // private readonly service = inject(CursoPlanService);
    constructor( private service: CursoPlanService ) {}

    obtenerCursoPlanEquivalencia( idCursoPlan: number ): Observable<CursoPlanEquivalencia[]> {
        return this.service.listarCursosPlanEquivalencia( idCursoPlan );
    }
}