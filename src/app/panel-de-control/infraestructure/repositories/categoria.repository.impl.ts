import { inject, Inject, Injectable } from "@angular/core";
import { CategoriaService } from "../services/categoria.service";
import { CategoriaRepository } from "../../domain/repositories/categoria.repository";
import { Observable } from "rxjs";
import { CategoriaListar, CategoriaInsertar, CategoriaEliminar } from "../../domain/models/categoria.model";


@Injectable({
    providedIn: 'root'
})


export class CategoriaRepositoryImpl implements CategoriaRepository {

private readonly service = inject(CategoriaService)
    
    listarCategoria(): Observable<CategoriaListar[]> {
        return this.service.listarCategoria();
    }

    insertarCategoria( categoria: CategoriaInsertar ): Observable<void> {
        return this.service.insertarCategoria( categoria );
    }

    eliminarCategoria( categoria: CategoriaEliminar ): Observable<void> {
        return this.service.eliminarCategoria( categoria );
    }

}