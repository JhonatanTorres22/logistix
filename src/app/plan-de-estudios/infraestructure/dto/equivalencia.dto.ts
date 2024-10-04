export interface EquivalenciaPrimarioInsertDTO {
    codigoCursoPlan: number,
    usuario: number,
}


export interface EquivalenciaSecundarioInsertDTO {
    codigoCursoPlan: number,
    codigoCursoPlanEquivalencia: number,
    porcentajeModificacion: number,
    usuario: number,
}

export interface EquivalenciaDeleteDTO {
    codigoCursoPlan: number,
    codigoCursoPlanEquivalencia: number,
    usuario: number,
}



export interface CursoMallaEquivalenciaPrimarioInsertDTO {
    codigoMalla: number,
    porcentajeModificacion: number,
    usuario: number,
}

export interface CursoMallaEquivalenciaSecundarioInsertDTO {
    codigoMalla: number,
    codigoMallaEquivalencia: number,
    porcentajeModificacion: number,
    usuario: number,
}

export interface CursoMallaEquivalenciaDeleteDTO {
    codigoMalla: number,
    codigoMallaEquivalencia: number,
    usuario: number,
}