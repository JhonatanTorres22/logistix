import { inject, Injectable } from "@angular/core";
import { EquivalenciaRepository } from "../../domain/repositories/equivalencia.repository";
import { Observable } from "rxjs";

import { EquivalenciaService } from "../services/equivalencia.service";
import { CursoMallaEquivalenciaDelete, CursoMallaEquivalenciaPrimarioInsert, CursoMallaEquivalenciaSecundarioInsert, CursoMallaEquivalenciaSimulacion, EquivalenciaDelete, EquivalenciaPrimarioInsert, EquivalenciaSecundarioInsert } from "../../domain/models/equivalencia.model";


@Injectable({
    providedIn: 'root'
})

export class EquivalenciaRepositoryImpl implements EquivalenciaRepository {
    
    private readonly service = inject( EquivalenciaService )

    insertarEquivalenciaPrimario(equivalencia: EquivalenciaPrimarioInsert[]): Observable<void> {
        return this.service.insertarPrimarios(equivalencia);
    }

    insertarEquivalenciaSecundario(equivalencia: EquivalenciaSecundarioInsert[]): Observable<void> {
        return this.service.insertarSecundarios(equivalencia);
    }

    eliminarEquivalencia(equivalencia: EquivalenciaDelete): Observable<void> {
        return this.service.eliminarEquivalencia(equivalencia);
    }

    insertarEquivalenciaPrimarioMalla(equivalencia: CursoMallaEquivalenciaPrimarioInsert[]): Observable<void> {
        return this.service.insertarPrimariosMalla(equivalencia);
    }
    insertarEquivalenciaSecundarioMalla(equivalencia: CursoMallaEquivalenciaSecundarioInsert[]): Observable<void> {
        return this.service.insertarSecundariosMalla(equivalencia);
    }
    eliminarEquivalenciaMalla(equivalencia: CursoMallaEquivalenciaDelete): Observable<void> {
        return this.service.eliminarEquivalenciaMalla(equivalencia);
    }
    
    simularEquivalenciaMalla(idPlanOrigen: number, idPlanDestino: number): Observable<CursoMallaEquivalenciaSimulacion[]> {
        return this.service.simularEquivalenciaMalla(idPlanOrigen, idPlanDestino);
    }
}