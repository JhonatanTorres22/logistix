export interface EquivalenciaPrimarioInsert {
    cursoPlanId: number,
    userId: number,
}

export interface EquivalenciaSecundarioInsert {
    cursoPlanId: number,
    cursoPlanEquivalenciaId: number,
    porcentajeModificacion: number,
    userId: number,
}


export interface EquivalenciaDelete {
    cursoPlanId: number,
    cursoPlanEquivalenciaId: number,
    userId: number,
}