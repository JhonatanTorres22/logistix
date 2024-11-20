import { Injectable } from "@angular/core";
import { MallaPorCicloRepository } from "../../domain/repositories/malla-por-ciclo.repository";
import { MallaPorCicloService } from "../services/malla-por-ciclo.service";
import { Observable } from "rxjs";
import { MallaPorCicloPlanEstudio } from "../../domain/models/malla-por-ciclo.model";

@Injectable({
    providedIn: 'root'
})

export class MallaPorCicloImpl implements MallaPorCicloRepository {

    constructor( private mallaPorCicloService: MallaPorCicloService ) {}

    obtener(idProgramaAcademico:number, idCiclo: number): Observable<MallaPorCicloPlanEstudio[]> {
        return this.mallaPorCicloService.obtenerMallaPorCiclo(idProgramaAcademico ,idCiclo)
    }
}