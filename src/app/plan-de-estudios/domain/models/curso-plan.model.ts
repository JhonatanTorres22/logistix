import { Malla } from "./malla.model"

export type PlanEstudioCursoInsertar = {
    idPlanEstudio: number,
    idCurso: number,
    usuarioId: number
}

export interface CursoPlanBase {
    idCursoPlan: number,
    codigoCurso: string,
    nombreCurso: string,
    tipoCurso: string,
    tipoEstudio: string,
    horasTeoricas: number,
    horasPracticas: number,
    totalHoras: number,
    totalCreditos: number,
    estado: string,
    cicloRomano: string,
    cicloNumero: number,
    cicloLetra: string,
    //CursoPlan
    competencia: string,
    descripcion: string,
    //CursoPlanEquivalencia
    equivalencias: Equivalencia[],
    color: string,
    //CursoPlanPreRequisito
    preRequisitos: CursoPreRequisito[],
}

export interface CursoPlanListar extends CursoPlanBase {
    
    // competencia: string,
    // descripcion: string,

}

export interface CursoPlanEquivalencia extends CursoPlanBase {

    // equivalencias: Equivalencia[],
    // color: string

}

export interface CursoPlanPreRequisito extends CursoPlanBase {
    
    // preRequisitos: CursoPreRequisito[],

}

export interface CursoPlanEliminar {
    idCursoPlan: number,
    usuarioId: number
}




export interface Equivalencia {
    idCursoPlan: number,
    nombreCurso: string,
    porcentajeModificacion: number,
}


export interface EquivalenciaValidar {
    pendientes: number,
    totalPendientes: number,
    equivalenciaTerminada: boolean,
    cursosActualPendientes: Malla[],
    cursosUltimoPendientes: Malla[],

}

export interface CursoMallaEquivalenciaValidator {
    totalCurso: number,
    isFirstPlan: boolean,
    primarios: CursoMallaEquivalenaValidatorPrimario,
    secundarios: CursoMallaEquivalenaValidatorSecundario
}

export interface CursoMallaEquivalenaValidatorPrimario {
    pendientes: number,
    totalPrimarios: number,
    isValid: boolean,
}

export interface CursoMallaEquivalenaValidatorSecundario {
    pendientes: number,
    totalSecundarios: number,
    isValid: boolean,
}

export type CursoPreRequisito = Pick<CursoPlanPreRequisito, 'idCursoPlan' | 'nombreCurso'>


export interface CursoPlanByCiclo {

    idCiclo: number,
    cicloNumero: number,
    ciclo: string,
    cursosPlan: CursoPlanBase[],

}