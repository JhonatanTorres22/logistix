import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { CursoDataArrayDTO } from "../dto/curso.dto";
import { CursoMapper } from "../../domain/mappers/curso.mapper";
import { Curso, CursoCrear, CursoEditar, CursoEliminar } from "../../domain/models/curso.model";


@Injectable({
    providedIn: 'root'
})


export class CursoService {

    private urlApi: string;
    private urlObtener: string;
    private urlAgregar: string;
    private urlEditar: string;
    private urlEliminar: string;

    constructor(
        private http: HttpClient
    ) {
        // this.urlApi = environment.EndPoint;
        this.urlApi = environment.EnpPointMSW;

        
        this.urlObtener = 'api/Curso/Listar';
        this.urlAgregar = 'api/Curso/Insertar';
        this.urlEditar = 'api/Curso/Actualizar';
        this.urlEliminar = 'api/Curso/Eliminar';

    }

    obtener(): Observable<Curso[]>{
        return this.http.get<CursoDataArrayDTO>( this.urlApi + this.urlObtener )
            .pipe( map( api => api.data.map( CursoMapper.fromApiToDomain )))
    }

    obtenerMSW(): Observable<CursoDataArrayDTO>{
        // return this.http.get<CursoDataArrayDTO>( this.urlApi + this.urlObtener )
        //     .pipe( map( api => api.data.map( CursoMapper.fromApiToDomain )))
        return this.http.get<CursoDataArrayDTO>( this.urlApi + this.urlObtener);
    }

    agregar( curso: CursoCrear ): Observable<void> {
        const cursoAPI = CursoMapper.fromDomainToApiAgregar( curso );
        return this.http.post<void>( this.urlApi + this.urlAgregar, cursoAPI );
    }

    editar( curso: CursoEditar ): Observable<void> {
        const cursoAPI = CursoMapper.fromDomainToApiEditar( curso );
        return this.http.put<void>( this.urlApi + this.urlEditar, cursoAPI);
    }

    eliminar( curso: CursoEliminar ): Observable<void> {
        const cursoAPI = CursoMapper.formDomainToApiEliminar( curso );
        return this.http.delete<void>( this.urlApi + this.urlEliminar, { body: cursoAPI } );
    }

}