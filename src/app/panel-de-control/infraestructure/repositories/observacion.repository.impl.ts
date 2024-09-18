import { inject, Injectable } from "@angular/core";
import { ObservacionRepository } from "../../domain/repositories/observacion.repository";
import { Observable } from "rxjs";
import { ObservacionInsert, Observacion, ObservacionPendiente, ObservacionResolver, ObservacionConfirmar, ObservacionConforme, ObservacionBase } from "../../domain/models/obserbacion.model";
import { ObservacionService } from "../services/observacion.service";
@Injectable({
    providedIn: 'root'
})

export class ObservacionRepositoryImpl implements ObservacionRepository {
    
    constructor(private readonly service: ObservacionService) {}

    listarCierresForzados(): Observable<ObservacionBase[]> {
        return this.service.getCierresForzados();
    }
    
  
    listarConformes(): Observable<ObservacionConforme[]> {

        return this.service.getConformedObservations();

    }
    confirmar(observacion: ObservacionConfirmar): Observable<void> {

        return this.service.confirmObservation(observacion);
    }

    resolver(observacion: ObservacionResolver): Observable<void> {

        return this.service.resolveObservation(observacion);
    }

    insertar(observacion: ObservacionInsert): Observable<void> {

        return this.service.insertObservation(observacion);
    }

    listarxId(idMensaje: number): Observable<ObservacionBase[]> {

        return this.service.getObservationsById(idMensaje);
    }

    listarPendientes(): Observable<ObservacionPendiente[]> {

        return this.service.getPendingObservations();
    }
}



//     override resolver(observacion: ObservacionResolver): Observable<void> {
//         throw new Error("Method not implemented.");
//     }
    
//     private readonly service = inject( ObservacionService )
    
//     insertar(observacion: ObservacionInsert): Observable<void> {
//         return this.service.insertar( observacion )
//     }
    
//     listarxId(idMensaje: number): Observable<Observacion[]> {
//         return this.service.listarxId( idMensaje );
//     }
    
//     listarPendientes(): Observable<ObservacionPendiente[]> {
//         return this.service.listarPendientes();
//     }

// }