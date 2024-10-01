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