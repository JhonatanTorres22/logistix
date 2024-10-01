import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { Usuario, UsuarioCrear } from "../../domain/models/usuario.model";
import { UsuarioDTO, UsuarioDataDTO, UsuarioDatasDTO } from "../dto/usuario.dto";

import { UsuarioMapper } from "../../domain/mappers/usuarios.mapper";


@Injectable({
    providedIn: 'root',
})

export class UsuarioService {

    private urlApi: string;

    private urlObtenerUsuarios: string;
    private urlAgregarUsuario: string;
    private urlEditarUsuario: string;
    private urlEliminarUsuario: string;
    private urlBuscarPorNumeroDocumento: string;

    constructor( private http: HttpClient) {
        this.urlApi = environment.EndPoint;
        this.urlObtenerUsuarios = 'api/Usuario/ListarTodo';
        this.urlAgregarUsuario = 'api/Usuario/Insertar';
        this.urlEditarUsuario = 'api/Usuario/Actualizar';
        this.urlEliminarUsuario = 'api/Usuario/Eliminar';
        this.urlBuscarPorNumeroDocumento = 'api/Usuario/Listar/';

    }

    obtenerUsuarios = (): Observable<Usuario[]> => {
        return this.http.get<UsuarioDatasDTO>(this.urlApi + this.urlObtenerUsuarios)
            .pipe( map( ( apiUsuarios ) => apiUsuarios.data.map( UsuarioMapper.formApiToDomain )));
    }

    agregarUsuario = ( usuario: UsuarioCrear): Observable<Usuario> => {
        const apiUsuario = UsuarioMapper.formDomainToApiCrear( usuario );
        
        return this.http.post<UsuarioDTO>(this.urlApi + this.urlAgregarUsuario, apiUsuario)
            .pipe( map( UsuarioMapper.formApiToDomain ))
    }

    editarUsuario = ( usuario: Usuario ): Observable<void> => {
        const apiUsuarioEdit = UsuarioMapper.formDomainToApi( usuario );

        return this.http.put<void>(this.urlApi + this.urlEditarUsuario, apiUsuarioEdit)
       
    }

    eliminarUsuario = ( idUsuario: number) :Observable<void> => {
        return this.http.delete<void>( this.urlApi + this.urlEliminarUsuario );
    }

    buscarNumeroDocumento = ( numeroDocumento: number ): Observable<Usuario> => {
        return this.http.get<UsuarioDataDTO>(this.urlApi + this.urlBuscarPorNumeroDocumento + numeroDocumento )
            .pipe( map( ( apiUsuario ) => ( UsuarioMapper.formApiToDomain(apiUsuario.data))))
    }



}