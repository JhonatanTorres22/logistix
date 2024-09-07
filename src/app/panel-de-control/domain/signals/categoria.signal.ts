import { Injectable, signal } from "@angular/core";
import { Categoria, CategoriaListar } from "../models/categoria.model";
import { UiSelect } from "src/app/core/components/ui-select/ui-select.interface";



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

    // categoriaSelectedOptionsDefault: UiSelect = {
    //     value: "",
    //     text: "",
    //     disabled: false
    // }

    categoriaSelectedOptionsDefault: UiSelect[] = [];
    categorias = signal( this.categoriasDefault );
    newCategoria = signal( this.categoriaDefault );

    categoriaEdit = signal( this.categoriaDefault );
    categoriaSelected = signal( this.categoriaDefault );
    categoriaSelectedOptions = signal( this.categoriaSelectedOptionsDefault );

    renderizarCategorias = signal('init');
    showFormAdd = signal( false );
}