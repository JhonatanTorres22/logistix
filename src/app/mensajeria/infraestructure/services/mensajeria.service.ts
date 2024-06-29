import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { MensajeriaArchivados, MensajeriaCerrarArchivar, MensajeriaEnviados, MensajeriaHistorialMensajes, MensajeriaInsertar, MensajeriaLeerMensaje, MensajeriaRecibidos, MensajeriaResponder } from "../../domain/models/mensajeria.model";
import { Observable, map } from "rxjs";
import { MensajeriaMapper } from "../../domain/mappers/mensajeria.mapper";
import { MensajeriaArchivadosDataArrayDTO, MensajeriaEnviadosDataArrayDTO, MensajeriaHistorialMensajesDataArrayDTO, MensajeriaRecibidosDataArrayDTO } from "../dto/mensajeria.dto";
import { RolUserId } from "src/app/core/mappers/rolUserId";
import { AuthDomainService } from "src/app/auth/domain/services/auth-domain.service";


@Injectable({
    providedIn: 'root'
})

export class MensajeriaService {

    private urlApi: string;
    
    private urlInsertar: string;
    private urlRecibidos: string;
    private urlEnviados: string;
    private urlArchivados: string;
    private urlHistorialMensajes: string;
    private urlResponder: string;
    private urlLeer: string;
    private urlCerrarArchivar: string;

    private rol = this.signal.currentRol
    
    constructor(
        private http: HttpClient,
        private signal: AuthDomainService
    ) {
        this.urlApi = environment.EndPoint;

        this.urlInsertar = 'api/Mensajeria/Insertar';
        this.urlRecibidos = 'api/Mensajeria/Recibidos?CodigoRolReceptor=';
        this.urlEnviados = 'api/Mensajeria/Enviados?CodigoRolEmisor=';
        this.urlArchivados = 'api/Mensajeria/Archivados?CodigoRol=';
        this.urlHistorialMensajes = 'api/Mensajeria/Historial?CodigoMensaje=';
        this.urlResponder = 'api/Mensajeria/Responder';
        this.urlLeer = 'api/Mensajeria/Leido';
        this.urlCerrarArchivar = 'api/Mensajeria/CerrarArchivar';
    }


    insertar( mensaje: MensajeriaInsertar ): Observable<void> {
        const mensajeAPI = MensajeriaMapper.fromDomainToApiInsertar( mensaje );
        console.log('MENSAJE INSERTADO: ', mensajeAPI);
        
        return this.http.post<void>( this.urlApi + this.urlInsertar, mensajeAPI );
    }

    obtenerMensajesRecibidos(): Observable<MensajeriaRecibidos[]> {
        // RolUserId.currentIdRolUser
        // console.log(RolUserId.currentIdRolUser);
        // console.log( this. );
        
        return this.http.get<MensajeriaRecibidosDataArrayDTO>( this.urlApi + this.urlRecibidos + this.rol().id )
            .pipe( map( api => api.data.map ( MensajeriaMapper.fromApiToDomainRecibidos )));
    }

    obtenerMensajesEnviados(): Observable<MensajeriaEnviados[]> {
        // RolUserId.currentIdRolUser
        return this.http.get<MensajeriaEnviadosDataArrayDTO>( this.urlApi + this.urlEnviados + this.rol().id )
            .pipe( map( api => api.data.map ( MensajeriaMapper.fromApiToDomainEnviados )));
    }


    obtenerMensajesArchivados(): Observable<MensajeriaArchivados[]> {
        return this.http.get<MensajeriaArchivadosDataArrayDTO>( this.urlApi + this.urlArchivados + this.rol().id )
            .pipe( map ( api => api.data.map ( MensajeriaMapper.fromApiToDomainArchivados )))
    }


    obtenerMensajesHistorial( idMensaje: number ): Observable<MensajeriaHistorialMensajes[]> {
        return this.http.get<MensajeriaHistorialMensajesDataArrayDTO>( this.urlApi + this.urlHistorialMensajes + idMensaje )
            .pipe( map( api => api.data.map( MensajeriaMapper.fromApiToDomainHistorialMensajes )));
    }

    responderMensaje( mensaje: MensajeriaResponder ): Observable<void> {
        const mensajeAPI = MensajeriaMapper.fromDomainToApiResponder( mensaje );
        console.log( mensajeAPI );
        
        return this.http.post<void>( this.urlApi + this.urlResponder, mensajeAPI )
    }

    leerMensaje( mensaje: MensajeriaLeerMensaje ): Observable<void> {
        const mensajeAPI = MensajeriaMapper.fromDomainToApiLeerMensaje( mensaje );
        console.log(mensajeAPI);
        
        return this.http.put<void>( this.urlApi + this.urlLeer, mensajeAPI );
    }

    cerrarArchivarMensaje( mensaje: MensajeriaCerrarArchivar ): Observable<void> {
        const mensajeAPI = MensajeriaMapper.fromDomainToApiCerrarArchivar( mensaje );
        console.log( mensajeAPI );
        
        return this.http.put<void>( this.urlApi + this.urlCerrarArchivar, mensajeAPI );
    }

}