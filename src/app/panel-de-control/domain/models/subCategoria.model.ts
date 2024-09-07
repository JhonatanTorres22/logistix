export type SubCategoria = {
    id: number,
    categoriaId: number,
    nombre: string
}

export type SubCategoriaListar = SubCategoria;

export type SubCategoriaInsertar = Omit<SubCategoria, 'id'>

export type SubCategoriaEliminar = Pick<SubCategoria, 'id'>

