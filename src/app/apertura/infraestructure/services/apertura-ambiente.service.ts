import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { EditarAmbiente, EliminarAmbiente, InsertarAmbiente, ListarAmbientes } from "../../domain/models/apertura-ambiente.model";
import { AmbienteArrayDTO } from "../dto/apertura-ambiente.dto";
import { AperturaAmbienteMapper } from "../../domain/mappers/apertura-ambiente.mapper";

@Injectable({
    providedIn: 'root'
})

export class AperturaAmbienteService {
    private urlApi: string;
    private urlListarAmbiente: string;
    private urlListarAmbientexSemestre: string;
    private urlInsertarAmbiente: string;
    private urlEliminarAmbiente: string;
    private urlEditarAmbiente: string;

    constructor(
        private http: HttpClient
    ){
        this.urlApi = environment.EndPoint;
        this.urlListarAmbientexSemestre = 'api/Ambiente/ListarxSemestre?codigoSemestre='
        this.urlListarAmbiente = 'api/Ambiente/Listar?codigoLocal=';
        this.urlInsertarAmbiente = 'api/Ambiente/Insertar'
        this.urlEliminarAmbiente = 'api/Ambiente/Eliminar';
        this.urlEditarAmbiente = 'api/Ambiente/Actualizar'
    }

    obtenerAmbientesxSemestre = (idSemestre: number, idLocal: number) : Observable<ListarAmbientes[]> => {
        return this.http.get<AmbienteArrayDTO>(this.urlApi + this.urlListarAmbientexSemestre + idSemestre + `&codigoLocal=${idLocal}`)
        .pipe(map ( ( api) => api.data.map(AperturaAmbienteMapper.fromApiToDomain)))

    }

    eliminarAmbiente = (eliminarAmbiente: EliminarAmbiente[]): Observable<void> => {
        const eliminarAmbienteAPI = eliminarAmbiente.map(AperturaAmbienteMapper.fromDomainToApiEliminarAmbiente)
        return this.http.delete<void>(this.urlApi + this.urlEliminarAmbiente, {body : eliminarAmbienteAPI})
    }

    obtenerAmbientes = (idLocal: number): Observable<ListarAmbientes[]> => {
        return this.http.get<AmbienteArrayDTO>(this.urlApi + this.urlListarAmbiente + idLocal)
        .pipe(map ( ( api) => api.data.map(AperturaAmbienteMapper.fromApiToDomain)))
    }

    insertarAmbiente = (insertarAmbiente:InsertarAmbiente[]): Observable<void> => {
        const agregarAmbienteAPI = insertarAmbiente.map(AperturaAmbienteMapper.fromDomainToApiInsertarAmbiente)
        return this.http.post<void>(this.urlApi + this.urlInsertarAmbiente, agregarAmbienteAPI)
    }

    editarAmbiente = (editarAmbiente : EditarAmbiente) : Observable<void>  => {
        const editarAmbienteAPI = AperturaAmbienteMapper.fromDomainToApiEditarAmbiente(editarAmbiente)
        return this.http.put<void>(this.urlApi + this.urlEditarAmbiente, editarAmbienteAPI)
    }
}