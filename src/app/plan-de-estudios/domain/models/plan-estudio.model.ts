export interface PlanEstudio {
    id: number,
    idProgramaAcademico: number,
    nombre: string,
    resolucion: string,
    descripcionGrado: string,
    descripcionTitulo: string,
    detallePerfil: string,
    archivo: string,
    inicioVigencia: string,
    finVigencia: string,
    estadoCaducidad: string,
    estadoMatricula: string,

}


export type PlanEstudioAdd = Pick<PlanEstudio, 'idProgramaAcademico' | 'nombre' | 'descripcionGrado' | 'descripcionTitulo' | 'detallePerfil'> & {
    usuarioId: number,
}

export type PlanEstudioEditDE = Omit<PlanEstudioAdd, 'idProgramaAcademico'> & Pick<PlanEstudio, 'id'>


export type PlanEstudioEditCU = PlanEstudioEditDE & {
    resolucion: string,
    inicioVigencia: string,
    finVigencia: string,
    archivo: File | any
}


export type PlanEstudioEliminar = {
    idPlanEstudio: number,
    usuarioId: number
}


