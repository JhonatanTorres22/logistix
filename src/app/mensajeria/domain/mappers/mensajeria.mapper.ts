import { RolUserId } from "src/app/core/mappers/rolUserId";
import { MensajeriaArchivadosDTO, MensajeriaEnviadosDTO, MensajeriaHistorialMensajesDTO, MensajeriaInsertarDTO, MensajeriaRecibidosDTO } from "../../infraestructure/dto/mensajeria.dto";
import { MensajeriaArchivados, MensajeriaEnviados, MensajeriaHistorialMensajes, MensajeriaInsertar, MensajeriaRecibidos } from "../models/mensajeria.model";
import { RemoveHTML } from "src/app/core/mappers/removeHTML";

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

    static fromApiToDomainRecibidos( param: MensajeriaRecibidosDTO ): MensajeriaRecibidos {

        

        return {
            idMensaje: param.codigoMensajeria,
            idTipoMensaje: param.codigoTipoMensajeria,
            tipoMensaje: param.tipoMensaje,
            asunto: param.asunto,
            mensaje: RemoveHTML.removeHTML( param.contenido),
            rolEmisor: param.rol,
            emisor: param.emisor,
            receptor: param.receptor,
            fecha: param.fechaCreacion
        }
    }

    static fromApiToDomainEnviados ( param: MensajeriaEnviadosDTO ): MensajeriaEnviados {
        return {
            idMensaje: param.codigoMensajeria,
            idTipoMensaje: param.codigoTipoMensajeria,
            tipoMensaje: param.tipoMensaje,
            asunto: param.asunto,
            mensaje: RemoveHTML.removeHTML( param.contenido),
            rolEmisor: param.rol,
            emisor: param.emisor,
            receptor: param.receptor,
            fecha: param.fechaCreacion
        }
    }


    static fromApiToDomainArchivados ( param: MensajeriaArchivadosDTO ): MensajeriaArchivados {
        return {
            idMensaje: param.codigoMensajeria,
            idTipoMensaje: param.codigoTipoMensajeria,
            tipoMensaje: param.tipoMensaje,
            asunto: param.asunto,
            mensaje: RemoveHTML.removeHTML( param.contenido),
            rolEmisor: param.rol,
            emisor: param.emisor,
            receptor: param.receptor,
            fecha: param.fechaCreacion
        }
    }

    static fromApiToDomainHistorialMensajes( param: MensajeriaHistorialMensajesDTO ): MensajeriaHistorialMensajes {
        return {
            idMensaje: param.codigoMensajeria,
            idTipoMensaje: param.codigoTipoMensajeria,
            tipoMensaje: param.tipoMensaje,
            asunto: param.asunto,
            mensaje: param.contenido,
            archivo: param.archivo,
            rolEmisor: param.rol,
            emisor: param.emisor,
            receptor: param.receptor,
            rolReceptor: param.rolReceptor,
            fecha: param.fechaCreacion
        }
    }

    
}