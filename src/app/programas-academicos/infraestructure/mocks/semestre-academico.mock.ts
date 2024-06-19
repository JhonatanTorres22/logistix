import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { SemestreAcademicoMapper } from "../../domain/mappers/semestre-academico.mapper";
import { SemestreAcademico, SemestreAcademicoCrear } from "../../domain/models/semestre-academico.model";
import { SemestreAcademicoDataArrayDTO, SemestreAcademicoDTO } from "../dto/semestre-academico.dto";


@Injectable({
    providedIn: 'root'
})

export class SemestreAcademicoMock {
    private urlApi: string;

    private urlObtenerSemestres: string;
    private urlAgregarSemestre: string;
    private urlEditarSemestre: string;
    private urlEliminarSemestre: string;
    

    constructor(
       private http: HttpClient 
    ) {
        this.urlApi = environment.EndPointSoap;

        this.urlObtenerSemestres = 'api/Semestre/Listar';
        this.urlAgregarSemestre = 'api/Semestre/Insertar';
        this.urlEditarSemestre = 'api/Semestre/Editar';
        this.urlEliminarSemestre = '';
    }

    /* API */

    obtenerSemestres(): Observable<SemestreAcademico[]> {
        return this.http.get<SemestreAcademicoDataArrayDTO>(this.urlApi + this.urlObtenerSemestres)
            .pipe(map( (apiSemestre) => apiSemestre.data.map( SemestreAcademicoMapper.formApiToDomain ) ))
    }

    agregarSemestre( newSemestre: SemestreAcademicoCrear): Observable<SemestreAcademico> {
        const semestre = SemestreAcademicoMapper.fromDomainToApiCrear( newSemestre )

        return this.http.post<SemestreAcademicoDTO>(this.urlApi + this.urlAgregarSemestre, semestre)
            .pipe( map ( SemestreAcademicoMapper.formApiToDomain));
    }

    editarSemestre( semestre: SemestreAcademico ): Observable<SemestreAcademico> {
        const semestreEdit = SemestreAcademicoMapper.fromDomainToApiCrear( semestre );
        return this.http.put<SemestreAcademicoDTO>(this.urlApi + this.urlEditarSemestre, semestreEdit)
            .pipe( map ( SemestreAcademicoMapper.formApiToDomain))
    }

    /* FIN API */
}