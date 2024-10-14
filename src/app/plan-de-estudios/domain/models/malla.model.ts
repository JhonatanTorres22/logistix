export interface Malla {
    orden: number,
    idMalla: number,
    idCurso: number,
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
    equivalencias: EquivalenciaMalla[],
    color: string,
    //CursoPlanPreRequisito
    preRequisitos: CursoPreRequisitoMalla[],

}

export interface MallaInsert {
    orden: number,
    idPlanEstudio: number,
    idCurso: number,
    idCiclo: number,
    userId: number,
}

export interface MallaDelete {
    idMalla: number,
    userId: number,
}


export interface EquivalenciaMalla {
    idMalla: number,
    nombreCurso: string,
    porcentajeModificacion: number,
}

export interface CursoMallaByCiclo {

    idCiclo: number,
    cicloNumero: number,
    ciclo: string,
    cursosMalla: Malla[],

}

export type CursoPreRequisitoMalla = Pick<Malla, 'idMalla' | 'nombreCurso'>


export interface CursoMallaRenovar {
    idPlanEstudio: number,
    orden: number,
    idCurso: number,
    idPrograma: number,
    idCiclo: number,
    codigoCurso: string,
    nombreCurso: string,
    descripcion: string,
    tipoCurso: string,
    tipoEstudio: string,
    competencia: string,
    horasTeoricas: number,
    horasPracticas: number,
    totalHoras: number,
    totalCreditos: number,
    userId: number,
}

export interface CursoMallaReordenar {
    idMalla: number,
    orden: number,
    idCiclo: number,
    userId: number,
}