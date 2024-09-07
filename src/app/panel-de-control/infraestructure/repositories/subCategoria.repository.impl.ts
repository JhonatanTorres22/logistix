import { inject, Injectable } from "@angular/core";
import { SubCategoriaService } from "../services/subCategoria.service";
import { SubCategoriaRepository } from "../../domain/repositories/subCategoria.repository";
import { Observable } from "rxjs";
import { SubCategoriaListar, SubCategoriaInsertar, SubCategoriaEliminar } from "../../domain/models/subCategoria.model";

@Injectable({
    providedIn: 'root'
})

export class SubCategoriaRepositoryImpl implements SubCategoriaRepository {

    private readonly service = inject( SubCategoriaService )

    listar(categoriaId: number): Observable<SubCategoriaListar[]> {
        return this.service.listar( categoriaId );
    }
    insertar(subCategoria: SubCategoriaInsertar): Observable<void> {
        return this.service.insertar( subCategoria );
    }
    eliminar(subCategoria: SubCategoriaEliminar): Observable<void> {
        return this.service.eliminar( subCategoria );
    }




}