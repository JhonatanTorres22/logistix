import { Injectable, signal } from "@angular/core";
import { Categoria } from "../models/categoria.model";
import { SubCategoria, SubCategoriaListar } from "../models/subCategoria.model";
import { UiSelect } from "src/app/core/components/ui-select/ui-select.interface";



@Injectable({
    providedIn: 'root'
})

export class SubCategoriaSignal {

    subCategoriasDefault: SubCategoriaListar[] = []
    subCategoriaDefault: SubCategoria = {
        id: 0,
        categoriaId: 0,
        nombre: ""
    }

    subCategoriaSelectedOptionsDefault: UiSelect[] = [];
    

    subCategorias = signal( this.subCategoriasDefault );
    newSubCategoria = signal( this.subCategoriaDefault );

    subCategoriaEdit = signal( this.subCategoriaDefault );

    renderizarSubCategorias = signal('init');
    showFormAddSubCategoria = signal( false );

    subCategoriaSelectedOptions = signal( this.subCategoriaSelectedOptionsDefault );


    // categoriaSelectedOptions = signal( this.categoriaSelectedOptionsDefault );

}