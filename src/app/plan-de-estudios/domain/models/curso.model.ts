export interface Curso {
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


export type CursoCrear = Omit<Curso, 'id'>
export type CursoEliminar = Pick<Curso, 'id'>

export interface CursoDataArray {

    data: Curso[]
}