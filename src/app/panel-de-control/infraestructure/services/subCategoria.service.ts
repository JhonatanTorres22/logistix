import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SubCategoriaEliminar, SubCategoriaInsertar, SubCategoriaListar } from "../../domain/models/subCategoria.model";
import { SubCategoriaDataArrayDTO } from "../dto/subCategoria.dto";
import { SubCategoriaMapper } from "../../domain/mappers/subCategoria.mapper";


@Injectable({
    providedIn: 'root'
})

export class SubCategoriaService {

    private urlApi: string;

    private urlListar: string;
    private urlInsertar: string;
    private urlEliminar: string;

    constructor(
        private http: HttpClient,

    ) {
        this.urlApi = environment.EndPoint;
        this.urlListar = 'api/ObservacionSubCategoria/Listar?CodigoObservacionCategoria=';
        this.urlInsertar = 'api/ObservacionSubCategoria/Insertar';
        this.urlEliminar = 'api/ObservacionSubCategoria/Eliminar';
    }

    listar( categoriaId: number ): Observable<SubCategoriaListar[]> {
        return this.http.get<SubCategoriaDataArrayDTO>( this.urlApi + this.urlListar + categoriaId )
            .pipe( map( responseApi => responseApi.data.map( SubCategoriaMapper.fromApiToDomainListar ) ))
    }

    insertar( newSubCategoria: SubCategoriaInsertar ): Observable<void> {
        
        const newSubCategoriaAPI = SubCategoriaMapper.fromDomainToApiInsertar( newSubCategoria );

        return this.http.post<void>( this.urlApi + this.urlInsertar, newSubCategoriaAPI );

    }

    eliminar( subCategoria: SubCategoriaEliminar ): Observable<void> {
        const subCategoriaAPI = SubCategoriaMapper.fromDomainToEliminar( subCategoria );
        return this.http.delete<void>( this.urlApi + this.urlEliminar, { body: subCategoriaAPI  } )
    }
}