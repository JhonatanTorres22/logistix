export interface CicloDTO {
    codigo: number,
    denominacionResumida: string,
    denominacionExtendida: string,
    definicion: string
}

export type CicloEliminarDTO = Pick<CicloDTO, 'codigo'>& { usuario: string };

export type CicloCrearDTO = Omit<CicloDTO, 'codigo'> & { usuario: string };

export type CicloEditarDTO = CicloDTO & { usuario: string };


export interface CicloDataArrayDTO {
    data: CicloDTO[]
}