import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { CursoMallaDesfasado, CursoMallaDesfasar, CursoMallaRenovado, CursoMallaRenovar, CursoMallaReordenar, CursoMallaRevertirDesfase, CursoMallaRevertirRenovacion, Malla, MallaDelete, MallaInsert } from "../../domain/models/malla.model";
import { CursoMallaDesfasadoDataArrayDTO, CursoMallaRenovadoDataArrayDTO, MallaDataArrayDTO, MallaEquivalenciaDataArrayDTO, MallaPreRequisitoDataArrayDTO } from "../dto/malla.dto";
import { environment } from "src/environments/environment";
import { MallaMapper } from "../../domain/mappers/malla.mapper";

@Injectable({
    providedIn: 'root'
})

export class MallaService {

    private urlApi: string;
    private urlGetMalla: string;
    private urlGetMallaPreRequisitos: string;
    private urlGetMallaEquivalencias: string;
    private urlGetMallaRenovados: string;
    private urlInsertMalla: string;
    private urlDeleteMalla: string;
    private urlRenovarMalla: string;
    private urlReordenarMalla: string;
    private urlRevertirRenovacionMalla: string;
    private urlDesfasarMalla: string;
    private urlGetDesfasados: string;
    private urlRevertirDesfase: string;
        
        constructor(
            private http: HttpClient
        ) {
            this.urlApi = environment.EndPoint;
            this.urlGetMalla = 'api/Malla/Listar?codigoPlanDeEstudio=';
            this.urlGetMallaPreRequisitos = 'api/PreRequisito/ListarxPlanDeEstudio2?CodigoPlanDeEstudio=';
            this.urlGetMallaEquivalencias = 'api/Equivalencia/Listar2?CodigoPlanDeEstudio=';
            this.urlGetMallaRenovados = 'api/Malla/ListarRenovados?codigoPlanEstudio='
            this.urlInsertMalla = 'api/Malla/Insertar';
            this.urlDeleteMalla = 'api/Malla/Eliminar';
            this.urlRenovarMalla = 'api/Malla/Renovar';
            this.urlReordenarMalla = 'api/Malla/ActualizarOrden';
            this.urlRevertirRenovacionMalla = 'api/Malla/RevertirRenovado';
            this.urlDesfasarMalla = 'api/Malla/Desfasar';
            this.urlGetDesfasados = 'api/Malla/ListarDesfasados?codigoPlanEstudio=';
            this.urlRevertirDesfase = 'api/Malla/RevertirDesfasado'

        }
        
        getMalla(idPlan: number): Observable<Malla[]> {
            return this.http.get<MallaDataArrayDTO>(this.urlApi + this.urlGetMalla + idPlan)
                .pipe( map( response => response.data.map( MallaMapper.fromApiToDomainList )) );
        }

        getMallaPreRequisitos(idPlan: number): Observable<Malla[]> {
            return this.http.get<MallaPreRequisitoDataArrayDTO>(this.urlApi + this.urlGetMallaPreRequisitos + idPlan)
                .pipe( map( response => response.data.map( MallaMapper.fromApiToDomainPreRequisito )) );
        }
        
        getMallaEquivalencias(idPlan: number): Observable<Malla[]> {
            return this.http.get<MallaEquivalenciaDataArrayDTO>(this.urlApi + this.urlGetMallaEquivalencias + idPlan)
                .pipe( map( response => response.data.map( MallaMapper.fromApiToDomainEquivalencia )) );
        }

        getMallaRenovados( idPlan: number ): Observable<CursoMallaRenovado[]> {

            return this.http.get<CursoMallaRenovadoDataArrayDTO>( this.urlApi + this.urlGetMallaRenovados + idPlan )
                .pipe( map( responseAPI => responseAPI.data.map(  MallaMapper.fromApiToDomainRenovados ) ))

        }

        insertMalla(malla: MallaInsert[]): Observable<void> {
            const mallaAPI = malla.map( MallaMapper.fromDomainToApiInsert );
            return this.http.post<void>(this.urlApi + this.urlInsertMalla, mallaAPI);
        }
        
        deleteMalla( malla: MallaDelete[] ): Observable<void> {
            const mallaApi = malla.map( MallaMapper.fromDomainToApiDelete );
            return this.http.delete<void>(this.urlApi + this.urlDeleteMalla, { body: mallaApi });
        }

        renovarMalla(malla: CursoMallaRenovar): Observable<void> {
            const mallaAPI = MallaMapper.fromDomainToApiCursoMallaRenovar( malla );
            console.log( mallaAPI );
            
            return this.http.post<void>(this.urlApi + this.urlRenovarMalla, mallaAPI);
        }

        reordenarMalla(malla: CursoMallaReordenar[]): Observable<void> {
            const mallaAPI = malla.map( MallaMapper.fromDomainToApiCursoMallaReordenar );
            console.log( mallaAPI );
            
            return this.http.put<void>(this.urlApi + this.urlReordenarMalla, mallaAPI);
        }

        revertirRenovacion( malla: CursoMallaRevertirRenovacion ): Observable<void> {
            const mallaAPI = MallaMapper.fromDomainToApiRevertirRenovacion( malla );

            return this.http.delete<void>( this.urlApi + this.urlRevertirRenovacionMalla, { body: mallaAPI } )
        }

        desfasarMalla( malla: CursoMallaDesfasar ): Observable<void> {
            const mallaAPI = MallaMapper.fromDomainToApiDesfasar( malla );

            return this.http.put<void>( this.urlApi + this.urlDesfasarMalla, mallaAPI );
        }

        getMallaDesfasados( idPlan: number ): Observable<CursoMallaDesfasado[]> {
            return this.http.get<CursoMallaDesfasadoDataArrayDTO>( this.urlApi + this.urlGetDesfasados + idPlan )
                .pipe( map ( responseAPI => responseAPI.data.map ( MallaMapper.froApiToDomainDesfasados ) ) )
        }

        revertirDesfase( malla: CursoMallaRevertirDesfase ): Observable<void> {
            const mallaAPI = MallaMapper.fromDomainToApiRevertirDesfase( malla );
            return this.http.post<void>( this.urlApi + this.urlRevertirDesfase, mallaAPI )
        }
}