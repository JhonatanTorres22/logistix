import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AperturaCursosMapper } from "../../domain/mappers/apertura-cursos.mapper";
import { AgregarCursoApertura, EliminarCursoAperturado, ListarCursosAperturados } from "../../domain/models/apertura-curso.model";
import { AperturaCursosArrayDTO } from "../dto/apertura-curso.dto";

@Injectable({
    providedIn: 'root'
})

export class AperturaCursoService{
    private urlApi: string;
    private urlCursoAperturaAgregar: string;
    private urlListarCursosAperturados: string;
    private urlEliminarCursosAperturados: string;


    constructor(
        private http: HttpClient 
     ) {
        this.urlApi = environment.EndPoint;
        this.urlCursoAperturaAgregar = 'api/AperturaCurso/Insertar';
        this.urlListarCursosAperturados = 'api/AperturaCurso/Listar?codigoLocal=';
        this.urlEliminarCursosAperturados = 'api/AperturaCurso/Eliminar'
     }

     obtenerCursosAperturados = (idLocal: number, idProgramaAcademico: number, idSemestre: number) : Observable<ListarCursosAperturados[]> => {
      return this.http.get<AperturaCursosArrayDTO>(this.urlApi + this.urlListarCursosAperturados+ idLocal + `&codigoProgramaAcademico=${idProgramaAcademico}&codigoSemestre=${idSemestre}`)
      .pipe(map ( (api) => api.data.map(AperturaCursosMapper.fromApiToDomain)))  
   }
     agregarCursoApertura = (aperturaCursoAgregar: AgregarCursoApertura[]) : Observable<void> => {
        const aperturaAPI = AperturaCursosMapper.fromDomainToApiAgregar(aperturaCursoAgregar)
        return this.http.post<void>(this.urlApi + this.urlCursoAperturaAgregar, aperturaAPI)
     }
     eliminarCursosAperturados = ( eliminarCurso: EliminarCursoAperturado[] ) : Observable<void> => {
      const eliminarCursoAperturado = eliminarCurso.map( AperturaCursosMapper.fromDomainToApiEliminarCursoApertura )
      return this.http.delete<void>(this.urlApi + this.urlEliminarCursosAperturados, { body: eliminarCursoAperturado })
     }
}