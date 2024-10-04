import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Malla, MallaDelete, MallaInsert } from "../../domain/models/malla.model";
import { MallaDataArrayDTO, MallaPreRequisitoDataArrayDTO } from "../dto/malla.dto";
import { environment } from "src/environments/environment";
import { MallaMapper } from "../../domain/mappers/malla.mapper";

@Injectable({
    providedIn: 'root'
})

export class MallaService {

    private urlApi: string;
    private urlGetMalla: string;
    private urlGetMallaPreRequisitos: string;
    private urlInsertMalla: string;
    private urlDeleteMalla: string;
        
        constructor(
            private http: HttpClient
        ) {
            this.urlApi = environment.EndPoint;
            this.urlGetMalla = 'api/Malla/Listar?codigoPlanDeEstudio=';
            this.urlGetMallaPreRequisitos = 'api/PreRequisito/ListarxPlanDeEstudio2?CodigoPlanDeEstudio=';
            this.urlInsertMalla = 'api/Malla/Insertar';
            this.urlDeleteMalla = 'api/Malla/Eliminar';
        }
        
        getMalla(idPlan: number): Observable<Malla[]> {
            return this.http.get<MallaDataArrayDTO>(this.urlApi + this.urlGetMalla + idPlan)
                .pipe( map( response => response.data.map( MallaMapper.fromApiToDomainList )) );
        }

        getMallaPreRequisitos(idPlan: number): Observable<Malla[]> {
            return this.http.get<MallaPreRequisitoDataArrayDTO>(this.urlApi + this.urlGetMallaPreRequisitos + idPlan)
                .pipe( map( response => response.data.map( MallaMapper.fromApiToDomainPreRequisito )) );
        }
        
        insertMalla(malla: MallaInsert[]): Observable<void> {
            const mallaAPI = malla.map( MallaMapper.fromDomainToApiInsert );
            return this.http.post<void>(this.urlApi + this.urlInsertMalla, mallaAPI);
        }
        
        deleteMalla( malla: MallaDelete[] ): Observable<void> {
            const mallaApi = malla.map( MallaMapper.fromDomainToApiDelete );
            return this.http.delete<void>(this.urlApi + this.urlDeleteMalla, { body: mallaApi });
        }
}