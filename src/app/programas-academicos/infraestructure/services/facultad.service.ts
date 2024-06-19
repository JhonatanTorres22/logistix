import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { Facultad, FacultadCrear, FacultadEliminar } from "../../domain/models/facultad.model";
import { FacultadDataArrayDTO } from "../dto/facultad.dto";
import { FacultadMapper } from "../../domain/mappers/facultad.mapper";


@Injectable({
    providedIn: 'root'
})

export class FacultadService {
 
    private urlApi: string;

    private urlObtenerFacultades: string;
    private urlAgregarFacultad: string;
    private urlEditarFacultad: string;
    private urlEliminarFacultad: string;
    // private urlAperturarFacultad: string;
    // private urlCerrarFacultad: string;
    constructor(
       private http: HttpClient 
    ) {
        this.urlApi = environment.EndPoint;

        this.urlObtenerFacultades = 'api/Facultad/Listar';
        this.urlAgregarFacultad = 'api/Facultad/Insertar';
        this.urlEditarFacultad = 'api/Facultad/Actualizar';
        this.urlEliminarFacultad = 'api/Facultad/Eliminar';
        // this.urlAperturarFacultad = 'api/Facultad/Aperturar';
        // this.urlCerrarFacultad = 'api/Facultad/Cerrar';
    }


    obtenerFacultades = (): Observable<Facultad[]> => {
        return this.http.get<FacultadDataArrayDTO>(this.urlApi + this.urlObtenerFacultades)
            .pipe(map( apiFacultad => apiFacultad.data.map( FacultadMapper.fromApiToDomain ) ))
    }

    agregarFacultad = ( facultadCrear: FacultadCrear ): Observable<void> => {
        const facultadCrearAPI = FacultadMapper.fromDomainToApiCrear( facultadCrear );
        console.log(facultadCrearAPI);

        return this.http.post<void>( this.urlApi + this.urlAgregarFacultad, facultadCrearAPI );
    }

    editarFacultad = ( facutladEditar: Facultad ): Observable<void> => {
        const facultadEditAPI = FacultadMapper.fromDomainToApi( facutladEditar )

        return this.http.put<void>( this.urlApi + this.urlEditarFacultad, facultadEditAPI );
    }

    eliminarFacultad = ( facultadEliminar: FacultadEliminar ): Observable<void> => {
        const facultadEliminarAPI = FacultadMapper.formDomainToApiEliminar( facultadEliminar );

        return this.http.delete<void>( this.urlApi + this.urlEliminarFacultad, { body: facultadEliminarAPI});
    }
    
}