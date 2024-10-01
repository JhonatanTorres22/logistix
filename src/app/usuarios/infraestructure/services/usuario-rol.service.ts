import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { UsuarioRol, UsuarioRolAgregar, UsuarioRolAlta, UsuarioRolEliminar, UsuarioRolSuspender } from "../../domain/models/usuario-rol.model";
import { UsuarioRolDataArrayDTO } from "../dto/usuario-rol.dto";
import { UsuarioRolMapper } from "../../domain/mappers/usuario-rol.mapper";


@Injectable({
    providedIn: 'root'
})

export class UsuarioRolService {

    private urlApi: string;

    private urlObtenerUsuariosRol: string;
    private urlAgregarUsuarioRol: string;
    private urlSuspenderUsuarioRol: string;
    private urlActivarUsuarioRol: string;
    private urlEliminarUsuarioRol: string;
    private urlDarAltaUsuarioRol: string;



    constructor( private http: HttpClient) {
        this.urlApi = environment.EndPoint;
        this.urlObtenerUsuariosRol = 'api/Usuario/ListarConRoles';
        this.urlAgregarUsuarioRol = 'api/Usuario/InsertarRol';
        this.urlSuspenderUsuarioRol = 'api/Usuario/SuspenderRol';
        this.urlActivarUsuarioRol = 'api/Usuario/ActivarRol';
        this.urlEliminarUsuarioRol = 'api/Usuario/EliminarRol';
        this.urlDarAltaUsuarioRol = 'api/Usuario/DarAlta';
  
    }

    obtenerUsuariosRol = (): Observable<UsuarioRol[]> => {
        return this.http.get<UsuarioRolDataArrayDTO>(this.urlApi + this.urlObtenerUsuariosRol)
            .pipe(map ( (apiUsuarioRol) => apiUsuarioRol.data.map( UsuarioRolMapper.fromApiToDomain ) ))
    }

    asignarRolToUser = ( asignarRolUsuario: UsuarioRolAgregar ): Observable<void> => {
        const asignarRolUsuarioAPI = UsuarioRolMapper.fromDomainToApiAgregarRolUser( asignarRolUsuario ); 
        return this.http.post<void>(this.urlApi + this.urlAgregarUsuarioRol, asignarRolUsuarioAPI );
    }

    suspenderRolUser = ( suspenderRolUsuario: UsuarioRolSuspender ): Observable<void> => {
        const suspenderUsuarioAPI = UsuarioRolMapper.fromDomainToApiSuspenderRolUser( suspenderRolUsuario );

        return this.http.put<void>(this.urlApi + this.urlSuspenderUsuarioRol, suspenderUsuarioAPI );
    }

    activarRolUser = ( activarRolUsuario: UsuarioRolSuspender ): Observable<void> => {
        const activarUsuarioAPI = UsuarioRolMapper.fromDomainToApiSuspenderRolUser( activarRolUsuario );

        return this.http.put<void>(this.urlApi + this.urlActivarUsuarioRol, activarUsuarioAPI );
    }

    eliminarRolUser = ( eliminarRolUsuario: UsuarioRolEliminar ): Observable<void> => {
        const eliminarRolUsuarioAPI = UsuarioRolMapper.fromDomainToApiEliminarRol( eliminarRolUsuario );

        return this.http.delete<void>( this.urlApi + this.urlEliminarUsuarioRol, { body: eliminarRolUsuarioAPI} );
    }

    darAltaRolUser = ( darAltaRolUsuario: UsuarioRolAlta ): Observable<void> => {
        const darAltaRolUsuarioAPI = UsuarioRolMapper.fromDomainToApiDarAltaRol( darAltaRolUsuario );

        return this.http.put<void>( this.urlApi + this.urlDarAltaUsuarioRol, darAltaRolUsuarioAPI );
    }

}