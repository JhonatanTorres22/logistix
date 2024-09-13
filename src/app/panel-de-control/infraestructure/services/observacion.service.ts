import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ObservacionInsert, Observacion, ObservacionPendiente, ObservacionResolver, ObservacionConfirmar } from "../../domain/models/obserbacion.model";
import { ObservacionMapper } from "../../domain/mappers/observacion.mapper";
import { ObservacionListarDataArrayDTO, ObservacionListarPendientesDataArrayDTO } from "../dto/observacion.dto";



@Injectable({
    providedIn: 'root'
})

export class ObservacionService {

    urlApi: string;
    urlInsertar: string;
    urlListarxId: string;
    urlListarPendientes: string;
    urlResolver: string;
    urlConfirmar: string;

    constructor(
        private http: HttpClient,

     ) {
        this.urlApi = environment.EndPoint;
        this.urlInsertar = 'api/Observacion/Insertar';
        this.urlListarxId = 'api/Observacion/ListarxCodigoMensaje?MensajeriaDetalleId=';
        this.urlListarPendientes = 'api/Observacion/ListarNoResueltasNoConformes';
        this.urlResolver = 'api/Observacion/Resuelta';
        this.urlConfirmar = 'api/Observacion/Conforme';
     }

     insertObservation = ( observacion: ObservacionInsert ): Observable<void> => {
        const observacionAPI = ObservacionMapper.fromDomainToApiInsert( observacion );

        return this.http.post<void>( this.urlApi + this.urlInsertar, observacionAPI )
     }

     getObservationsById = ( idMensaje: number ): Observable<Observacion[]> => {
      return this.http.get<ObservacionListarDataArrayDTO>( this.urlApi + this.urlListarxId + idMensaje )
         .pipe( map ( responseAPI => responseAPI.data.map ( ObservacionMapper.fromApiToDomainListar ) ))
     }

     getPendingObservations = (): Observable<ObservacionPendiente[]> => {

      return this.http.get<ObservacionListarPendientesDataArrayDTO>( this.urlApi + this.urlListarPendientes )
         .pipe( map ( responseAPI => responseAPI.data.map ( ObservacionMapper.fromApiToDomainListarPendiente) ))

     }

      resolveObservation = ( observacion: ObservacionResolver ): Observable<void> => {
      const observacionAPI = ObservacionMapper.fromToDomainToApiResolver( observacion );

      return this.http.put<void>( this.urlApi + this.urlResolver, observacionAPI )
      }

      confirmObservation = ( observacion: ObservacionConfirmar ): Observable<void> => {
         const observacionAPI = ObservacionMapper.fromDomainToApiConfirmar( observacion );
         return this.http.put<void>( this.urlApi + this.urlConfirmar, observacionAPI )
      }

}