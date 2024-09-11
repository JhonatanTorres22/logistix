import { Observable } from "rxjs";
import { ObservacionInsert, Observacion, ObservacionPendiente } from "../models/obserbacion.model";


export abstract class ObservacionRepository {
    abstract insertar( observacion: ObservacionInsert ): Observable<void>
    abstract listarxId( idMensaje: number ): Observable<Observacion[]>
    abstract listarPendientes(): Observable<ObservacionPendiente[]>
}