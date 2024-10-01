import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { EquivalenciaDelete, EquivalenciaPrimarioInsert, EquivalenciaSecundarioInsert } from "../../domain/models/equivalencia.model";
import { EquivalenciaMapper } from "../../domain/mappers/equivalencia.mapper";
import { EquivalenciaPrimarioInsertDTO } from "../dto/equivalencia.dto";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class EquivalenciaService {

    private urlApi: string;
    private urlInsertarPrimario: string;
    private urlInsertarSecundario: string;
    private urlEliminar: string;

    constructor(
        private http: HttpClient
    ) {
        this.urlApi = environment.EndPoint;
        
        this.urlInsertarPrimario = 'api/Equivalencia/InsertarPrimarios';
        this.urlInsertarSecundario = 'api/Equivalencia/InsertarSecundarios';
        this.urlEliminar = 'api/Equivalencia/Eliminar';
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
        const equivalenciaAPI = EquivalenciaMapper.fromApiToDomainDelete(equivalencia);
        return this.http.delete<void>(`${this.urlApi}${this.urlEliminar}`, { body: equivalenciaAPI });
    }

}