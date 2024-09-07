import { Injectable, signal } from "@angular/core";
import { Categoria, CategoriaListar } from "../models/categoria.model";



@Injectable({
    providedIn: 'root'
})

export class CategoriaSignal {

    categoriasDefault: CategoriaListar[] = []
    categoriaDefault: Categoria = {
        id: 0,
        nombre: "",
        abreviatura: ""
    }
    categorias = signal( this.categoriasDefault );
    newCategoria = signal( this.categoriaDefault );

    categoriaEdit = signal( this.categoriaDefault );

    renderizarCategorias = signal('init');
    showFormAdd = signal( false );
}