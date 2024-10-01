import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PlanEstudio, PlanEstudioAdd, PlanEstudioEditCU, PlanEstudioEditDE, PlanEstudioEliminar } from "../../domain/models/plan-estudio.model";
import { PlanEstudioDataArrayDTO } from "../dto/plan-estudio.dto";
import { PlanEstudioMapper } from "../../domain/mappers/plan-estudio.mapper";
import { serialize } from "object-to-formdata";
import { AuthSignal } from "src/app/auth/domain/signals/auth.signal";

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

    private httpBack: HttpClient;

    constructor( 
        private http: HttpClient,
        private authSignal: AuthSignal,
        handler: HttpBackend,
    ) {
        this.urlApi = environment.EndPoint;
        this.httpBack = new HttpClient(handler);
        this.urlObtener = 'api/PlanDeEstudio/Listar?CodigoProgramaAcademico=';
        this.urlInsertar = 'api/PlanDeEstudio/Insertar';
        this.urlEditarDE = 'api/PlanDeEstudio/ActualizarDE';
        this.urlEditarCU = 'api/PlanDeEstudio/ActualizarCU';
        this.urlEliminar = 'api/PlanDeEstudio/Eliminar';
        
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

        let httpParams = new HttpHeaders();
        httpParams = httpParams.set('Accept', '*/*');
        httpParams = httpParams.set('Authorization', `Bearer ${ this.authSignal.currentUserData().serviceToken }`)

        const planEditAPI = PlanEstudioMapper.fromDomainToApiEditCU( planEdit );
        console.log( planEditAPI );
        const data = serialize( planEditAPI );


        for( const [key, val] of data ) {
            console.log(`${key}: ${val}`);
            
        }
        return this.httpBack.put<void>( this.urlApi + this.urlEditarCU, data, { headers: httpParams } );

    }

    eliminar( planEliminar: PlanEstudioEliminar ): Observable<void> {
        const planEliminarAPI = PlanEstudioMapper.fromDomainToApiEliminar( planEliminar );

        return this.http.delete<void>( this.urlApi + this.urlEliminar, { body: planEliminarAPI })
    }


    
}