import { PlanEstudioDTO } from "./plan-estudio.dto"

export interface CursoDTO {
    codigoCurso: number,
    codigoProgramaAcademico: number,
    codigoCiclo: number,
    codigoInterno: string,
    nombre: string,
    descripcion: string,
    tipoDeCurso: string,
    tipoDeEstudio: string,
    competencia: string,
    ht: number,
    hp: number,
    tHoras: number,
    tCreditos: number,
    prerequisito: CursoPreRequisitoDTO[]
}


export type CursoPreRequisitoDTO = Pick<CursoDTO, 'codigoCurso' | 'codigoInterno' | 'nombre'>


export type CursoCrearDTO = Omit<CursoDTO, 'codigoCurso' | 'prerequisito'> & {
    // idCompetencia: string,
    // idTipoCurso: string,
    // idTipoEstudio: string,
    usuario: number
}
export type CursoEditarDTO = Omit<CursoCrearDTO, 'codigoCiclo'>  & {
    codigoCurso: number,
    usuario: number
}
export type CursoEliminarDTO = Pick<CursoDTO, 'codigoCurso'> & { usuario: number}

export interface CursoDataArrayDTO {

    data: CursoDTO[]
}

export type CursoAddPreRequisitoDTO = Pick<CursoDTO, 'codigoCurso'> & {
    codigoCursoPreRequisito: number,
    usuario: number
}

export type CursoBuscarPlanDTO = Pick<CursoDTO, 'codigoCurso'>;

export type CursoEncontradoEnPlanDTO = Pick<PlanEstudioDTO, 'codigoPlanDeEstudio' | 'nombre' | 'archivo' | 'estadoMatricula'>

export interface CursoEncontradoEnPlanDataArrayDTO {
    data: CursoEncontradoEnPlanDTO[]
}

export type CursoDeletePreRequisitoDTO = CursoAddPreRequisitoDTO;