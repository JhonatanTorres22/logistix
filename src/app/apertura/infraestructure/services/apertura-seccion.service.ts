import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { AgregarSeccion, AgregarTipoAmbienteASeccion, EditarSeccion, EliminarSeccion, EliminarTipoAmbiente, ListarFormato, ListarSecciones, ListarTipoAmbiente } from "../../domain/models/apertura-seccion.model";
import { AperturaSeccionArrayDTO, ListarFormatoArrayDTO, ListarTipoAmbienteArrayDTO } from "../dto/apertura-seccion.dto";
import { AperturaSeccionMapper } from "../../domain/mappers/apertura-seccion.mapper";

@Injectable({
    providedIn: 'root'
})

export class AperturaSeccionService {
    private urlApi: string;
    private urlListarSecciones: string;
    private urlAgregarSeccion: string;
    private urlListarFormato: string;
    private urlListarTipoAmbiente: string;
    private urlEditarSeccion: string;
    private urlEliminarSeccion: string;
    private urlEliminarTipoAmbiente: string;
    private urlAgregarTipoAmbiente: string

    constructor(
        private http: HttpClient
    ){
        this.urlApi = environment.EndPoint;
        this.urlListarSecciones = 'api/AperturaSeccion/Listar?codigoAperturaCurso=';
        this.urlAgregarSeccion = 'api/AperturaSeccion/Insertar';
        this.urlListarFormato = 'api/Formato/Listar';
        this.urlListarTipoAmbiente = 'api/TipoAmbiente/Listar?codigoFormato=';
        this.urlEditarSeccion = 'api/AperturaSeccion/Actualizar';
        this.urlEliminarSeccion = 'api/AperturaSeccion/Eliminar';
        this.urlEliminarTipoAmbiente = 'api/AperturaSeccion/EliminarTipoAmbiente';
        this.urlAgregarTipoAmbiente = 'api/AperturaSeccion/InsertarTipoAmbiente';
        // this.urlEliminarTipoAmbiente = 

    }

    obtenerSeccionesAperturadas = (idAperturaCurso: number): Observable<ListarSecciones[]> => {
        return this.http.get<AperturaSeccionArrayDTO>(this.urlApi + this.urlListarSecciones + idAperturaCurso )
        .pipe(map( (api) => api.data.map(AperturaSeccionMapper.fromApiToDomain)))
    }

    insertarSeccion = (seccion: AgregarSeccion): Observable<void> => {
        const seccionAPI = AperturaSeccionMapper.fromDomainToApiAgregarSeccion(seccion);
        return this.http.post<void>(this.urlApi + this.urlAgregarSeccion, seccionAPI  )
    }

    agregarTipoAmbienteASeccion = (tipoAmbiente: AgregarTipoAmbienteASeccion[]): Observable<void> => {
        const agregarTipoAmbienteAPI = tipoAmbiente.map( AperturaSeccionMapper.fromDomainToApiAgregarTipoAmbiente );
        return this.http.post<void>(this.urlApi + this.urlAgregarTipoAmbiente, agregarTipoAmbienteAPI)
    }

    obtenerFormato = (): Observable<ListarFormato[]> => {
        return this.http.get<ListarFormatoArrayDTO>(this.urlApi + this.urlListarFormato)
        .pipe(map(api => api.data.map(AperturaSeccionMapper.fromApiToDomainFormato)))
    }

    obtenerTipoAmbiente = (idFormato: number) : Observable <ListarTipoAmbiente[]> => {
        return this.http.get<ListarTipoAmbienteArrayDTO>(this.urlApi + this.urlListarTipoAmbiente + idFormato)
        .pipe(map((api) => api.data.map(AperturaSeccionMapper.fromApiToDomainTipoAmbiente)))
    }

    editarSeccion = (editar: EditarSeccion): Observable<void> => {
        const editSeccionAPI = AperturaSeccionMapper.fromDomainToApiEditarSeccion(editar)
        return this.http.put<void>(this.urlApi + this.urlEditarSeccion, editSeccionAPI)
    }
    eliminarSeccion = ( eliminar: EliminarSeccion ): Observable<void> => {
        const eliminarSeccionAPI = AperturaSeccionMapper.formDomainToApiEliminarSeccion(eliminar)
        return this.http.delete<void>(this.urlApi + this.urlEliminarSeccion,  { body: eliminarSeccionAPI })
    }

    eliminarTipoAmbiente = (eliminarTipoAmbiente: EliminarTipoAmbiente) : Observable<void> => {
        const eliminarTipoAmbienteapi = AperturaSeccionMapper.formDomainToApiEliminarTipoAmbiente(eliminarTipoAmbiente)
        return this.http.delete<void>( this.urlApi + this.urlEliminarTipoAmbiente, {body : eliminarTipoAmbienteapi} )
    }
}