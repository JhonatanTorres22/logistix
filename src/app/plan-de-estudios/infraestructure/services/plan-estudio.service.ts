import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CursoPlanEliminar, CursoPlanListar, PlanEstudio, PlanEstudioAdd, PlanEstudioCursoInsertar, PlanEstudioEditCU, PlanEstudioEditDE, PlanEstudioEliminar } from "../../domain/models/plan-estudio.model";
import { CursoPlanListarDataArrayDTO, PlanEstudioDataArrayDTO } from "../dto/plan-estudio.dto";
import { PlanEstudioMapper } from "../../domain/mappers/plan-estudio.mapper";


@Injectable({
    providedIn: 'root'
})

export class PlanEstudioService {

    private urlApi: string;
    private urlObtener: string;
    private urlInsertar: string;
    private urlEditarDE: string;
    private urlEditarCU: string;
    private urlEliminar: string;
    private urlCursoPlanInsertar: string;
    private urlCursoPlanListar: string;
    private urlCursoPlanEliminar: string;


    constructor( 
        private http: HttpClient
    ) {
        this.urlApi = environment.EndPoint;
        this.urlObtener = 'api/PlanDeEstudio/Listar?CodigoProgramaAcademico=';
        this.urlInsertar = 'api/PlanDeEstudio/Insertar';
        this.urlEditarDE = 'api/PlanDeEstudio/ActualizarDE';
        this.urlEditarCU = 'api/PlanDeEstudio/ActualizarCU';
        this.urlEliminar = 'api/PlanDeEstudio/Eliminar';
        this.urlCursoPlanInsertar = 'api/CursoPlan/Insertar';
        this.urlCursoPlanListar = 'api/CursoPlan/Listar?codigoPlanDeEstudio=';
        this.urlCursoPlanEliminar = 'api/CursoPlan/Eliminar';
    }

    obtener( idPrograma: number ): Observable<PlanEstudio[]> {
        return this.http.get<PlanEstudioDataArrayDTO>( this.urlApi + this.urlObtener + idPrograma )
            .pipe( map( responseAPI => responseAPI.data.map( PlanEstudioMapper.fromApiToDomain )))
    }

    insertar( newPlan: PlanEstudioAdd ): Observable<void> {
        const planAPI = PlanEstudioMapper.fromDomainToApiAdd( newPlan )
        console.log( planAPI );
        
        return this.http.post<void>( this.urlApi + this.urlInsertar, planAPI )
    }

    editarDE( planEdit: PlanEstudioEditDE ): Observable<void> {

        const planEditAPI = PlanEstudioMapper.fromDomainToApiEditDE( planEdit );
        console.log(planEditAPI);
        
        return this.http.put<void>( this.urlApi + this.urlEditarDE, planEditAPI );

    }

    editarCU( planEdit: PlanEstudioEditCU ): Observable<void> {

        const planEditAPI = PlanEstudioMapper.fromDomainToApiEditCU( planEdit );
        console.log( planEditAPI );
        
        return this.http.put<void>( this.urlApi + this.urlEditarCU, planEditAPI );

    }

    eliminar( planEliminar: PlanEstudioEliminar ): Observable<void> {
        const planEliminarAPI = PlanEstudioMapper.fromDomainToApiEliminar( planEliminar );

        return this.http.delete<void>( this.urlApi + this.urlEliminar, { body: planEliminarAPI })
    }


    insertarCursoPlanEstudio( cursosPlan: PlanEstudioCursoInsertar[] ): Observable<void> {
        const cursosAPI = PlanEstudioMapper.fromDomainToApiCursoPlanInsertar( cursosPlan );

        console.log( cursosAPI );
        
        
        return this.http.post<void>( this.urlApi + this.urlCursoPlanInsertar, cursosAPI )
    }

    obtenerCursoPlan( idPlan: number ): Observable<CursoPlanListar[]> {

        return this.http.get<CursoPlanListarDataArrayDTO>( this.urlApi + this.urlCursoPlanListar + idPlan )
            .pipe( map( responseAPI => responseAPI.data.map( PlanEstudioMapper.formApiToDomainCursoPlanListar )))

    }

    eliminarCursoPlan( cursoPlanEliminar: CursoPlanEliminar[] ): Observable<void> {
        const cursoPlanEliminarAPI = PlanEstudioMapper.fromDomainToApiCursoPlanEliminar( cursoPlanEliminar );

        return this.http.delete<void>( this.urlApi + this.urlCursoPlanEliminar, { body: cursoPlanEliminarAPI })
    }
}