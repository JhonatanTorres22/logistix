import { CursoDTO } from "./curso.dto"

export interface PlanEstudioDTO {
    codigoPlanDeEstudio: number,
    codigoProgramaAcademico: number,
    nombre: string,
    resolucion: string,
    descripcionGrado: string,
    descripcionTitulo: string,
    detallePerfil: string,
    archivo: string,
    inicioVigencia: string,
    finVigencia: string,
    estadoCaducidad: string,
    estadoMatricula: string
}


export interface PlanEstudioDataArrayDTO {
    data: PlanEstudioDTO[]
}


export type PlanEstudioAddDTO = Pick<PlanEstudioDTO, 'codigoProgramaAcademico' | 'descripcionGrado' | 'descripcionTitulo' | 'detallePerfil' | 'nombre'> & {
    usuario: number
}

export type PlanEstudioEditDEDTO = Omit<PlanEstudioAddDTO, 'codigoProgramaAcademico'> & {
    codigoPlanDeEstudio: number
}

export type PlanEstudioEditCUDTO = PlanEstudioEditDEDTO & {
    resolucion: string,
    inicioVigencia: string,
    finVigencia: string,
    Archivo: File | any
}

export type PlanEstudioEliminarDTO = {
    codigoPlanDeEstudio: number,
    usuario: number
}

