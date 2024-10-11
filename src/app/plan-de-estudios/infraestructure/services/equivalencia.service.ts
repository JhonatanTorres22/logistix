import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CursoMallaEquivalenciaDelete, CursoMallaEquivalenciaPrimarioInsert, CursoMallaEquivalenciaSecundarioInsert, CursoMallaEquivalenciaSimulacion, EquivalenciaDelete, EquivalenciaPrimarioInsert, EquivalenciaSecundarioInsert } from "../../domain/models/equivalencia.model";
import { EquivalenciaMapper } from "../../domain/mappers/equivalencia.mapper";
import { CursoMallaEquivalenciaSimulacionDataArrayDTO, EquivalenciaPrimarioInsertDTO } from "../dto/equivalencia.dto";
import { map, Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class EquivalenciaService {

    private urlApi: string;
    private urlInsertarPrimario: string;
    private urlInsertarSecundario: string;
    private urlEliminar: string;

    private urlInsertarPrimarioMalla: string;
    private urlInsertarSecundarioMalla: string;
    private urlEliminarMalla: string;

    private urlSimularEquivalenciaMalla: string;

    constructor(
        private http: HttpClient
    ) {
        this.urlApi = environment.EndPoint;
        
        this.urlInsertarPrimario = 'api/Equivalencia/InsertarPrimarios';
        this.urlInsertarSecundario = 'api/Equivalencia/InsertarSecundarios';
        this.urlEliminar = 'api/Equivalencia/Eliminar';

        this.urlInsertarPrimarioMalla = 'api/Equivalencia/InsertarPrimarios2';
        this.urlInsertarSecundarioMalla = 'api/Equivalencia/InsertarSecundarios2';
        this.urlEliminarMalla = 'api/Equivalencia/Eliminar2';

        this.urlSimularEquivalenciaMalla = 'api/Equivalencia/simulacion?CodigoPlanOrigen=';


    }

    insertarPrimarios = ( equivalencia: EquivalenciaPrimarioInsert[] ) => {

        const equivalenciaAPI = equivalencia.map(EquivalenciaMapper.fromDomainToApiPrimarioInsert);

        return this.http.post<void>(`${this.urlApi}${this.urlInsertarPrimario}`, equivalenciaAPI);

    }

    insertarSecundarios = ( equivalencia: EquivalenciaSecundarioInsert[] ) => {
        
        const equivalenciaAPI = equivalencia.map(EquivalenciaMapper.fromDomainToApiSecundarioInsert);
        console.log( equivalenciaAPI);
        
        return this.http.post<void>(`${this.urlApi}${this.urlInsertarSecundario}`, equivalenciaAPI);
    }

    eliminarEquivalencia = ( equivalencia: EquivalenciaDelete ): Observable<void> => {
        const equivalenciaAPI = EquivalenciaMapper.fromDomainToApiDelete(equivalencia);
        return this.http.delete<void>(`${this.urlApi}${this.urlEliminar}`, { body: equivalenciaAPI });
    }

    insertarPrimariosMalla = ( equivalencia: CursoMallaEquivalenciaPrimarioInsert[] ) => {
        const equivalenciaAPI = equivalencia.map( EquivalenciaMapper.fromDomainToApiPrimarioInsertMalla );
        return this.http.post<void>(`${this.urlApi}${this.urlInsertarPrimarioMalla}`, equivalenciaAPI);
    }

    insertarSecundariosMalla = ( equivalencia: CursoMallaEquivalenciaSecundarioInsert[] ) => {
        const equivalenciaAPI = equivalencia.map( EquivalenciaMapper.fromDomainToApiSecundarioInsertMalla );
        return this.http.post<void>(`${this.urlApi}${this.urlInsertarSecundarioMalla}`, equivalenciaAPI);
    }

    eliminarEquivalenciaMalla = ( equivalencia: CursoMallaEquivalenciaDelete[] ): Observable<void> => {
        const equivalenciaAPI = equivalencia.map(EquivalenciaMapper.fromDomainToApiDeleteMalla);
        return this.http.delete<void>(`${this.urlApi}${this.urlEliminarMalla}`, { body: equivalenciaAPI });
    }

    simularEquivalenciaMalla = ( idPlanOrigen: number, idPlanDestino: number ): Observable<CursoMallaEquivalenciaSimulacion[]> => {
        return this.http.get<CursoMallaEquivalenciaSimulacionDataArrayDTO>(`${this.urlApi}${this.urlSimularEquivalenciaMalla}${idPlanOrigen}&CodigoPlanDestino=${idPlanDestino}`)
            .pipe( map( data => data.data.map( EquivalenciaMapper.fromApiToDomainSimulacion ) ) );
    }

}