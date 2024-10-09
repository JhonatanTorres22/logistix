import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { CursoDataArrayDTO, CursoDesfasadoDataArrayDTO, CursoEncontradoEnPlanDataArrayDTO } from "../dto/curso.dto";
import { CursoMapper } from "../../domain/mappers/curso.mapper";
import { Curso, CursoAddPreRequisito, CursoBuscarPlan, CursoCrear, CursoDeletePreRequisito, CursoDesfasado, CursoDesfasar, CursoEditar, CursoEliminar, CursoEncontradoEnPlan, CursoRenovar, CursoRevertirRenovacion } from "../../domain/models/curso.model";


@Injectable({
    providedIn: 'root'
})


export class CursoService {

    private urlApi: string;
    private urlObtener: string;
    private urlAgregar: string;
    private urlAgregarMasive: string;
    private urlEditar: string;
    private urlEliminar: string;
    private urlEliminarMasivo: string;
    private urlAddPreRequisito: string;
    private urlDeletePreRequisito: string;
    private urlBuscarCursoPlanEstudio: string;
    private urlRenovar: string;
    private urlDesfasar: string;
    private urlObtenerCursosDesfasados: string;
    private urlRevertirDesfase: string;
    private urlRevertirRenovacion: string;


    constructor(
        private http: HttpClient
    ) {
        // this.urlApi = environment.EndPoint;
        this.urlApi = environment.EndPoint;
        
        this.urlObtener = 'api/Curso/ListarxPA?codigoProgramaAcademico=';
        this.urlAgregar = 'api/Curso/Insertar';
        this.urlAgregarMasive = 'api/Curso/InsertarMasivo';
        this.urlEditar = 'api/Curso/Actualizar';
        this.urlEliminar = 'api/Curso/Eliminar';
        this.urlEliminarMasivo = 'api/Curso/EliminarMasivo';
        this.urlAddPreRequisito = 'api/Curso/InsertarPreRequisito';
        this.urlDeletePreRequisito = 'api/Curso/EliminarPreRequisito';
        this.urlBuscarCursoPlanEstudio = 'api/Curso/BuscarEnPlanDeEstudio?codigoCurso=';
        this.urlRenovar = 'api/Curso/Renovar';
        this.urlDesfasar = 'api/Curso/Desfasar';
        this.urlObtenerCursosDesfasados = 'api/Curso/ListarDesfasados?codigoProgramaAcademico=';
        this.urlRevertirDesfase = 'api/Curso/RevertirDesfase';
        this.urlRevertirRenovacion = 'api/Curso/Revertir';

    }

    obtenerPorPrograma( idPrograma: number ): Observable<Curso[]>{
        return this.http.get<CursoDataArrayDTO>( this.urlApi + this.urlObtener + idPrograma)
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

    agregarMasive( cursos: CursoCrear[] ): Observable<void> {
        const cursosAPI = cursos.map( CursoMapper.fromDomainToApiAgregar );
        console.log( cursosAPI );
        
        return this.http.post<void>( this.urlApi + this.urlAgregarMasive, cursosAPI );
    }

    renovar( curso: CursoRenovar ): Observable<void> {
        const cursoAPI = CursoMapper.fromDomainToApiRenovar( curso );
        return this.http.post<void>( this.urlApi + this.urlRenovar, cursoAPI );
    }

    desfasar( curso: CursoDesfasar ): Observable<void> {
        const cursoAPI = CursoMapper.fromDomainToApiDesfasar( curso );
        return this.http.put<void>( this.urlApi + this.urlDesfasar, cursoAPI );
    }

    revertirDesfase( curso: CursoDesfasar ): Observable<void> {
        const cursoAPI = CursoMapper.fromDomainToApiDesfasar( curso );
        return this.http.put<void>( this.urlApi + this.urlRevertirDesfase, cursoAPI );
    }

    revertirRenovacion( curso: CursoRevertirRenovacion ): Observable<void> {
        const cursoAPI = CursoMapper.fromDomainToApiDesfasar( curso );
        return this.http.put<void>( this.urlApi + this.urlRevertirRenovacion, cursoAPI );
    }

    editar( curso: CursoEditar ): Observable<void> {
        const cursoAPI = CursoMapper.fromDomainToApiEditar( curso );
        return this.http.put<void>( this.urlApi + this.urlEditar, cursoAPI);
    }

    eliminar( curso: CursoEliminar ): Observable<void> {
        const cursoAPI = CursoMapper.formDomainToApiEliminar( curso );
        return this.http.delete<void>( this.urlApi + this.urlEliminar, { body: cursoAPI } );
    }

    eliminarMasivo( cursos: CursoEliminar[] ): Observable<void> {
        const cursosAPI = cursos.map( CursoMapper.formDomainToApiEliminar );
        return this.http.delete<void>( this.urlApi + this.urlEliminarMasivo, { body: cursosAPI } );
    }

    addPreRequisito( preRequisito: CursoAddPreRequisito ): Observable<void> {
        const preRequisitoAPI = CursoMapper.fromDomainToApiAddPreRequisito( preRequisito );
        return this.http.post<void>( this.urlApi + this.urlAddPreRequisito, preRequisitoAPI );
    }

    deletePreRequisito( preRequisito: CursoDeletePreRequisito ): Observable<void> {
        const preRequisitoAPI = CursoMapper.fromDomainToApiDeletePreRequisito( preRequisito );
        console.log( preRequisitoAPI );
        
        return this.http.delete<void>( this.urlApi + this.urlDeletePreRequisito, { body: preRequisitoAPI} );
    }

    buscarCursoPlanEstudios = ( idCurso: number): Observable<CursoEncontradoEnPlan[]> => {
        // const cursoAPI = CursoMapper.fromDomainToApiBuscarCursoPlanEstudio( curso );
        // console.log( cursoAPI );
        
        return this.http.get<CursoEncontradoEnPlanDataArrayDTO>( this.urlApi + this.urlBuscarCursoPlanEstudio + idCurso )
            .pipe( map ( responseAPI => responseAPI.data.map( CursoMapper.fromApiToDomainCursoEncontradoEnPlan ) ))
    }

    obtenerCursosDesfasados( idPrograma: number ): Observable<CursoDesfasado[]> {
        return this.http.get<CursoDesfasadoDataArrayDTO>( this.urlApi + this.urlObtenerCursosDesfasados + idPrograma )
            .pipe( map( api => api.data.map( CursoMapper.fromApiToDomainDesfasados )))
    }

}