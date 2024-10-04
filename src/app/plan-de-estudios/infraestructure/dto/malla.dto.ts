export interface MallaDTO {
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

export interface MallaPreRequisitoDTO {
    codigoMalla: number,
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
    prerequisito: CursoMallaPreRequisitoDTO[]
}

export type CursoMallaPreRequisitoDTO = {
    codigoMallaPreRequisito: number,
    nombreMallaPreRequisito: string
}

export interface MallaInsertDTO {
    codigoPlanDeEstudio: number,
    codigoCurso: number,
    codigoCiclo: number,
    usuario: number
}

export interface MallaDeleteDTO {
    codigoMalla: number,
    usuario: number
}

export interface EquivalenciaMallaDTO {
    codigoCursoPlanEquivalencia: number,
    nombreCursoPlanEquivalencia: string,
    porcentajeModificacion: number
}

export interface MallaDataArrayDTO {
    data: MallaDTO[]
}

export interface MallaPreRequisitoDataArrayDTO {
    data: MallaPreRequisitoDTO[]
}