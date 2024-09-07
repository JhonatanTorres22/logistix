import { Observable } from "rxjs";
import { ObservacionInsert, ObservacionListar } from "../models/obserbacion.model";


export abstract class ObservacionRepository {
    abstract insertar( observacion: ObservacionInsert ): Observable<void>
    abstract listarxId( idMensaje: number ): Observable<ObservacionListar[]>
}