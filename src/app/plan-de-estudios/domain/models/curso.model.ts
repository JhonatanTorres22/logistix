import { CursoPlanListar } from "./curso-plan.model"
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
    // preRequisitos: CursoPreRequisito[]
}

export interface CursoByCiclo {
    // ciclo: string,
    idCiclo: number,
    cicloNumero: number,
    ciclo: string,
    cursosPlan: CursoPlanListar[],
    cursos: Curso[]
}

// export type CursoPreRequisito = Pick<Curso, 'id' | 'codigoCurso' | 'nombreCurso'>
export type CursoCrear = Omit<Curso, 'id' | 'preRequisitos' | 'definicionCiclo'> & {
    usuarioId: number
}

export type CursoRenovar = CursoCrear & {
    cursoId: number
}

export interface CursoDesfasar {
    id: number,
    usuarioId: number
}

export type CursoRevertirDesfase = CursoDesfasar;

export type CursoRevertirRenovacion = CursoDesfasar;

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

export type CursoDesfasado = Omit<Curso, 'preRequisitos'>


export type CursoBuscarPlan = Pick<Curso, 'id'>;

export type CursoEncontradoEnPlan = Pick<PlanEstudio, 'id' | 'nombre' | 'archivo' | 'estadoMatricula'>

export type CursoDeletePreRequisito = CursoAddPreRequisito;


export interface CursoExcel {
    programa: number,
    ciclo: number,
    orden: number,
    codigo_curso: string,
    nombre_curso: string,
    pre_requisito: string,
    ht: number,
    hp: number,
    th: number,
    creditos: number,
    tipo_curso: string,
    tipo_estudio: string,
    competencia: string,
}

export interface CursoExcelValid{
    idPrograma: number,
    idCiclo: number,
    codigoCurso: string,
    nombreCurso: string,
    descripcion: string,
    tipoCurso: string,
    tipoEstudio: string,
    competencia: string,
    horasTeoricas: number,
    horasPracticas: number,
    totalHoras: number,
    totalCreditos: number,
    usuarioId: number,
}