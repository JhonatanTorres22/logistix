import { CursoMallaEquivalenciaDeleteDTO, CursoMallaEquivalenciaPrimarioInsertDTO, CursoMallaEquivalenciaSecundarioInsertDTO, CursoMallaEquivalenciaSimulacionDTO, EquivalenciaDeleteDTO, EquivalenciaPrimarioInsertDTO, EquivalenciaSecundarioInsertDTO } from "../../infraestructure/dto/equivalencia.dto";
import { CursoMallaEquivalenciaDelete, CursoMallaEquivalenciaPrimarioInsert, CursoMallaEquivalenciaSecundarioInsert, CursoMallaEquivalenciaSimulacion, EquivalenciaDelete, EquivalenciaPrimarioInsert, EquivalenciaSecundarioInsert } from "../models/equivalencia.model";

export class EquivalenciaMapper {
    
    static fromDomainToApiPrimarioInsert( param: EquivalenciaPrimarioInsert ): EquivalenciaPrimarioInsertDTO {
        return {
            codigoCursoPlan: param.cursoPlanId,
            usuario: param.userId
        }
    }


    static fromDomainToApiSecundarioInsert( param: EquivalenciaSecundarioInsert ): EquivalenciaSecundarioInsertDTO {
        return {
            codigoCursoPlan: param.cursoPlanId,
            codigoCursoPlanEquivalencia: param.cursoPlanEquivalenciaId,
            porcentajeModificacion: param.porcentajeModificacion,
            usuario: param.userId
        }
    }

    static fromDomainToApiDelete( param: EquivalenciaDelete ): EquivalenciaDeleteDTO {

        return {
            codigoCursoPlan: param.cursoPlanId,
            codigoCursoPlanEquivalencia: param.cursoPlanEquivalenciaId,
            usuario: param.userId
        }

    }

    static fromDomainToApiPrimarioInsertMalla( param: CursoMallaEquivalenciaPrimarioInsert ): CursoMallaEquivalenciaPrimarioInsertDTO {
        return {
            codigoMalla: param.idMalla,
            porcentajeModificacion: param.porcentajeModificacion,
            usuario: param.userId
        }

    }

    static fromDomainToApiSecundarioInsertMalla( param: CursoMallaEquivalenciaSecundarioInsert ): CursoMallaEquivalenciaSecundarioInsertDTO {
        return {
            codigoMalla: param.idMalla,
            codigoMallaEquivalencia: param.idMallaEquivalencia,
            porcentajeModificacion: param.porcentajeModificacion,
            usuario: param.userId
        }
    }

    static fromDomainToApiDeleteMalla( param: CursoMallaEquivalenciaDelete ): CursoMallaEquivalenciaDeleteDTO {
        return {
            codigoMalla: param.idMalla,
            codigoMallaEquivalencia: param.idMallaEquivalencia,
            usuario: param.userId
        }
    }

    static fromApiToDomainSimulacion( param: CursoMallaEquivalenciaSimulacionDTO ): CursoMallaEquivalenciaSimulacion {

            return {
                idMallaOrigen: param.codigoMallaOrigen,
                idMallaDestino: param.codigoMallaDestino,
                porcentajeModificacion: param.porcentajeModificacion

            }
    }

}