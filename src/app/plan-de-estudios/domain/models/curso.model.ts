import { PlanEstudio } from "./plan-estudio.model"

export interface Curso {
    id: number,
    idPrograma: number,
    idCiclo: number,
    definicionCiclo: string,
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
    preRequisitos: CursoPreRequisito[]
}

export interface CursoByCiclo {
    // ciclo: string,
    idCiclo: number,
    ciclo: string,
    cursos: Curso[]
}

export type CursoPreRequisito = Pick<Curso, 'id' | 'codigoCurso' | 'nombreCurso'>
export type CursoCrear = Omit<Curso, 'id' | 'preRequisitos' | 'definicionCiclo'> & {
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

export type CursoAddPreRequisito = Pick<Curso, 'id'> & {
    idCursoPreRequisito: number,
    usuarioId: number
}


export type CursoBuscarPlan = Pick<Curso, 'id'>;

export type CursoEncontradoEnPlan = Pick<PlanEstudio, 'id' | 'nombre' | 'archivo' | 'estadoMatricula'>

export type CursoDeletePreRequisito = CursoAddPreRequisito;