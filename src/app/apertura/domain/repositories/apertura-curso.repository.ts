import { Observable } from "rxjs";
import { AgregarCursoApertura, EliminarCursoAperturado, ListarCursosAperturados } from "../models/apertura-curso.model";

export abstract class AperturaCursoRepository {
    abstract obtenerCursosAperturados(idLocal: number, idProgramaAcademico: number, idSemestre: number): Observable<ListarCursosAperturados[]>
    abstract agregarCursoApertura(aperturaCurso: AgregarCursoApertura[]): Observable<void>
    abstract eliminarCursoAperturado( eliminarCurso:EliminarCursoAperturado[] ) : Observable<void>
}