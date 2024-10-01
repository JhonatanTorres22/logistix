import { PlanEstudioAddDTO, PlanEstudioDTO, PlanEstudioEditCUDTO, PlanEstudioEditDEDTO, PlanEstudioEliminarDTO } from "../../infraestructure/dto/plan-estudio.dto";
import { PlanEstudio, PlanEstudioAdd, PlanEstudioEditCU, PlanEstudioEditDE, PlanEstudioEliminar } from "../models/plan-estudio.model";


export class PlanEstudioMapper {
    static fromApiToDomain( param: PlanEstudioDTO ): PlanEstudio {
        return {
            archivo: param.archivo,
            descripcionGrado: param.descripcionGrado,
            descripcionTitulo: param.descripcionTitulo,
            detallePerfil: param.detallePerfil,
            estadoCaducidad: param.estadoCaducidad,
            estadoMatricula: param.estadoMatricula,
            id: param.codigoPlanDeEstudio,
            idProgramaAcademico: param.codigoProgramaAcademico,
            finVigencia: param.finVigencia,
            inicioVigencia: param.inicioVigencia,
            nombre: param.nombre,
            resolucion: param.resolucion
        }
    }

    static fromDomainToApiAdd( param: PlanEstudioAdd ): PlanEstudioAddDTO {
        return {
            codigoProgramaAcademico: param.idProgramaAcademico,
            descripcionGrado: param.descripcionGrado,
            descripcionTitulo: param.descripcionTitulo,
            detallePerfil: param.detallePerfil,
            nombre: param.nombre,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiEditDE( param: PlanEstudioEditDE ): PlanEstudioEditDEDTO {
        return {
            codigoPlanDeEstudio: param.id,
            descripcionGrado: param.descripcionGrado,
            descripcionTitulo: param.descripcionTitulo,
            detallePerfil: param.detallePerfil,
            nombre: param.nombre,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiEditCU( param: PlanEstudioEditCU ): PlanEstudioEditCUDTO {
        return {
            codigoPlanDeEstudio: param.id,
            descripcionGrado: param.descripcionGrado,
            descripcionTitulo: param.descripcionTitulo,
            detallePerfil: param.detallePerfil,
            nombre: param.nombre,
            resolucion: param.resolucion,
            inicioVigencia: param.inicioVigencia,
            finVigencia: param.finVigencia,
            usuario: param.usuarioId,
            Archivo: param.archivo
        }
    }

    static fromDomainToApiEliminar( param: PlanEstudioEliminar ): PlanEstudioEliminarDTO {
        return {
            codigoPlanDeEstudio: param.idPlanEstudio,
            usuario: param.usuarioId
        }
    }

    
}