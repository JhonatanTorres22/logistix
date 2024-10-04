export interface Malla {

    idMalla: number,
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
    idCursoPlan: number,
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