import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CategoriaMapper } from "../../domain/mappers/categoria.mapper";
import { CategoriaListar, CategoriaInsertar, CategoriaEliminar } from "../../domain/models/categoria.model";
import { CategoriaDataArrayDTO } from "../dto/categoria.dto";


@Injectable({
    providedIn: 'root'
})

export class CategoriaService {

    private urlApi: string;
    private urlListarCategoria: string;
    private urlInsertarCategoria: string;
    private urlEliminarCategoria: string;

    constructor(
        private http: HttpClient
    ) {
        this.urlApi = environment.EndPoint
        this.urlListarCategoria = 'api/ObservacionCategoria/Listar';
        this.urlInsertarCategoria = 'api/ObservacionCategoria/Insertar';
        this.urlEliminarCategoria = 'api/ObservacionCategoria/Eliminar';
    }

    listarCategoria = (): Observable<CategoriaListar[]> => {
        return this.http.get<CategoriaDataArrayDTO>( this.urlApi + this.urlListarCategoria )
            .pipe( map( data => data.data.map ( CategoriaMapper.fromApiToDomainCategoria ) ) )
    }

    insertarCategoria = ( categoria: CategoriaInsertar ): Observable<void> => {
        const categoriaAPI = CategoriaMapper.fromDomainToApiCategoriaInsertar( categoria );
        return this.http.post<void>( this.urlApi + this.urlInsertarCategoria, categoriaAPI );
    }

    eliminarCategoria = ( categoria: CategoriaEliminar ): Observable<void> => {
        const categoriaAPI = CategoriaMapper.fromDomainToApiCategoriaEliminar( categoria );
        return this.http.delete<void>( this.urlApi + this.urlEliminarCategoria, { body: categoriaAPI } )
    }
    

}