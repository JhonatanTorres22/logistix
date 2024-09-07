export type CategoriaDTO = {
    codigo: number,
    denominacion: string,
    abreviatura: string
}

export interface CategoriaDataArrayDTO {
    data: CategoriaDTO[]
}

export type CategoriaListarDTO = CategoriaDTO;

export type CategoriaEliminarDTO = Pick<CategoriaDTO, 'codigo'>

export type CategoriaInsertarDTO = Omit<CategoriaDTO, 'codigo'>