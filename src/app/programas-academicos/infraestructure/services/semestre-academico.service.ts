import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { SemestreAcademico, SemestreAcademicoAperturar, SemestreAcademicoCerrar, SemestreAcademicoCrear, SemestreAcademicoEliminar } from "../../domain/models/semestre-academico.model";
import { SemestreAcademicoCrearDTO, SemestreAcademicoDataArrayDTO } from "../dto/semestre-academico.dto";
import { SemestreAcademicoMapper } from "../../domain/mappers/semestre-academico.mapper";


@Injectable({
    providedIn: 'root'
})

export class SemestreAcademicoService {

    private urlApi: string;

    private urlObtenerSemestres: string;
    private urlAgregarSemestre: string;
    private urlEditarSemestre: string;
    private urlEliminarSemestre: string;
    private urlAperturarSemestre: string;
    private urlCerrarSemestre: string;
    constructor(
       private http: HttpClient 
    ) {
        this.urlApi = environment.EndPoint;

        this.urlObtenerSemestres = 'api/Semestre/Listar';
        this.urlAgregarSemestre = 'api/Semestre/Insertar';
        this.urlEditarSemestre = 'api/Semestre/Actualizar';
        this.urlEliminarSemestre = 'api/Semestre/Eliminar';
        this.urlAperturarSemestre = 'api/Semestre/Aperturar';
        this.urlCerrarSemestre = 'api/Semestre/Cerrar';
    }


    obtenerSemestres = (): Observable<SemestreAcademico[]> => {
        return this.http.get<SemestreAcademicoDataArrayDTO>(this.urlApi + this.urlObtenerSemestres)
            .pipe(map( apiSemestre => apiSemestre.data.map( SemestreAcademicoMapper.formApiToDomain ) ))
    }

    agregarSemestre = ( newSemestre: SemestreAcademicoCrear): Observable<void> => {
        const semestre = SemestreAcademicoMapper.fromDomainToApiCrear( newSemestre )

        return this.http.post<void>(this.urlApi + this.urlAgregarSemestre, semestre)
  
    }

    editarSemestre = ( semestre: SemestreAcademico ): Observable<void> => {
        const semestreEdit = SemestreAcademicoMapper.formDomainToApi( semestre );
        return this.http.put<void>(this.urlApi + this.urlEditarSemestre, semestreEdit)

    }

    eliminarSemestre = ( semestreEliminar: SemestreAcademicoEliminar ): Observable<void> => {
        const semestreEliminarAPI = SemestreAcademicoMapper.fromDomainToApiEliminar( semestreEliminar );
        
        return this.http.delete<void>( this.urlApi + this.urlEliminarSemestre, { body: semestreEliminarAPI})
    }


    aperturarSemestre = ( semestreAperturar: SemestreAcademicoAperturar ): Observable<void> => {
        const semestreAperturarAPI = SemestreAcademicoMapper.fromDomainToApiAperturar( semestreAperturar );
        
        return this.http.put<void>( this.urlApi + this.urlAperturarSemestre, semestreAperturarAPI );
    }

    cerrarSemestre = ( semestreCerrar: SemestreAcademicoCerrar ): Observable<void> => {
        const semestreCerrarAPI = SemestreAcademicoMapper.fromDomainToApiCerrar( semestreCerrar );
        
        return this.http.put<void>( this.urlApi + this.urlCerrarSemestre, semestreCerrarAPI );
    }


}