import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ListarDocentes } from "../../domain/models/apertura-docente.model";
import { DocenteArrayDTO } from "../dto/apertura-docente.dto";
import { AperturaDocenteMapper } from "../../domain/mappers/apertura-doscente.mapper";

@Injectable({
    providedIn: 'root'
})

export class AperturaDocenteService {
    private urlApi: string;
    private urlListarDocente: string;

    constructor(
        private http: HttpClient
    ){
        this.urlApi = environment.EndPoint,
        this.urlListarDocente = 'api/Docente/Listar?codigoSemestre='
    }

    obtenerDocentes(idSemestre: number, idLocal:number):Observable<ListarDocentes[]>{
        return this.http.get<DocenteArrayDTO>(this.urlApi + this.urlListarDocente + idSemestre + `&codigoLocal=${idLocal}`)
        .pipe(map(( api ) => api.data.map(AperturaDocenteMapper.fromApiToDomain)))
    }
}