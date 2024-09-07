import { Observable } from "rxjs";
import { SubCategoriaEliminar, SubCategoriaInsertar, SubCategoriaListar } from "../models/subCategoria.model";


export abstract class SubCategoriaRepository {

    abstract listar( categoriaId: number ): Observable<SubCategoriaListar[]>
    abstract insertar( subCategoria: SubCategoriaInsertar ): Observable<void>
    abstract eliminar( subCategoria: SubCategoriaEliminar ): Observable<void>
    
}