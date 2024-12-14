import { Injectable } from "@angular/core";
import { DocenteRepository } from "../../domain/repositories/apertura-docente.repository";
import { AperturaDocenteService } from "../services/apertura-docente.service";
import { Observable } from "rxjs";
import { AgregarDisponibilidadDocente, AgregarDocente, EditarDocente, EliminarCursoDominioDocente, EliminarDisponibilidadDocente, EliminarDocente, InsertarCursoDominioDocente, ListarCursosDominioDocente, ListarDisponibilidadDocente, ListarDocenteNoAsignado, ListarDocentes } from "../../domain/models/apertura-docente.model";

@Injectable({
    providedIn: 'root'
})

export class AperturaDocenteRepositoryImpl implements DocenteRepository {
    constructor(
        private serviceDocente: AperturaDocenteService
    ){}

    obtenerDocentes(idSemestre: number): Observable<ListarDocentes[]> {
        return this.serviceDocente.obtenerDocentes(idSemestre)
    }
    
    editarDocente(editarDocente: EditarDocente): Observable<void> {
        return this.serviceDocente.editarDocente(editarDocente)
    }
    
    eliminarDocente(eliminarDocente: EliminarDocente): Observable<void> {
        return this.serviceDocente.eliminarDocente(eliminarDocente)
    }

    agregarDocente(agregarDocente: AgregarDocente[]): Observable<void> {
        return this.serviceDocente.agregarDocente(agregarDocente)
    }

    listarCursoDominioDocente(idDocente: number): Observable<ListarCursosDominioDocente[]> {
        return this.serviceDocente.obtenerCursosDominioDocente(idDocente)
    }

    insertarCursoDominioDocente(agregar: InsertarCursoDominioDocente[]): Observable<void> {
        return this.serviceDocente.agregarCursoDominioDocente(agregar)
    }

    eliminarCursoDominioDocente(eliminar: EliminarCursoDominioDocente[]): Observable<void> {
        return this.serviceDocente.eliminarCursoDominioDocente(eliminar)
    }

    /* DISPONIBILIDAD DOCENTE */
    obtenerDisponibilidadDocente(idDocente: number): Observable<ListarDisponibilidadDocente[]> {
        return this.serviceDocente.obtenerDisponibilidadDocente(idDocente);
    }

    agregarDisponibilidadDocente(agregar: AgregarDisponibilidadDocente[]): Observable<void> {
        return this.serviceDocente.agregarDisponibilidadDocente(agregar)
    }

    eliminarDisponibilidadDocente(eliminar: EliminarDisponibilidadDocente[]): Observable<void> {
        return this.serviceDocente.eliminarDisponibilidadDocente(eliminar)
    }

    obtenerDocenteNoAsignado(idRol: number, idSemestre: number): Observable<ListarDocenteNoAsignado[]> {
        return this.serviceDocente.obtenerDocenteNoAsignado(idRol, idSemestre)
    }
}