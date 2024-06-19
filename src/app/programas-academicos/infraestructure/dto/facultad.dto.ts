export interface FacultadDTO {
    codigo: number,
    nombre: string,
    definicion: string,
    usuario: number
}

export type FacultadCrearDTO  = Omit<FacultadDTO, 'codigo'>

export interface FacultadAsignadDTO  extends FacultadDTO{
    idSemestre: number
}

export interface FacultadDataArrayDTO {
    data: FacultadDTO[]
}

export interface FacultadDataDTO {
    data: FacultadDTO
}

export type FacultadEliminarDTO = Pick< FacultadDTO, 'codigo' | 'usuario'>
