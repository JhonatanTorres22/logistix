import { Observable } from "rxjs";
import { ObservacionInsert, Observacion, ObservacionPendiente, ObservacionResolver, ObservacionConforme, ObservacionBase, ObservacionConfirmar } from "../models/obserbacion.model";


export abstract class ObservacionRepository {
    abstract insertar( observacion: ObservacionInsert ): Observable<void>;
    abstract listarxId( idMensaje: number ): Observable<ObservacionBase[]>;
    abstract listarPendientes(): Observable<ObservacionPendiente[]>;
    abstract listarConformes(): Observable<ObservacionConforme[]>;
    abstract resolver( observacion: ObservacionResolver ): Observable<void>;
    abstract confirmar( observacion: ObservacionConfirmar ): Observable<void>;
}