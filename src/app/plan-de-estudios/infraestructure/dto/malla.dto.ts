export interface MallaDTO {
    orden: number,
    codigoMalla: number,
    codigoCurso: number,
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
    modalidadDeCreacion: string,
    definicion: string,

}

export interface MallaPreRequisitoDTO {
    orden: number,
    codigoMalla: number,
    codigoCiclo: number,
    codigoCurso: number,
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
    modalidadDeCreacion: string,
    prerequisito: CursoMallaPreRequisitoDTO[]
}

export interface MallaEquivalenciaDTO {
    orden: number,
    codigoMalla: number,
    codigoCiclo: number,
    codigoCurso: number,
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
    modalidadDeCreacion: string,
    equivalencia: EquivalenciaMallaDTO[]
}

export type CursoMallaPreRequisitoDTO = {
    codigoMallaPreRequisito: number,
    nombreMallaPreRequisito: string,
    codigoInternoCursoPreRequisito: string
}

export interface MallaInsertDTO {
    orden: number,
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
    codigoMallaEquivalencia: number,
    nombreMallaEquivalencia: string,
    porcentajeModificacion: number
}

export interface MallaDataArrayDTO {
    data: MallaDTO[]
}


export interface MallaPreRequisitoDataArrayDTO {
    data: MallaPreRequisitoDTO[]
}

export interface MallaEquivalenciaDataArrayDTO {
    data: MallaEquivalenciaDTO[]
}


export interface CursoMallaRenovarDTO {
    codigoPlanDeEstudio: number,
    orden: number,
    codigoMalla: number,
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
    usuario: number
}

export interface CursoMallaReordenarDTO {
    codigoMalla: number,
    orden: number,
    codigoCiclo: number,
    usuario: number
}

export interface CursoMallaRenovadoDTO {
    codigoMallaRenovada: number,
    codigoCursoRenovado: number,
    codigoInternoCursoRenovado: string,
    nombreCursoRenovado: string,
    definicionCicloRenovado: string,
    codigoMallaActiva: number,
    codigoCursoActivo: number,
    codigoInternoCursoActivo: string,
    nombreCursoActivo: string,
    definicionCicloActivo: string
}

export interface CursoMallaDesfasadoDTO {
    codigoMalla: number,
    codigoCurso: number,
    codigoInternoCurso: string,
    nombreCurso: string,
    definicionCiclo: string
}

export interface CursoMallaRenovadoDataArrayDTO {
    data: CursoMallaRenovadoDTO[]
}

export interface CursoMallaDesfasadoDataArrayDTO {
    data: CursoMallaDesfasadoDTO[]
}

export interface CursoMallaRevertirRenovacionDTO {
    codigoMallaRenovada: number,
    usuario: number
}

export interface CursoMallaDesfasarDTO {
    codigoMalla: number,
    usuario: number
}


export interface CursoMallaRevertirDesfaseDTO {
    codigoMalla: number,
    usuario: number
}

export interface CursoMallaInsertarDTO {
    codigoPlanDeEstudio: number,
    orden: number,
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
    usuario: number
}

export interface CursoMallaEliminarDTO {
    codigoMalla: number,
    usuario: number
}