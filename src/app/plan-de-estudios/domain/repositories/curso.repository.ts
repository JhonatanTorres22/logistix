import { Observable } from "rxjs";
import { 
    Curso,
    CursoAddPreRequisito,
    CursoBuscarPlan,
    CursoCrear,
    CursoDeletePreRequisito,
    CursoDesfasado,
    CursoDesfasar,
    CursoEditar,
    CursoEliminar,
    CursoEncontradoEnPlan,
    CursoRenovar, 
    CursoRevertirDesfase,
    CursoRevertirRenovacion
} from "../models/curso.model";

export abstract class CursoRepository {
 
    abstract obtenerPorPrograma( idPrograma: number ): Observable<Curso[]>;
    abstract agregar( curso: CursoCrear): Observable<void>;
    abstract agregarMasive( cursos: CursoCrear[]): Observable<void>;
    abstract renovar( curso: CursoRenovar ): Observable<void>;
    abstract desfasar( curso: CursoDesfasar ): Observable<void>;
    abstract revertirDesfase( curso: CursoRevertirDesfase ): Observable<void>;
    abstract revertirRenovacion( curso: CursoRevertirRenovacion ): Observable<void>;
    abstract editar( curso: CursoEditar ): Observable<void>;
    abstract eliminar( curso: CursoEliminar ): Observable<void>;
    abstract addPreRequisito( cursoPreRequisito: CursoAddPreRequisito ): Observable<void>
    abstract deletePreRequisito( cursoPreRequisito: CursoDeletePreRequisito ): Observable<void>
    abstract buscarCursoEnPlanEstudios( cursoId: number): Observable<CursoEncontradoEnPlan[]>
    abstract obtenerCursosDesfasados( idPrograma: number ): Observable<CursoDesfasado[]>

}