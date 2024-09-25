export interface CursoPlanEquivalencia {
    idCursoPlan: number,
    nombreCurso: string,
    codigoCurso: string,
    tipoCurso: string,
    tipoEstudio: string,
    horasTeoricas: number,
    horasPracticas: number,
    totalHoras: number,
    totalCreditos: number,
    cicloRomano: string,
    cicloNumero: string,
    cicloLetra: string,
    equivalencias: Equivalencia[]
}

export interface Equivalencia {
    nombreCurso: string,
}