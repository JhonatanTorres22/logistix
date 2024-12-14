import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AgregarDisponibilidadDocente, AgregarDocente, EditarDocente, EliminarCursoDominioDocente, EliminarDisponibilidadDocente, EliminarDocente, InsertarCursoDominioDocente, ListarCursosDominioDocente, ListarDisponibilidadDocente, ListarDocenteNoAsignado, ListarDocentes } from "../../domain/models/apertura-docente.model";
import { CursosDominioDocenteAray, DisponibilidadDocenteArray, DocenteArrayDTO, DocenteNoAsignadoArray } from "../dto/apertura-docente.dto";
import { AperturaDocenteMapper } from "../../domain/mappers/apertura-doscente.mapper";

@Injectable({
    providedIn: 'root'
})

export class AperturaDocenteService {
    private urlApi: string;
    private urlListarDocente: string;
    private urlEditarDocente: string;
    private urlEliminarDocente: string;
    private urlAgregarDocente: string;
    private urlListarCursoDomioDocente: string;
    private urlAgregarCursoDomioDocente: string;
    private urlEliminarCursoDomioDocente: string;
    private urlAgregarDisponibilidadDocente: string;
    private urlEliminarDisponibilidadDocente: string;

    private urlListarDisponibilidadDocente: string;
    private urlListarDocenteNoAsignado : string;
    constructor(
        private http: HttpClient
    ){
        this.urlApi = environment.EndPoint,
        this.urlListarDocente = 'api/Docente/Listar?codigoSemestre=';
        this.urlEditarDocente = 'api/Docente/Actualizar';
        this.urlEliminarDocente = 'api/Docente/Eliminar';
        this.urlAgregarDocente = 'api/Docente/Insertar';
        this.urlListarCursoDomioDocente = 'api/CursoDominio/Listar?codigoDocente=';
        this.urlAgregarCursoDomioDocente = 'api/CursoDominio/Insertar';
        this.urlEliminarCursoDomioDocente = 'api/CursoDominio/Eliminar';

        this.urlListarDisponibilidadDocente = 'api/Disponibilidad/Listar?codigoDocente=';
        this.urlAgregarDisponibilidadDocente = 'api/Disponibilidad/Insertar';
        this.urlEliminarDisponibilidadDocente = 'api/Disponibilidad/Eliminar';

        this.urlListarDocenteNoAsignado = 'api/Docente/ListarNoAsignados?codigoRol=';
    }

    obtenerDocentes = (idSemestre: number):Observable<ListarDocentes[]> =>{
        return this.http.get<DocenteArrayDTO>(this.urlApi + this.urlListarDocente + idSemestre)
        .pipe(map(( api ) => api.data.map(AperturaDocenteMapper.fromApiToDomain)))
    }

    editarDocente = (editarDocente: EditarDocente): Observable<void> => {
        const editarDocenteAPI = AperturaDocenteMapper.formDomainToApiEditarDocente(editarDocente)
        return this.http.put<void>(this.urlApi + this.urlEditarDocente, editarDocenteAPI)
    }

    eliminarDocente = (eliminarDocente : EliminarDocente): Observable<void> => {
        const eliminarDocenteAPI = AperturaDocenteMapper.fromDomainToApiEliminarDocente(eliminarDocente)
        return this.http.delete<void>(this.urlApi + this.urlEliminarDocente, {body : eliminarDocenteAPI})
    }

    agregarDocente = (agregarDocente: AgregarDocente[]): Observable<void> => {
        const agregarDocenteAPI = agregarDocente.map(AperturaDocenteMapper.fromDomainToApiAgregarDocente)
        return this.http.post<void>(this.urlApi + this.urlAgregarDocente, agregarDocenteAPI)
    }

    obtenerCursosDominioDocente = (idDocente : number): Observable<ListarCursosDominioDocente[]> => {
        return this.http.get<CursosDominioDocenteAray>(this.urlApi + this.urlListarCursoDomioDocente + idDocente)
        .pipe(map((api) => api.data.map(AperturaDocenteMapper.fromApiToDomainCursoDominioDocente)))
    }

    agregarCursoDominioDocente = (agregar: InsertarCursoDominioDocente[]): Observable<void> => {
        const agregarCursoDominioAPI = agregar.map(AperturaDocenteMapper.fromDomainToApiInsertarCursoDominioDocente)
        return this.http.post<void>(this.urlApi + this.urlAgregarCursoDomioDocente, agregarCursoDominioAPI)
    }

    eliminarCursoDominioDocente = (eliminar: EliminarCursoDominioDocente[]): Observable<void> => {
        const eliminarCursoDominioAPI = eliminar.map(AperturaDocenteMapper.fromDomainToApiEliminarCursoDominioDocente)
        return this.http.delete<void>(this.urlApi + this.urlEliminarCursoDomioDocente, {body: eliminarCursoDominioAPI})
    }

    /* DISPONIBILIDAD DOCENTE */

    obtenerDisponibilidadDocente = (idDocente: number): Observable<ListarDisponibilidadDocente[]> =>{
        return this.http.get<DisponibilidadDocenteArray>(this.urlApi + this.urlListarDisponibilidadDocente+ idDocente)
        .pipe(map ((api) => api.data.map(AperturaDocenteMapper.fromApiToDomainDisponibilidadDocente)))
    }

    agregarDisponibilidadDocente = (agregar: AgregarDisponibilidadDocente[]): Observable<void> => {
        const agregarDispoinibilidadAPI = agregar.map(AperturaDocenteMapper.fromDomainToApiAgregarDisponibilidad)
        return this.http.post<void>(this.urlApi + this.urlAgregarDisponibilidadDocente, agregarDispoinibilidadAPI)
    }
    eliminarDisponibilidadDocente = (eliminar: EliminarDisponibilidadDocente[]): Observable<void> => {
        const eliminarDisponibiliadadAPI = eliminar.map(AperturaDocenteMapper.fromDomainToApiEliminarDisponibilidad)
        return this.http.delete<void>(this.urlApi + this.urlEliminarDisponibilidadDocente , {body: eliminarDisponibiliadadAPI} )
    }

    obtenerDocenteNoAsignado = (idRol: number, idSemestre: number): Observable<ListarDocenteNoAsignado[]> => {
        return this.http.get<DocenteNoAsignadoArray>(this.urlApi + this.urlListarDocenteNoAsignado + idRol + `&codigoSemestre=${idSemestre}`)
        .pipe(map ((api) => api.data.map(AperturaDocenteMapper.fromApiToDomainDocenteNoAsignado)))
    }
}