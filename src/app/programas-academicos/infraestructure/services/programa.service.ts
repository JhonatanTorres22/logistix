import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Programa, ProgramaCrear, ProgramaEditar, ProgramaEliminar, ProgramaFacultad } from "../../domain/models/programa.model";
import { ProgramaDataArrayDTO } from "../dto/programa.dto";
import { Observable, map } from "rxjs";
import { ProgramaMapper } from "../../domain/mappers/programa.mapper";


@Injectable({
    providedIn: 'root'
})


export class ProgramaService {
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

        this.urlObtener = 'api/ProgramaAcademico/Listar';
        this.urlAgregar = 'api/ProgramaAcademico/Insertar';
        this.urlEditar = 'api/ProgramaAcademico/Actualizar';
        this.urlEliminar = 'api/ProgramaAcademico/Eliminar';
  
    }


    obtener = ( idFacultad: number): Observable<ProgramaFacultad[]> => {
        const id = `/${idFacultad}`
        return this.http.get<ProgramaDataArrayDTO>(this.urlApi + this.urlObtener + id)
            .pipe(map( api => api.data.map( ProgramaMapper.fromApiToDomainProgramaFacultad ) ))
    }

    agregar = ( programa: ProgramaCrear ): Observable<void> => {
        const programaAPI = ProgramaMapper.fromDomainToApiCrear( programa );

        return this.http.post<void>( this.urlApi + this.urlAgregar, programaAPI);
    }

    editar = ( programa: ProgramaEditar ): Observable<void>  => {
        const programaAPI = ProgramaMapper.fromDomainToApiEditar( programa );

        return this.http.put<void>( this.urlApi + this.urlEditar, programaAPI );
    }

    eliminar = ( programa: ProgramaEliminar ): Observable<void> => {
        const programaAPI = ProgramaMapper.fromDomainToApiEliminar( programa );

        return this.http.delete<void>( this.urlApi + this.urlEliminar, { body: programaAPI})
    }
}