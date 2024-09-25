import { inject, Injectable } from "@angular/core";
import { EquivalenciaRepository } from "../../domain/repositories/equivalencia.repository";
import { Observable } from "rxjs";

import { EquivalenciaService } from "../services/equivalencia.service";
import { EquivalenciaPrimarioInsert, EquivalenciaSecundarioInsert } from "../../domain/models/equivalencia.model";


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

}