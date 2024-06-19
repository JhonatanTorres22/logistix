export interface ProgramaDTO {
    codigo: number,
    codigoFacultad: number,
    nombre: string,
    definicion: string,
    usuario: number
}


export type ProgramaCrearDTO  = Omit<ProgramaDTO, 'codigo'>

export interface ProgramaDataArrayDTO {
    data: ProgramaFacultadDTO[]
}

export interface ProgramaDataDTO {
    data: ProgramaFacultadDTO
}

export type ProgramaEliminarDTO = Pick< ProgramaDTO, 'codigo' | 'usuario'>


export type ProgramaFacultadDTO = Omit< ProgramaDTO, 'codigoFacultad'>

export type ProgramaEditarDTO = Omit<ProgramaDTO, 'codigoFacultad'>
