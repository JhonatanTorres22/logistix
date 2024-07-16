export interface CicloDTO {
    codigo: number,
    denominacionResumida: string,
    denominacionExtendida: string,
    definicion: string,
    usuario: string
}

export type CicloEliminarDTO = Pick<CicloDTO, 'codigo' | 'usuario'>

export type CicloCrearDTO = Omit<CicloDTO, 'codigo'>

export type CicloEditarDTO = CicloDTO & { usuario: string };


export interface CicloDataArrayDTO {
    data: CicloDTO[]
}