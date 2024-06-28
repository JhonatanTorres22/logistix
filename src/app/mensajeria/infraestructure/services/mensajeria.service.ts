import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { MensajeriaEnviados, MensajeriaInsertar, MensajeriaRecibidos } from "../../domain/models/mensajeria.model";
import { Observable, map } from "rxjs";
import { MensajeriaMapper } from "../../domain/mappers/mensajeria.mapper";
import { MensajeriaEnviadosDataArrayDTO, MensajeriaRecibidosDataArrayDTO } from "../dto/mensajeria.dto";
import { RolUserId } from "src/app/core/mappers/rolUserId";


@Injectable({
    providedIn: 'root'
})

export class MensajeriaService {

    private urlApi: string;
    
    private urlInsertar: string;
    private urlRecibidos: string;
    private urlEnviados: string;

    constructor(
        private http: HttpClient
    ) {
        this.urlApi = environment.EndPoint;

        this.urlInsertar = 'api/Mensajeria/Insertar';
        this.urlRecibidos = 'api/Mensajeria/Recibidos?CodigoRolReceptor=';
        this.urlEnviados = 'api/Mensajeria/Enviados?CodigoRolEmisor=';
    }


    insertar( mensaje: MensajeriaInsertar ): Observable<void> {
        const mensajeAPI = MensajeriaMapper.fromDomainToApiInsertar( mensaje );

        return this.http.post<void>( this.urlApi + this.urlInsertar, mensajeAPI );
    }

    obtenerMensajesRecibidos(): Observable<MensajeriaRecibidos[]> {
        // RolUserId.currentIdRolUser
        return this.http.get<MensajeriaRecibidosDataArrayDTO>( this.urlApi + this.urlRecibidos + RolUserId.currentIdRolUser )
            .pipe( map( api => api.data.map ( MensajeriaMapper.fromApiToDomainRecibidos )))
    }

    obtenerMensajesEnviados(): Observable<MensajeriaEnviados[]> {
        // RolUserId.currentIdRolUser
        return this.http.get<MensajeriaEnviadosDataArrayDTO>( this.urlApi + this.urlEnviados + RolUserId.currentIdRolUser )
            .pipe( map( api => api.data.map ( MensajeriaMapper.fromApiToDomainEnviados )))
    }

}