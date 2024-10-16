import { PlanEstudioDTO } from "./plan-estudio.dto"

export interface CursoDTO {
    codigoCurso: number,
    codigoProgramaAcademico: number,
    codigoCiclo: number,
    denominacionResumidaCiclo: string,
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
    // prerequisito: CursoPreRequisitoDTO[]
}




export type CursoCrearDTO = Omit<CursoDTO, 'codigoCurso' | 'prerequisito' | 'denominacionResumidaCiclo' | 'codigoCiclo'> & {
    // idCompetencia: string,
    // idTipoCurso: string,
    // idTipoEstudio: string,
    usuario: number
}

export type CursoRenovarDTO = CursoCrearDTO & {
    codigoCurso: number
}

export interface CursoDesfasarDTO {
    codigoCurso: number,
    usuario: number
}

export type CursoRevertirDesfaseDTO = CursoDesfasarDTO

export type CursoRevertirRenovacionDTO = CursoDesfasarDTO;


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


export type CursoDesfasadoDTO = Omit<CursoDTO, 'prerequisito'>

export interface CursoDesfasadoDataArrayDTO {
    
        data: CursoDesfasadoDTO[]
}