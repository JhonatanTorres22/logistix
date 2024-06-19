export interface LocalDTO {
    codigo: number,
    nombre: string,
    definicion: string,
    latitud: number,
    longitud: number,
    usuario: number
}


export type LocalCrearDTO = Omit<LocalDTO, 'codigo'>

export type LocalEliminarDTO = Pick< LocalDTO, 'codigo' | 'usuario'>

export interface LocalDataArrayDTO {
    data: LocalDTO[]
}

export interface LocalDataDTO {
    data: LocalDTO
}