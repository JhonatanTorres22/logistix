import { Observable } from "rxjs";
import { AgregarCursoApertura, EliminarCursoAperturado, ListarCursosAperturados } from "../../domain/models/apertura-curso.model";
import { AperturaCursoRepository } from "../../domain/repositories/apertura-curso.repository";
import { AperturaCursoService } from "../services/apertura-curso.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AperturaCursoRepositoryImpl implements AperturaCursoRepository {
    constructor(private service: AperturaCursoService){}

    obtenerCursosAperturados(idLocal: number, idProgramaAcademico: number, idSemestre: number): Observable<ListarCursosAperturados[]> {
        return this.service.obtenerCursosAperturados(idLocal, idProgramaAcademico, idSemestre)
    }
    
    agregarCursoApertura(aperturaCurso: AgregarCursoApertura[]): Observable<void> {
        return this.service.agregarCursoApertura(aperturaCurso)
    }

    eliminarCursoAperturado(eliminarCurso: EliminarCursoAperturado[]): Observable<void> {
        return this.service.eliminarCursosAperturados(eliminarCurso)
    }
}