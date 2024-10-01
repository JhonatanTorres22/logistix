import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PreRequisitoDelete, PreRequisitoInsert } from "../../domain/models/pre-requisito.model";
import { Observable } from "rxjs";
import { PreRequisitoMapper } from "../../domain/mappers/pre-requisito.mapper";

@Injectable({
    providedIn: 'root'
})

export class PreRequisitoService {

    private urlApi: string;
    
    private urlInsertPreRequisito: string;
    private urlEliminarPreRequisito: string;

    constructor(
        private http: HttpClient
    ) {

        this.urlApi = environment.EndPoint;

        this.urlInsertPreRequisito = 'api/PreRequisito/Insertar';
        this.urlEliminarPreRequisito = 'api/PreRequisito/Eliminar';

    }

    insertPreRequisito( preRequisito: PreRequisitoInsert ): Observable<void> {
        const preRequisitoApi = PreRequisitoMapper.fromDomainToApiInsert(preRequisito);
        console.log( preRequisitoApi );
        
        return this.http.post<void>(this.urlApi + this.urlInsertPreRequisito, preRequisitoApi);
    }

    deletePreRequisito( preRequisito: PreRequisitoDelete ): Observable<void> {
        const preRequisitoApi = PreRequisitoMapper.fromApiToDomainDelete(preRequisito);
        return this.http.delete<void>(this.urlApi + this.urlEliminarPreRequisito, { body: preRequisitoApi });
    }

}