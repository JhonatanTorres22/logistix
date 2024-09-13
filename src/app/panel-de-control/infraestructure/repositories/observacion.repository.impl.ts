import { inject, Injectable } from "@angular/core";
import { ObservacionRepository } from "../../domain/repositories/observacion.repository";
import { Observable } from "rxjs";
import { ObservacionInsert, Observacion, ObservacionPendiente, ObservacionResolver, ObservacionConfirmar } from "../../domain/models/obserbacion.model";
import { ObservacionService } from "../services/observacion.service";
@Injectable({
    providedIn: 'root'
})

export class ObservacionRepositoryImpl implements ObservacionRepository {
    constructor(private readonly service: ObservacionService) {}
    confirmar(observacion: ObservacionConfirmar): Observable<void> {
        // Implement your logic here
        // For example, you can make an API call to confirm the observation
        // and return the result as an Observable<void>
        return this.service.confirmObservation(observacion);
    }

    resolver(observacion: ObservacionResolver): Observable<void> {
        // Implement your logic here
        // For example, you can make an API call to resolve the observation
        // and return the result as an Observable<void>
        return this.service.resolveObservation(observacion);
    }

    insertar(observacion: ObservacionInsert): Observable<void> {
        // Implement your logic here
        // For example, you can make an API call to insert the observation
        // and return the result as an Observable<void>
        return this.service.insertObservation(observacion);
    }

    listarxId(idMensaje: number): Observable<Observacion[]> {
        // Implement your logic here
        // For example, you can make an API call to get the observations by message ID
        // and return the result as an Observable<Observacion[]>
        return this.service.getObservationsById(idMensaje);
    }

    listarPendientes(): Observable<ObservacionPendiente[]> {
        // Implement your logic here
        // For example, you can make an API call to get the pending observations
        // and return the result as an Observable<ObservacionPendiente[]>
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