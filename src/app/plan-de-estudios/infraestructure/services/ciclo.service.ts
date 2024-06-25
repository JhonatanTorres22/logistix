import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { CicloDataArrayDTO } from "../dto/ciclo.dto";
import { Ciclo, CicloCrear, CicloEliminar } from "../../domain/models/ciclo.model";
import { CicloMapper } from "../../domain/mappers/ciclo.mapper";


@Injectable({
    providedIn: 'root'
})

export class CicloService {

    urlApi: string;
    urlObtener: string;
    urlAgregar: string;
    urlEditar: string;
    urlEliminar: string;

    constructor(
        private http: HttpClient
    ) {
        this.urlApi = environment.EndPoint
        
        this.urlObtener = 'api/Ciclo/Listar';
        this.urlAgregar = 'api/Ciclo/Insertar';
        this.urlEditar = 'api/Ciclo/Actualizar';
        this.urlEliminar = 'api/Ciclo/Eliminar';

    }

    obtener(): Observable<Ciclo[]> {
        return this.http.get<CicloDataArrayDTO>( this.urlApi + this.urlObtener)
            .pipe( map( api => api.data.map( CicloMapper.fromApiToDomain )));
    }

    agregar( ciclo: CicloCrear ): Observable<void> {
        const newCicloAPI = CicloMapper.fromDomainToApiCrear( ciclo );   
        return this.http.post<void>( this.urlApi + this.urlAgregar, newCicloAPI );
    }

    editar( ciclo: Ciclo ): Observable<void> {
        const editCicloAPI = CicloMapper.fromDomainToApiEditar( ciclo );
        console.log(editCicloAPI);
        
        return this.http.put<void>( this.urlApi + this.urlEditar, editCicloAPI );
    }

    eliminar( ciclo: CicloEliminar): Observable<void> {
        const eliminarCicloAPI = CicloMapper.fromDomainToApiEliminar( ciclo );

        return this.http.delete<void>( this.urlApi + this.urlEliminar, { body: eliminarCicloAPI });
    }

}