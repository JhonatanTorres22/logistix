import { Observable } from "rxjs";
import { CursoMallaRenovar, CursoMallaReordenar, Malla, MallaDelete, MallaInsert } from "../models/malla.model";

export abstract class MallaRepository {
    abstract getMalla( idPlan: number ): Observable<Malla[]>;
    abstract getMallaPreRequisitos( idPlan: number ): Observable<Malla[]>;
    abstract getMallaEquivalencias( idPlan: number ): Observable<Malla[]>;
    abstract insertMalla( malla: MallaInsert[] ): Observable<void>;
    abstract deleteMalla( malla: MallaDelete[] ): Observable<void>;

    abstract renovarMalla( malla: CursoMallaRenovar ): Observable<void>;
    abstract reordenarMalla( malla: CursoMallaReordenar[] ): Observable<void>;
}