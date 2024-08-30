import { UsuarioRolDTO } from "src/app/usuarios/infraestructure/dto/usuario-rol.dto";
import { FacultadDTO } from "./facultad.dto";

export interface AsignacionDTO {
    codigoFacultad: number,
    nombreFacultad: string,
    codigoDecano: number,
    decano: string,
    programasAcademicos: AsignacionProgramaDTO[]
}

export interface AsignacionProgramaDTO {
    codigoProgramaAcademico: number,
    nombreProgramaAcademico: string,
    codigoDirectorEscuela: number,
    directorEscuela: string,
    locales: AsignacionLocalDTO[]
}

export interface AsignacionLocalDTO {
    codigo: number,
    nombre: string
}

export interface AsginacionDataArrayDTO {
    data: AsignacionDTO[]
}

export interface AsignarNuevoProgramaDTO {
    codigoDirectorEscuela: number,
    codigoDecano: number,
    codigoProgramaAcademico: number,
    codigoSemestre: number,
    codigoLocal: number,
    usuario: number
}

export interface AsignacionEliminarDTO {
    codigoDirectorEscuela: number,
    codigoDecano: number,
    codigoProgramaAcademico: number,
    codigoSemestre: number,
    codigoLocal: number,
    usuario: number
}


export type AsignacionProgramaCambiarDirectorDTO = Pick<AsignacionProgramaDTO, 'codigoDirectorEscuela' | 'codigoProgramaAcademico'> & {
    codigoSemestre: number,
    usuario: number
}

export type AsignacionCambiarDecanoDTO = Pick<AsignacionProgramaCambiarDirectorDTO, 'codigoProgramaAcademico' | 'codigoSemestre' | 'usuario'> & {
    codigoDecano: number
}