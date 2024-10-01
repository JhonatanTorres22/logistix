import { Injectable } from "@angular/core";
import { PlanEstudioRepository } from "../../domain/repositories/plan-estudio.repository";
import { Observable } from "rxjs";
import { PlanEstudio, PlanEstudioAdd, PlanEstudioEditCU, PlanEstudioEditDE, PlanEstudioEliminar } from "../../domain/models/plan-estudio.model";
import { PlanEstudioService } from "../services/plan-estudio.service";

@Injectable({
    providedIn: 'root'
})


export class PlanEstidoRepositoryImpl implements PlanEstudioRepository {

    constructor(
        private service: PlanEstudioService
    ) {}
    
    obtener(idPrograma: number): Observable<PlanEstudio[]> {
        return this.service.obtener( idPrograma );
    }
    
    insertar(newPlan: PlanEstudioAdd): Observable<void> {
        return this.service.insertar( newPlan )
    }
    
    editarDE(editPlan: PlanEstudioEditDE): Observable<void> {
        return this.service.editarDE( editPlan );
    }

    editarCU(editPlan: PlanEstudioEditCU): Observable<void> {
        return this.service.editarCU( editPlan );
    }
    
    eliminar(eliminar: PlanEstudioEliminar): Observable<void> {
        return this.service.eliminar( eliminar );
    }
    
}