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
    denominacionResumida: string
    denominacionExtendida: string,
    definicion: string,
    eqs: EquivalenciaDTO[]
}


export interface EquivalenciaDTO {
    nombreCursoPlanEquivalencia: string
}


export interface CursoPlanEquivalenciaDataArrayDTO {
    data: CursoPlanEquivalenciaDTO[]
}