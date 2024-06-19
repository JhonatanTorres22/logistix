import { ProgramaCrearDTO, ProgramaDTO, ProgramaEditarDTO, ProgramaEliminarDTO, ProgramaFacultadDTO } from "../../infraestructure/dto/programa.dto";
import { Programa, ProgramaCrear, ProgramaEditar, ProgramaEliminar, ProgramaFacultad } from "../models/programa.model";

export class ProgramaMapper {
    static fromDomainToApi( param: Programa ): ProgramaDTO {
        return {
            codigo: param.id,
            codigoFacultad: param.idFacultad,
            definicion: param.definicion,
            nombre: param.nombre,
            usuario: param.usuarioId
        }
    }

    static fromApiToDomain( param: ProgramaDTO ): Programa {
        return {
            id: param.codigo,
            idFacultad: param.codigoFacultad,
            definicion: param.definicion,
            nombre: param.nombre,
            usuarioId: param.usuario
        }
    }

    static fromDomainToApiCrear( param: ProgramaCrear ): ProgramaCrearDTO {
        return {
            codigoFacultad: param.idFacultad,
            definicion: param.definicion,
            nombre: param.nombre,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiEditar( param: ProgramaEditar ): ProgramaEditarDTO {
        return {
            codigo: param.id,
            definicion: param.definicion,
            nombre: param.nombre,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiEliminar ( param: ProgramaEliminar ): ProgramaEliminarDTO {
        return {
            codigo: param.id,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiProgramaFacultad ( param: ProgramaFacultad ): ProgramaFacultadDTO {
        return {
            codigo: param.id,
            definicion: param.definicion,
            nombre: param.nombre,
            usuario: param.usuarioId
        }
    }

    static fromApiToDomainProgramaFacultad ( param: ProgramaFacultadDTO ): ProgramaFacultad {
        return {
            id: param.codigo,
            definicion: param.definicion,
            nombre: param.nombre,
            usuarioId: param.usuario
        }
    }
}