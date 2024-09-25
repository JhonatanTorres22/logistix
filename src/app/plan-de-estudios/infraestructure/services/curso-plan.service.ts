import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CursoPlanEquivalencia } from "../../domain/models/curso-plan.model";
import { CursoPlanEquivalenciaDataArrayDTO } from "../dto/curso-plan.dto";

import { CursoPlanMapper } from "../../domain/mappers/curso-plan.mapper";

@Injectable({
    providedIn: 'root'
})

export class CursoPlanService {

    urlApi: string;

    urlListarCursosPlanEquivalencia: string;

    constructor(
        private http: HttpClient
    ) {
        this.urlApi = environment.EndPoint;

        this.urlListarCursosPlanEquivalencia = 'api/Equivalencia/ListarxPlanDeEstudio?CodigoPlanDeEstudio=';
    }

    listarCursosPlanEquivalencia( idPlanEstudio: number ): Observable<CursoPlanEquivalencia[]> {
        console.log( idPlanEstudio );
        
        return this.http.get<CursoPlanEquivalenciaDataArrayDTO>( this.urlApi + this.urlListarCursosPlanEquivalencia + idPlanEstudio )
            .pipe( map( reponse => reponse.data.map( CursoPlanMapper.fromApiToDomainListarEquivalencia ))
             );

    }
}