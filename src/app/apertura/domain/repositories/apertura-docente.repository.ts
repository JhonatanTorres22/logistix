import { Observable } from "rxjs";
import { AgregarDisponibilidadDocente, AgregarDocente, EditarDocente, EliminarCursoDominioDocente, EliminarDisponibilidadDocente, EliminarDocente, InsertarCursoDominioDocente, ListarCursosDominioDocente, ListarDisponibilidadDocente, ListarDocenteNoAsignado, ListarDocentes } from "../models/apertura-docente.model";

export abstract class DocenteRepository {
    abstract obtenerDocentes(idSemestre:number): Observable<ListarDocentes[]>;
    abstract editarDocente(editarDocente:EditarDocente): Observable<void>;
    abstract eliminarDocente(eliminarDocente: EliminarDocente): Observable<void>;
    abstract agregarDocente(agregarDocente: AgregarDocente[]): Observable<void>;
    abstract listarCursoDominioDocente(idDocente: number): Observable<ListarCursosDominioDocente[]>
    abstract insertarCursoDominioDocente(agregar: InsertarCursoDominioDocente[]): Observable<void>
    abstract eliminarCursoDominioDocente(eliminar: EliminarCursoDominioDocente[]):Observable<void>

    /* DISPONIBILIDAD DOCENTE */ 
    abstract obtenerDisponibilidadDocente(idDocente: number): Observable<ListarDisponibilidadDocente[]>
    abstract agregarDisponibilidadDocente(agregar: AgregarDisponibilidadDocente[]): Observable<void>
    abstract eliminarDisponibilidadDocente(eliminar: EliminarDisponibilidadDocente[]): Observable<void>

    abstract obtenerDocenteNoAsignado(idRol: number, idSemestre: number): Observable<ListarDocenteNoAsignado[]>

}