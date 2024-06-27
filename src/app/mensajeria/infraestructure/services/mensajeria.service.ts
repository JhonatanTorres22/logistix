import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { MensajeriaInsertar } from "../../domain/models/mensajeria.model";
import { Observable } from "rxjs";
import { MensajeriaMapper } from "../../domain/mappers/mensajeria.mapper";


@Injectable({
    providedIn: 'root'
})

export class MensajeriaService {

    private urlApi: string;
    
    private urlInsertar: string;

    constructor(
        private http: HttpClient
    ) {
        this.urlApi = environment.EndPoint;

        this.urlInsertar = 'api/Mensajeria/Insertar';
    }


    insertar( mensaje: MensajeriaInsertar ): Observable<void> {
        const mensajeAPI = MensajeriaMapper.fromDomainToApiInsertar( mensaje );

        return this.http.post<void>( this.urlApi + this.urlInsertar, mensajeAPI );
    }

}