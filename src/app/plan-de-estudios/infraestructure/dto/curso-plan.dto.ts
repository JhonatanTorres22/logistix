export type PlanEstudioCursoInsertarDTO = {
    codigoPlanDeEstudio: number,
    codigoCurso: number,
    usuario: number
}


export type CursoPlanListarDTO = {
    codigoCursoPlan: number,
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
    estado: string,
    denominacionResumida: string,
    denominacionExtendida: string,
    definicion: string,
}

export interface CursoPlanListarDataArrayDTO {
    data: CursoPlanListarDTO[]
}

export interface CursoPlanEliminarDTO {
    codigoCursoPlan: number,
    // codigoPlanDeEstudio: number,
    usuario: number
}

export interface CursoPlanEquivalenciaDTO {
    codigoCursoPlan: number,
    nombreCurso: string,
    codigoInterno: string,
    tipoDeCurso: string,
    tipoDeEstudio: string,
    ht: number,
    hp: number,
    tHoras: number,
    tCreditos: number,
    estado: string,
    denominacionResumida: string
    denominacionExtendida: string,
    definicion: string,
    equivalencia: EquivalenciaDTO[]
}


export interface EquivalenciaDTO {
    codigoCursoPlanEquivalencia: number,
    nombreCursoPlanEquivalencia: string,
    porcentajeModificacion: number
}


export interface CursoPlanEquivalenciaDataArrayDTO {
    data: CursoPlanEquivalenciaDTO[]
}


export interface CursoPlanPreRequisitoDTO {
    codigoCursoPlan: number,
    nombreCurso: string,
    codigoInterno: string,
    tipoDeCurso: string,
    tipoDeEstudio: string,
    ht: number,
    hp: number,
    tHoras: number,
    tCreditos: number,
    estado: string,
    denominacionResumida: string
    denominacionExtendida: string,
    definicion: string,
    prerequisito: CursoPreRequisitoDTO[]
}

export type CursoPreRequisitoDTO = {
    codigoCursoPlanPreRequisito: number,
    nombreCursoPlanPreRequisito: string
}


export interface CursoPlanPreRequisitoDataArrayDTO {
    data: CursoPlanPreRequisitoDTO[]
}