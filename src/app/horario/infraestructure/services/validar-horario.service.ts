import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ValidarHorario } from "../../domain/models/validar-horario.model";
import { ValidacionHorarioArrayDTO } from "../dto/validar-horario.dto";
import { ValidarHorarioMapper } from "../../domain/mappers/validar-horario.mapper";

@Injectable({
    providedIn: 'root'
})

export class ValidarHorarioService {
    private urlApi: string;
    private urlValidarHorario: string

    constructor(
        private http: HttpClient
    ){
        this.urlApi = environment.EndPoint;
        this.urlValidarHorario = 'api/Horario/Validar?codigoSemestre='
    }

    obtenerValidarHorario = (idSemestre: number, idLocal: number): Observable<ValidarHorario[]> =>{
        return this.http.get<ValidacionHorarioArrayDTO>(this.urlApi + this.urlValidarHorario + idSemestre + `&codigoLocal=${idLocal}` )
        .pipe(map((api) => api.data.map(ValidarHorarioMapper.fromApiToDomain)))
    }
}
