import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { Asignacion } from "../../domain/models/asignacion.model";
import { AsginacionDataArrayDTO } from "../dto/asignacion.dto";
import { AsignacionMapper } from "../../domain/mappers/asignacion.mapper";


@Injectable({
    providedIn: 'root'
})

export class AsignacionService {

    urlApi: string;
    urlAsignacion: string;

    constructor(
        private http: HttpClient
    ) {
        this.urlApi = environment.EndPoint;
        this.urlAsignacion = 'api/Asignacion/Listar';
    }

    obtener( idSemestre: number): Observable<Asignacion[]> {
        const idSemestreAPI = `?codigoSemestre=${idSemestre}`
        return this.http.get<AsginacionDataArrayDTO>(this.urlApi + this.urlAsignacion + idSemestreAPI )
            .pipe(map ( (api)=> api.data.map(AsignacionMapper.fromApiToDomain)))
    }

}