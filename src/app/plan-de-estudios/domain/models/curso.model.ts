export interface Curso {
    id: number,
    idPrograma: number,
    idCiclo: number,
    codigoCurso: string,
    nombreCurso: string,
    descripcion: string,
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
    // ciclo: string,
    idCiclo: number,
    cursos: Curso[]
}

export type CursoCrear = Omit<Curso, 'id' | 'preRequisito'> & {
    usuarioId: number
}

export type CursoEditar = Omit<CursoCrear, 'idCiclo'> & {
    id: number;
}
export type CursoEliminar = Pick<Curso, 'id'> & {
    usuarioId: number
}

export interface CursoDataArray {

    data: Curso[]
}