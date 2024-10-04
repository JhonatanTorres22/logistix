import { Observable } from "rxjs";
import { Malla, MallaDelete, MallaInsert } from "../models/malla.model";

export abstract class MallaRepository {
    abstract getMalla( idPlan: number ): Observable<Malla[]>;
    abstract getMallaPreRequisitos( idPlan: number ): Observable<Malla[]>;
    abstract insertMalla( malla: MallaInsert[] ): Observable<void>;
    abstract deleteMalla( malla: MallaDelete[] ): Observable<void>;
}