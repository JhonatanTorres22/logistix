export interface CursoDTO {
    id: number,
    programa:string,
    ciclo: string,
    codigoCurso: string,
    nombreCurso: string,
    tipoEstudio: string,
    tipoCurso: string,
    competencia: string,
    horasTeoricas: number,
    horasPracticas: number,
    totalHoras: number,
    totalCreditos: number,
    preRequisito: number[]
}


export type CursoCrearDTO = Omit<CursoDTO, 'id'> & { usuario: number}
export type CursoEditarDTO = CursoDTO & { usuario: number}
export type CursoEliminarDTO = Pick<CursoDTO, 'id'> & { usuario: number}

export interface CursoDataArrayDTO {

    data: CursoDTO[]
}