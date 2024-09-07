export type SubCategoriaDTO = {
    codigo: number,
    codigoObservacionCategoria: number,
    denominacion: string
}

export interface SubCategoriaDataArrayDTO {
    data: SubCategoriaDTO[]
}

export type SubCategoriaListarDTO = SubCategoriaDTO;

export type SubCategoriaEliminarDTO = Pick<SubCategoriaDTO, 'codigo'>

export type SubCategoriaInsertarDTO = Omit<SubCategoriaDTO, 'codigo'>