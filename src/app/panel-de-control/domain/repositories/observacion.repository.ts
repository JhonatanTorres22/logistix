import { Observable } from "rxjs";
import { ObservacionInsert, Observacion, ObservacionPendiente, ObservacionResolver } from "../models/obserbacion.model";


export abstract class ObservacionRepository {
    abstract insertar( observacion: ObservacionInsert ): Observable<void>;
    abstract listarxId( idMensaje: number ): Observable<Observacion[]>;
    abstract listarPendientes(): Observable<ObservacionPendiente[]>;
    abstract resolver( observacion: ObservacionResolver ): Observable<void>;
    abstract confirmar( observacion: ObservacionResolver ): Observable<void>;
}