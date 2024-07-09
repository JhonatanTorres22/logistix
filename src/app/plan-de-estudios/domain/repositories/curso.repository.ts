import { Observable } from "rxjs";
import { Curso, CursoCrear, CursoEditar, CursoEliminar } from "../models/curso.model";

export abstract class CursoRepository {
 
    abstract obtener(): Observable<Curso[]>;
    abstract agregar( curso: CursoCrear): Observable<void>;
    abstract editar( curso: CursoEditar ): Observable<void>;
    abstract eliminar( curso: CursoEliminar ): Observable<void>;
}