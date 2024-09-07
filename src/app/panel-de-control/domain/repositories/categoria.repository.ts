import { Observable } from "rxjs";
import { CategoriaListar, CategoriaInsertar, CategoriaEliminar } from "../models/categoria.model";



export abstract class CategoriaRepository {
    abstract listarCategoria(): Observable<CategoriaListar[]>
    abstract insertarCategoria( categoria: CategoriaInsertar ): Observable<void>
    abstract eliminarCategoria( categoria: CategoriaEliminar ): Observable<void>
}