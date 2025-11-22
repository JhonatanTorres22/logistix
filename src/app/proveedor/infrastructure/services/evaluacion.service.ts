import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Criterio, Evaluacion } from "../../domain/models/evaluacion.model";
import { DataCriterioDto, DataEvaluacionDto } from "../dto/evaluacion.dto";
import { EvaluacionMapper } from "../../domain/mappers/evaluacion.mapper";

@Injectable({
    providedIn: 'root'
})

export class EvaluacionService {
    private urlAPi: string
    private urlListarCriterios: string
    private urlListarEvaluacionProveedor: string

    constructor(
        private http: HttpClient
    ) {
        this.urlAPi = environment.EndPoint
        this.urlListarCriterios = '/api/criterio/Listar';
        this.urlListarEvaluacionProveedor = '/api/evaluacion/Listar/1';
    }

    obtenerCriterios = () : Observable<Criterio[]> => {
        return this.http.get<DataCriterioDto>(this.urlAPi + this.urlListarCriterios)
        .pipe(map(api => api.data.map(EvaluacionMapper.toDomainCriterio)));
    }

    obtenerEvaluacionProveedor = (id: number) : Observable<Evaluacion[]> => {
        return this.http.get<DataEvaluacionDto>(this.urlAPi + this.urlListarEvaluacionProveedor+ id)
        .pipe(map(api => api.data.map(EvaluacionMapper.toDomainEvaluacionList) ));
    }


}