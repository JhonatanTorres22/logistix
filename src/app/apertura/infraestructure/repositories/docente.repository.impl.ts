import { Injectable } from "@angular/core";
import { DocenteRepository } from "../../domain/repositories/apertura-docente.repository";
import { AperturaDocenteService } from "../services/apertura-docente.service";
import { Observable } from "rxjs";
import { ListarDocentes } from "../../domain/models/apertura-docente.model";

@Injectable({
    providedIn: 'root'
})

export class AperturaDocenteRepositoryImpl implements DocenteRepository {
    constructor(
        private serviceDocente: AperturaDocenteService
    ){}

    obtenerDocentes(idSemestre: number, idLocal: number): Observable<ListarDocentes[]> {
        return this.serviceDocente.obtenerDocentes(idSemestre, idLocal)
    }
}