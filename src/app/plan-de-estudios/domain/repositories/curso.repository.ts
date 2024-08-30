import { Observable } from "rxjs";
import { Curso, CursoAddPreRequisito, CursoBuscarPlan, CursoCrear, CursoDeletePreRequisito, CursoEditar, CursoEliminar, CursoEncontradoEnPlan } from "../models/curso.model";

export abstract class CursoRepository {
 
    abstract obtenerPorPrograma( idPrograma: number ): Observable<Curso[]>;
    abstract agregar( curso: CursoCrear): Observable<void>;
    abstract editar( curso: CursoEditar ): Observable<void>;
    abstract eliminar( curso: CursoEliminar ): Observable<void>;
    abstract addPreRequisito( cursoPreRequisito: CursoAddPreRequisito ): Observable<void>
    abstract deletePreRequisito( cursoPreRequisito: CursoDeletePreRequisito ): Observable<void>
    abstract buscarCursoEnPlanEstudios( curso: CursoBuscarPlan): Observable<CursoEncontradoEnPlan[]>

}