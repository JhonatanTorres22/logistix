// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { map, Observable } from "rxjs";
// import { environment } from "src/environments/environment";
// import { ObservacionCategoriaEliminar, ObservacionCategoriaInsertar, ObservacionCategoriaListar } from "../../domain/models/observacion.model";
// import { ObservacionCategoriaDataArrayDTO, ObservacionCategoriaListarDTO } from "../dto/observacion.dto";
// import { ObservacionMapper } from "../../domain/mappers/observacion.mapper";

// @Injectable({
//     providedIn: 'root'
// })

// export class ObservacionService {

//     private urlApi: string;
//     private urlListarCategoria: string;
//     private urlInsertarCategoria: string;
//     private urlEliminarCategoria: string;

//     constructor(
//         private http: HttpClient
//     ) {
//         this.urlApi = environment.EndPoint
//         this.urlListarCategoria = 'api/ObservacionCategoria/Listar';
//         this.urlInsertarCategoria = 'api/ObservacionCategoria/Insertar';
//         this.urlEliminarCategoria = 'api/ObservacionCategoria/Eliminar';
//     }

//     listarCategoria = (): Observable<ObservacionCategoriaListar[]> => {
//         return this.http.get<ObservacionCategoriaDataArrayDTO>( this.urlApi + this.urlListarCategoria )
//             .pipe( map( data => data.data.map ( ObservacionMapper.fromApiToDomainObservacionCategoria ) ) )
//     }

//     insertarCategoria = ( categoria: ObservacionCategoriaInsertar ): Observable<void> => {
//         const categoriaAPI = ObservacionMapper.fromDomainToApiObservacionCategoriaInsertar( categoria );
//         return this.http.post<void>( this.urlApi + this.urlInsertarCategoria, categoriaAPI );
//     }

//     eliminarCategoria = ( categoria: ObservacionCategoriaEliminar ): Observable<void> => {
//         const categoriaAPI = ObservacionMapper.fromDomainToApiObservacionCategoriaEliminar( categoria );
//         return this.http.delete<void>( this.urlApi + this.urlEliminarCategoria, { body: categoriaAPI } )
//     }
    

// }