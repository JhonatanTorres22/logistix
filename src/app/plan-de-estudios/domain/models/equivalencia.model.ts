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


export interface CursoMallaEquivalenciaPrimarioInsert {
    idMalla: number,
    userId: number,
    porcentajeModificacion: number,
}

export interface CursoMallaEquivalenciaSecundarioInsert {
    idMalla: number,
    idMallaEquivalencia: number,
    porcentajeModificacion: number,
    userId: number,
}

export interface CursoMallaEquivalenciaDelete {
    idMalla: number,
    idMallaEquivalencia: number,
    userId: number,
}