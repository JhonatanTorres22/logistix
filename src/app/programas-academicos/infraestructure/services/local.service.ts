import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { Local, LocalCrear, LocalEliminar } from "../../domain/models/local.model";
import { LocalDataArrayDTO } from "../dto/local.dto";
import { LocalMapper } from "../../domain/mappers/local.mapper";


@Injectable({
    providedIn: 'root'
})


export class LocalService {

    private urlApi: string;

    private urlObtener: string;
    private urlAgregar: string;
    private urlEditar: string;
    private urlEliminar: string;
    // private urlAperturarFacultad: string;
    // private urlCerrarFacultad: string;
    constructor(
       private http: HttpClient 
    ) {
        this.urlApi = environment.EndPoint;

        this.urlObtener = 'api/Local/Listar';
        this.urlAgregar = 'api/Local/Insertar';
        this.urlEditar = 'api/Local/Actualizar';
        this.urlEliminar = 'api/Local/Eliminar';
  
    }


    obtener = (): Observable<Local[]> => {
        return this.http.get<LocalDataArrayDTO>(this.urlApi + this.urlObtener)
            .pipe(map( api => api.data.map( LocalMapper.fromApiToDomain ) ))
    }

    agregar = ( local: LocalCrear ): Observable<void> => {
        const localAPI = LocalMapper.fromDomainToApiCrear( local );

        return this.http.post<void>( this.urlApi + this.urlAgregar, localAPI);
    }

    editar = ( local: Local ): Observable<void> => {
        const localAPI = LocalMapper.fromDomainToApi( local );

        return this.http.put<void>( this.urlApi + this.urlEditar, localAPI );
    }

    eliminar = ( local: LocalEliminar ): Observable<void> => {
        const localAPI = LocalMapper.fromDomainToApiEliminar( local );

        return this.http.delete<void>( this.urlApi + this.urlEliminar, { body: localAPI})
    }

}