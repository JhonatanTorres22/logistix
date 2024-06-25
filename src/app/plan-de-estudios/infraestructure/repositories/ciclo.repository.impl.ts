import { Injectable } from "@angular/core";
import { CicloRepository } from "../../domain/repositories/ciclo.repository";
import { Observable } from "rxjs";
import { Ciclo, CicloCrear, CicloEliminar } from "../../domain/models/ciclo.model";
import { CicloService } from "../services/ciclo.service";

@Injectable({
    providedIn: 'root'
})

export class CicloRepositoryImpl implements CicloRepository {

    constructor(
        private cicloService: CicloService
    ) {}

    obtener(): Observable<Ciclo[]> {
        return this.cicloService.obtener()
    }
    agregar(ciclo: CicloCrear): Observable<void> {
        return this.cicloService.agregar( ciclo )
    }
    editar(ciclo: Ciclo): Observable<void> {
        return this.cicloService.editar( ciclo )
    }
    eliminar(ciclo: CicloEliminar): Observable<void> {
        return this.cicloService.eliminar( ciclo )
    }

}