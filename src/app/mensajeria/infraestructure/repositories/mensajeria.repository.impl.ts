import { Injectable } from "@angular/core";
import { MensajeriaRepository } from "../../domain/repositories/mensajeria.repository";
import { Observable } from "rxjs";
import { MensajeriaArchivados, MensajeriaCerrarArchivar, MensajeriaEnviados, MensajeriaEnviarNuevoMensaje, MensajeriaHistorialMensajes, MensajeriaInsertar, MensajeriaLeerMensaje, MensajeriaNuevoMensajeList, MensajeriaRecibidos, MensajeriaResponder } from "../../domain/models/mensajeria.model";
import { MensajeriaService } from "../services/mensajeria.service";
import { UiSelect } from "src/app/core/components/ui-select/ui-select.interface";


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
    
    obtenerMensajesEnviados(): Observable<MensajeriaEnviados[]> {
        return this.service.obtenerMensajesEnviados();
    }
    
    obtenerMensajesArchivados(): Observable<MensajeriaArchivados[]> {
        return this.service.obtenerMensajesArchivados();
    }
    
    obtenerMensajesHistorial( idMensaje: number ): Observable<MensajeriaHistorialMensajes[]> {
        return this.service.obtenerMensajesHistorial( idMensaje );
    }
    
    responderMensaje(mensaje: MensajeriaResponder): Observable<void> {
        return this.service.responderMensaje( mensaje );
    }
    
    leerMensaje(mensaje: MensajeriaLeerMensaje): Observable<void> {
        return this.service.leerMensaje( mensaje );
    }
    
    cerrarArchivarMensaje(mensaje: MensajeriaCerrarArchivar): Observable<void> {
        return this.service.cerrarArchivarMensaje( mensaje );
    }

    
    obtenerTipoMensajeGrupo(): Observable<UiSelect[]> {
        return this.service.obtenerTipoMensajeGrupo();
    }
    
    
    obtenerTipoMensaje( idTipoMensajeGrupo: number ): Observable<UiSelect[]> {
        return this.service.obtenerTipoMensaje( idTipoMensajeGrupo )
    }

    nuevoMensajeA(idTipoMensaje: number ): Observable<MensajeriaNuevoMensajeList[]> {
        return this.service.nuevoMensajeA( idTipoMensaje )
    }

    enviarNuevoMensaje(mensaje: MensajeriaEnviarNuevoMensaje): Observable<void> {
        return this.service.enviarNuevoMensaje( mensaje );
    }


}