export interface PlanEstudio {
    id: number,
    idProgramaAcademico: number,
    nombre: string,
    resolucion: string,
    descripcionGrado: string,
    descripcionTitulo: string,
    detallePerfil: string,
    archivo: string,
    estadoCaducidad: string,
    estadoMatricula: string,

}


export type PlanEstudioAdd = Pick<PlanEstudio, 'idProgramaAcademico' | 'nombre' | 'descripcionGrado' | 'descripcionTitulo' | 'detallePerfil'> & {
    usuarioId: number,
}

export type PlanEstudioEditDE = Omit<PlanEstudioAdd, 'idProgramaAcademico'> & {
    idPlanEstudio: number
}


export type PlanEstudioEditCU = PlanEstudioEditDE & {
    resolucion: string
}


export type PlanEstudioEliminar = {
    idPlanEstudio: number,
    usuarioId: number
}

export type PlanEstudioCursoInsertar = {
    idPlanEstudio: number,
    idCurso: number,
    usuarioId: number
}


export interface CursoPlanListar {
    idCursoPlan: number,
    nombre: string,
    descripcion: string
}


export interface CursoPlanEliminar {
    idCursoPlan: number,
    usuarioId: number
}
