import { PreRequisitoDeleteDTO, PreRequisitoInsertDTO } from "../../infraestructure/dto/pre-requisito.dto";
import { PreRequisitoDelete, PreRequisitoInsert } from "../models/pre-requisito.model";

export class PreRequisitoMapper {
    static fromDomainToApiInsert(param: PreRequisitoInsert): PreRequisitoInsertDTO {
        return {
            codigoCursoPlan: param.idCursoPlan,
            codigoCursoPlanPreRequisito: param.idCursoPlanPreRequisito,
            usuario: param.userId
        };
    }

    static fromApiToDomainDelete(param: PreRequisitoDelete): PreRequisitoDeleteDTO {
        return {
            codigoCursoPlan: param.idCursoPlan,
            codigoCursoPlanPreRequisito: param.idCursoPlanPreRequisito,
            usuario: param.userId
        };
    }

}