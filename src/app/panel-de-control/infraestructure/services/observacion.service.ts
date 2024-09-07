import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ObservacionInsert, ObservacionListar } from "../../domain/models/obserbacion.model";
import { ObservacionMapper } from "../../domain/mappers/observacion.mapper";
import { ObservacionListarDataArrayDTO } from "../dto/observacion.dto";



@Injectable({
    providedIn: 'root'
})

export class ObservacionService {

    urlApi: string;
    urlInsertar: string;
    urlListarxId: string;

    constructor(
        private http: HttpClient,

     ) {
        this.urlApi = environment.EndPoint;
        this.urlInsertar = 'api/Observacion/Insertar';
        this.urlListarxId = 'api/Observacion/ListarxCodigoMensaje?MensajeriaDetalleId='
     }

     insertar = ( observacion: ObservacionInsert ): Observable<void> => {
        const observacionAPI = ObservacionMapper.fromDomainToApiInsert( observacion );

        return this.http.post<void>( this.urlApi + this.urlInsertar, observacionAPI )
     }

     listarxId = ( idMensaje: number ): Observable<ObservacionListar[]> => {
      return this.http.get<ObservacionListarDataArrayDTO>( this.urlApi + this.urlListarxId + idMensaje )
         .pipe( map ( responseAPI => responseAPI.data.map ( ObservacionMapper.fromApiToDomainListar ) ))
     }

}