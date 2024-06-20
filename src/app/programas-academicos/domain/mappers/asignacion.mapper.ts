import { AsignacionDTO, AsignacionLocalDTO, AsignacionProgramaDTO } from "../../infraestructure/dto/asignacion.dto";
import { Asignacion, AsignacionLocal, AsignacionPrograma } from "../models/asignacion.model";

export class AsignacionMapper {
    static fromApiToDomain( param: AsignacionDTO ): Asignacion {

        const programas = param.programasAcademicos.map( AsignacionMapper.fromApiToDomainAsignacionPrograma )

        return {
            idFacultad: param.codigoFacultad,
            nombreFacultad: param.nombreFacultad,
            idDecano: param.codigoDecano,
            nombreDecano: param.decano,
            programas: programas
        }
    }

    static fromApiToDomainAsignacionPrograma( param: AsignacionProgramaDTO ): AsignacionPrograma {

        const locales = param.locales.map(AsignacionMapper.fromApiToDomainAsignacionLocal);

        return {
            idPrograma: param.codigoProgramaAcademico,
            nombrePrograma: param.nombreProgramaAcademico,
            idDirector: param.codigoDirectorEscuela,
            nombreDirector: param.directorEscuela,
            locales: locales
        }
    }

    static fromApiToDomainAsignacionLocal( param: AsignacionLocalDTO ): AsignacionLocal {
        return {
            idLocal: param.codigo,
            nombreLocal: param.nombre
        }
    }

    // DOMINIO AL API
    static fromDomainToApi( param: Asignacion ): AsignacionDTO {

        const programas = param.programas.map( AsignacionMapper.fromDomainToApiAsignacionPrograma )

        return {
            codigoFacultad: param.idDecano,
            nombreFacultad: param.nombreFacultad,
            codigoDecano: param.idDecano,
            decano: param.nombreDecano,
            programasAcademicos: programas
        }
    }

    static fromDomainToApiAsignacionPrograma( param: AsignacionPrograma ): AsignacionProgramaDTO {

        const locales = param.locales.map(AsignacionMapper.fromDomainToApiAsignacionLocal);

        return {
            codigoProgramaAcademico: param.idPrograma,
            nombreProgramaAcademico: param.nombrePrograma,
            codigoDirectorEscuela: param.idDirector,
            directorEscuela: param.nombreDirector,
            locales: locales
        }
    }

    static fromDomainToApiAsignacionLocal( param: AsignacionLocal ): AsignacionLocalDTO {
        return {
            codigo: param.idLocal,
            nombre: param.nombreLocal
        }
    }
}