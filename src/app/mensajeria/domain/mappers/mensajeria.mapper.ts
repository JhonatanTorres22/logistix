import { RolUserId } from "src/app/core/mappers/rolUserId";
import { MensajeriaInsertarDTO } from "../../infraestructure/dto/mensajeria.dto";
import { MensajeriaInsertar } from "../models/mensajeria.model";

export class MensajeriaMapper {
    static fromDomainToApiInsertar( param: MensajeriaInsertar ): MensajeriaInsertarDTO {
        return {
            codigoTipoMensaje: param.tipoMensaje,
            asunto: param.asunto,
            codigoEmisorRol: param.emisorId,
            codigoReceptorRol: param.receptorId,
            textoMensaje: param.menssage,
            leido: param.leido,
            usuario: RolUserId.currentIdRolUser
        }
    }

    
}