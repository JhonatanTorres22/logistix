import { Injectable } from "@angular/core";
import { EvaluacionRepository } from "../../domain/repositories/evaluacion.repository";
import { EvaluacionService } from "../services/evaluacion.service";

@Injectable({
    providedIn: 'root'
})

export class EvaluacionRepositoryImpl implements EvaluacionRepository {

    constructor(
        private evaluacionService: EvaluacionService
    ) {}
    
    obtenerCriterios() {
        return this.evaluacionService.obtenerCriterios()
    }
    obtenerEvaluacionProveedor(id: number) {
        return this.evaluacionService.obtenerEvaluacionProveedor( id )
    }
}
