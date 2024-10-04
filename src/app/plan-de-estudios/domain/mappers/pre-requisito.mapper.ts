import { CursoMallaPreRequisitoDeleteDTO, CursoMallaPreRequisitoInsertDTO, PreRequisitoDeleteDTO, PreRequisitoInsertDTO } from "../../infraestructure/dto/pre-requisito.dto";
import { CursoMallaPreRequisitoDelete, CursoMallaPreRequisitoInsert, PreRequisitoDelete, PreRequisitoInsert } from "../models/pre-requisito.model";

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

    static fromDomainToApiInsertMalla(param: CursoMallaPreRequisitoInsert): CursoMallaPreRequisitoInsertDTO {
        return {
            codigoMalla: param.idMalla,
            codigoMallaPreRequisito: param.idMallaPreRequisito,
            usuario: param.userId
        };
    }

    static fromApiToDomainDeleteMalla(param: CursoMallaPreRequisitoDelete ): CursoMallaPreRequisitoDeleteDTO {
        return {
            codigoMalla: param.idMalla,
            codigoMallaPreRequisito: param.idMallaPreRequisito,
            usuario: param.userId
        };
    }

}