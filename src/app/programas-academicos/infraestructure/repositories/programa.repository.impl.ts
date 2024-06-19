import { Injectable } from "@angular/core";
import { ProgramaRepository } from "../../domain/repositories/programa.repository";
import { Observable } from "rxjs";
import { Programa, ProgramaCrear, ProgramaEliminar, ProgramaFacultad } from "../../domain/models/programa.model";
import { ProgramaService } from "../services/programa.service";

@Injectable({
    providedIn: 'root'
})

export class ProgramaRepositoryImpl implements ProgramaRepository {

    constructor(
        private programaService: ProgramaService
    ) {

    }

    obtenerProgramas = ( idFacultad: number): Observable<ProgramaFacultad[]> => {
        return this.programaService.obtener( idFacultad );
    }
    agregarPrograma = (programa: ProgramaCrear): Observable<void> => {
        return this.programaService.agregar( programa );
    }
    editarPrograma = (programa: Programa): Observable<void> => {
        return this.programaService.editar( programa );
    }
    eliminarPrograma = (programa: ProgramaEliminar): Observable<void> => {
        return this.programaService.eliminar( programa );
    }

}