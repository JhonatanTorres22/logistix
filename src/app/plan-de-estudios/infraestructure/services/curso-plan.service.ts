import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CursoPlanEliminar, CursoPlanEquivalencia, CursoPlanListar, CursoPlanPreRequisito, PlanEstudioCursoInsertar } from "../../domain/models/curso-plan.model";
import { CursoPlanEquivalenciaDataArrayDTO, CursoPlanListarDataArrayDTO, CursoPlanPreRequisitoDataArrayDTO } from "../dto/curso-plan.dto";

import { CursoPlanMapper } from "../../domain/mappers/curso-plan.mapper";


@Injectable({
    providedIn: 'root'
})

export class CursoPlanService {

    private urlApi: string;

    private urlCursoPlanInsertar: string;
    private urlCursoPlanListar: string;
    private urlCursoPlanEliminar: string;
    private urlListarCursosPlanEquivalencia: string;
    private urlListarCursosPlanPreRequisito: string;

    constructor(
        private http: HttpClient
    ) {
        this.urlApi = environment.EndPoint;

        this.urlListarCursosPlanEquivalencia = 'api/Equivalencia/ListarxPlanDeEstudio?CodigoPlanDeEstudio=';
        this.urlListarCursosPlanPreRequisito = 'api/PreRequisito/ListarxPlanDeEstudio?CodigoPlanDeEstudio=';
        this.urlCursoPlanInsertar = 'api/CursoPlan/Insertar';
        this.urlCursoPlanListar = 'api/CursoPlan/Listar?codigoPlanDeEstudio=';
        this.urlCursoPlanEliminar = 'api/CursoPlan/Eliminar';
    }

    insertarCursoPlanEstudio( cursosPlan: PlanEstudioCursoInsertar[] ): Observable<void> {
        const cursosAPI = CursoPlanMapper.fromDomainToApiCursoPlanInsertar( cursosPlan );

        console.log( cursosAPI );
        
        
        return this.http.post<void>( this.urlApi + this.urlCursoPlanInsertar, cursosAPI )
    }

    obtenerCursoPlan( idPlan: number ): Observable<CursoPlanListar[]> {

        return this.http.get<CursoPlanListarDataArrayDTO>( this.urlApi + this.urlCursoPlanListar + idPlan )
            .pipe( map( responseAPI => {

                console.log( responseAPI);

                return responseAPI.data.map( CursoPlanMapper.formApiToDomainCursoPlanListar )
                
            }))

    }

    eliminarCursoPlan( cursoPlanEliminar: CursoPlanEliminar[] ): Observable<void> {
        const cursoPlanEliminarAPI = CursoPlanMapper.fromDomainToApiCursoPlanEliminar( cursoPlanEliminar );

        return this.http.delete<void>( this.urlApi + this.urlCursoPlanEliminar, { body: cursoPlanEliminarAPI })
    }

    listarCursosPlanEquivalencia( idPlanEstudio: number ): Observable<CursoPlanEquivalencia[]> {
        console.log( idPlanEstudio );
        
        return this.http.get<CursoPlanEquivalenciaDataArrayDTO>( this.urlApi + this.urlListarCursosPlanEquivalencia + idPlanEstudio )
            .pipe( map( reponse => reponse.data.map( CursoPlanMapper.fromApiToDomainListarEquivalencia ))
             );

    }

    listarCursosPlanPreRequisito( idPlanEstudio: number ): Observable<CursoPlanPreRequisito[]> {
        return this.http.get<CursoPlanPreRequisitoDataArrayDTO>( this.urlApi + this.urlListarCursosPlanPreRequisito + idPlanEstudio )
            .pipe( map( reponse => reponse.data.map( CursoPlanMapper.fromApiToDomainPreRequisito ))
             );
    }

}