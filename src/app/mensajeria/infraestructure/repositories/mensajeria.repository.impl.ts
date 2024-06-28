import { Injectable } from "@angular/core";
import { MensajeriaRepository } from "../../domain/repositories/mensajeria.repository";
import { Observable } from "rxjs";
import { MensajeriaArchivados, MensajeriaHistorialMensajes, MensajeriaInsertar, MensajeriaRecibidos } from "../../domain/models/mensajeria.model";
import { MensajeriaService } from "../services/mensajeria.service";


@Injectable({
    providedIn: 'root'
})


export class MensajeriaRepositoryImpl implements MensajeriaRepository {

    constructor( private service: MensajeriaService ) {}
    insertar(mensaje: MensajeriaInsertar): Observable<void> {
        return this.service.insertar( mensaje );
    }
    
    obtenerMensajesRecibidos(): Observable<MensajeriaRecibidos[]> {
        return this.service.obtenerMensajesRecibidos();
    }
    
    obtenerMensajesEnviados(): Observable<MensajeriaRecibidos[]> {
        return this.service.obtenerMensajesEnviados();
    }
    
    obtenerMensajesArchivados(): Observable<MensajeriaArchivados[]> {
        throw new Error("Method not implemented.");
    }
    
    obtenerMensajesHistorial( idMensaje: number ): Observable<MensajeriaHistorialMensajes[]> {
        return this.service.obtenerMensajesHistorial( idMensaje );
    }
}