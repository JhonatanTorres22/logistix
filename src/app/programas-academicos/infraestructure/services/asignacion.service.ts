import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { Asignacion, AsignacionEliminar, AsignarNuevoPrograma } from "../../domain/models/asignacion.model";
import { AsginacionDataArrayDTO } from "../dto/asignacion.dto";
import { AsignacionMapper } from "../../domain/mappers/asignacion.mapper";


@Injectable({
    providedIn: 'root'
})

export class AsignacionService {

    urlApi: string;
    urlAsignacion: string;
    urlAsignarPrograma: string;
    urlEliminarPrograma: string;

    constructor(
        private http: HttpClient
    ) {
        this.urlApi = environment.EndPoint;
        this.urlAsignacion = 'api/Asignacion/Listar';
        this.urlAsignarPrograma = 'api/Asignacion/Insertar';
        this.urlEliminarPrograma = 'api/Asignacion/Eliminar'
    }

    obtener( idSemestre: number): Observable<Asignacion[]> {
        const idSemestreAPI = `?codigoSemestre=${idSemestre}`
        return this.http.get<AsginacionDataArrayDTO>(this.urlApi + this.urlAsignacion + idSemestreAPI )
            .pipe(map ( (api)=> api.data.map(AsignacionMapper.fromApiToDomain)))
    }

    insertar( newProgramas: AsignarNuevoPrograma ): Observable<void> {
        const newProgramasAPI = AsignacionMapper.fromDomainToApiAsignarNuevoPrograma( newProgramas );

        return this.http.post<void>( this.urlApi + this.urlAsignarPrograma, newProgramasAPI);
    }

    eliminar( eliminarPrograma: AsignacionEliminar ):Observable<void> {
        const eliminarProgramaAPI = AsignacionMapper.fromDomainToApiEliminarPrograma( eliminarPrograma );

        return this.http.delete<void>( this.urlApi + this.urlEliminarPrograma, { body: eliminarProgramaAPI });
    }

}