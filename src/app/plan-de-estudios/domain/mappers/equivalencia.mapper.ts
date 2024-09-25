import { EquivalenciaPrimarioInsertDTO, EquivalenciaSecundarioInsertDTO } from "../../infraestructure/dto/equivalencia.dto";
import { EquivalenciaPrimarioInsert, EquivalenciaSecundarioInsert } from "../models/equivalencia.model";

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
            usuario: param.userId
        }
    }

}