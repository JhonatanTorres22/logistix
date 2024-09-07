export type ObservacionCategoria = {
    id: number,
    nombre: string,
    abreviatura: string,
}

export type ObservacionCategoriaListar = ObservacionCategoria;

export type ObservacionCategoriaEliminar = Pick<ObservacionCategoria, 'id'>

export type ObservacionCategoriaInsertar = Omit<ObservacionCategoria, 'id'>