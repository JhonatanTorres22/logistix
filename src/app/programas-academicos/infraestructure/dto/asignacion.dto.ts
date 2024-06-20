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