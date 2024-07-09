export interface Curso {
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

export interface CursoByCiclo {
    ciclo: string,
    idCiclo: number,
    cursos: Curso[]
}

export type CursoCrear = Omit<Curso, 'id' | 'programa' | 'ciclo' | 'preRequisito' | 'competencia' | 'tipoCurso' | 'tipoEstudio'> & {
    idCompetencia: string,
    idTipoCurso: string,
    idTipoEstudio: string,
    usuarioId: number
}

export type CursoEditar = CursoCrear & {
    id: number
}
export type CursoEliminar = Pick<Curso, 'id'>

export interface CursoDataArray {

    data: Curso[]
}