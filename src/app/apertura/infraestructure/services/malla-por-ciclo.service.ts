import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { MallaPorCicloPlanEstudio } from "../../domain/models/malla-por-ciclo.model";
import { MallaPorCicloDataArrayDTO, MallaPorCicloPlanEstudioDTO } from "../dto/malla-por-ciclo.dto";
import { MallaProCicloMapper } from "../../domain/mappers/malla-por-ciclo.mapper";

@Injectable({
    providedIn: 'root'
})
export class MallaPorCicloService {
    urlApi: string;
    urlMallaPorCiclo: string

    constructor(
        private http : HttpClient
    ){
        this.urlApi = environment.EndPoint,
        this.urlMallaPorCiclo = 'api/Malla/ListarxProgramaAcademico?codigoProgramaAcademico='
    }

    obtenerMallaPorCiclo = (idProgramaAcademico:number, idCiclo : number ) : Observable<MallaPorCicloPlanEstudio[]> => {
        let urlCiclo = `&codigoCiclo=${idCiclo}`
        return this.http.get<MallaPorCicloDataArrayDTO>(this.urlApi + this.urlMallaPorCiclo + idProgramaAcademico + urlCiclo)
        .pipe(map ( (api) => api.data.map(MallaProCicloMapper.fromApiToDomainMallaFacultad)))
    }
}