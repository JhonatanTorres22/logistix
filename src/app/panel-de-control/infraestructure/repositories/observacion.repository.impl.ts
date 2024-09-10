import { inject, Injectable } from "@angular/core";
import { ObservacionRepository } from "../../domain/repositories/observacion.repository";
import { Observable } from "rxjs";
import { ObservacionInsert, Observacion } from "../../domain/models/obserbacion.model";
import { ObservacionService } from "../services/observacion.service";

@Injectable({
    providedIn: 'root'
})

export class ObservacionRepositoryImpl implements ObservacionRepository {
    
    private readonly service = inject( ObservacionService )
    
    insertar(observacion: ObservacionInsert): Observable<void> {
        return this.service.insertar( observacion )
    }
    
    listarxId(idMensaje: number): Observable<Observacion[]> {
        return this.service.listarxId( idMensaje );
    }


}