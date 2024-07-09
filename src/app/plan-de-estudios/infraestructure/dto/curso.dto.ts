export interface CursoDTO {
    id: number,
    programa:string,
    ciclo: string,
    idCiclo: number,
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


export type CursoCrearDTO = Omit<CursoDTO, 'id' | 'programa' | 'ciclo' | 'preRequisito' | 'competencia' | 'tipoCurso' | 'tipoEstudio'> & {
    idCompetencia: string,
    idTipoCurso: string,
    idTipoEstudio: string,
    usuario: number
}
export type CursoEditarDTO = CursoCrearDTO & {
    id: number,
    usuario: number
}
export type CursoEliminarDTO = Pick<CursoDTO, 'id'> & { usuario: number}

export interface CursoDataArrayDTO {

    data: CursoDTO[]
}