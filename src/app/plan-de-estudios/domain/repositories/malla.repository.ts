import { Observable } from "rxjs";
import { CursoMallaDesfasado, CursoMallaDesfasar, CursoMallaEliminar, CursoMallaEliminarEquiPre, CursoMallaInformacionEquiPre, CursoMallaInsertar, CursoMallaRenovado, CursoMallaRenovar, CursoMallaReordenar, CursoMallaRevertirDesfase, CursoMallaRevertirRenovacion, Malla, MallaDelete, MallaInsert } from "../models/malla.model";

export abstract class MallaRepository {
    abstract getMalla( idPlan: number ): Observable<Malla[]>;
    abstract getMallaPreRequisitos( idPlan: number ): Observable<Malla[]>;
    abstract getMallaEquivalencias( idPlan: number ): Observable<Malla[]>;
    abstract insertMalla( malla: MallaInsert[] ): Observable<void>;
    abstract deleteMalla( malla: MallaDelete[] ): Observable<void>;

    abstract renovarMalla( malla: CursoMallaRenovar ): Observable<void>;
    abstract reordenarMalla( malla: CursoMallaReordenar[] ): Observable<void>;
    abstract getCursoMallaRenovados( idPlan: number ): Observable<CursoMallaRenovado[]>

    abstract revertirRenovacion( malla: CursoMallaRevertirRenovacion ): Observable<void>
    abstract cursoMallaDesfasar( malla: CursoMallaDesfasar ): Observable<void>

    abstract getMallaDesfasados( idPla: number ): Observable<CursoMallaDesfasado[]>

    abstract revertirDesfase( malla: CursoMallaRevertirDesfase ): Observable<void>
    abstract cursoMallaInsertar( malla: CursoMallaInsertar ): Observable<void>
    abstract cursoMallaEliminar( malla: CursoMallaEliminar ): Observable<void>
    abstract buscarInformacionCursoMalla( idMalla: number ): Observable<CursoMallaInformacionEquiPre[]>

    abstract cursoMallaEliminarEquiPre( malla: CursoMallaEliminarEquiPre ): Observable<void>
}