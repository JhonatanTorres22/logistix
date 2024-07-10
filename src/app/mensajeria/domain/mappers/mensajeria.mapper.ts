import { RolUserId } from "src/app/core/mappers/rolUserId";
import { MensajeriaArchivadosDTO, MensajeriaCerrarArchivarDTO, MensajeriaEnviadosDTO, MensajeriaHistorialMensajesDTO, MensajeriaInsertarDTO, MensajeriaLeerMensajeDTO, MensajeriaNuevoMensajeListDTO, MensajeriaRecibidosDTO, MensajeriaResponderDTO, MensajeriaTipoDTO, MensajeriaTipoGrupoDTO } from "../../infraestructure/dto/mensajeria.dto";
import { MensajeriaArchivados, MensajeriaCerrarArchivar, MensajeriaEnviados, MensajeriaHistorialMensajes, MensajeriaInsertar, MensajeriaLeerMensaje, MensajeriaNuevoMensajeList, MensajeriaRecibidos, MensajeriaResponder } from "../models/mensajeria.model";
import { RemoveHTML } from "src/app/core/mappers/removeHTML";
import { UiSelect } from "src/app/core/components/ui-select/ui-select.interface";

export class MensajeriaMapper {
    static fromDomainToApiInsertar( param: MensajeriaInsertar ): MensajeriaInsertarDTO {
        return {
            codigoTipoMensaje: param.tipoMensaje,
            asunto: param.asunto,
            codigoEmisorRol: param.emisorId,
            codigoReceptorRol: param.receptorId,
            textoMensaje: param.menssage,
            leido: param.leido,
            informacionAdicional: param.informacionAdicional,
            usuario: param.usuarioId
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
            fecha: param.fechaCreacion,
            leido: param.leido
        }
    }

    static fromApiToDomainEnviados ( param: MensajeriaEnviadosDTO ): MensajeriaEnviados {
        return {
            idMensaje: param.codigoMensajeria,
            idTipoMensaje: param.codigoTipoMensajeria,
            tipoMensaje: param.tipoMensaje,
            asunto: param.asunto,
            mensaje: RemoveHTML.removeHTML( param.contenido),
            rolReceptor: param.rol,
            emisor: param.emisor,
            receptor: param.receptor,
            fecha: param.fechaCreacion,
            leido: true
        }
    }


    static fromApiToDomainArchivados ( param: MensajeriaArchivadosDTO ): MensajeriaArchivados {
        return {
            idMensaje: param.codigoMensajeria,
            idTipoMensaje: param.codigoTipoMensajeria,
            tipoMensaje: param.tipoMensaje,
            asunto: param.asunto,
            mensaje: RemoveHTML.removeHTML( param.contenido),
            rolEmisor: param.rolEmisor,
            emisor: param.emisor,
            receptor: param.receptor,
            rolReceptor: param.rolReceptor,
            fecha: param.fechaCreacion,
            archivo: param.archivo,
            leido: true
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
            rolEmisor: param.rolEmisor,
            emisor: param.emisor,
            receptor: param.receptor,
            rolReceptor: param.rolReceptor,
            fecha: param.fechaCreacion,
            leido: param.leido,
            informacionAdicional: param.informacionAdicional,
            idRolEmisor: param.codigoEmisorRol,
            idRolReseptor: param.codigoReceptorRol
        }
    }

    static fromDomainToApiResponder( param: MensajeriaResponder ): MensajeriaResponderDTO {
        return {
            codigoMensajeria: param.idMensaje,
            codigoEmisorRol: param.idRolEmisor,
            codigoReceptorRol: param.idRolReceptor,
            contenido: param.mensaje,
            informacionAdicional: param.informacionAdicional
        }
    }

    static fromDomainToApiLeerMensaje( param: MensajeriaLeerMensaje ): MensajeriaLeerMensajeDTO {
        return {
            codigoMensajeria: param.idMensaje
        }
    }

    static fromDomainToApiCerrarArchivar( param: MensajeriaCerrarArchivar ): MensajeriaCerrarArchivarDTO {
        return {
            codigoMensajeria: param.idMensaje
        }
    }


    static fromApiToDomainNuevoMensajeList( param: MensajeriaNuevoMensajeListDTO ): MensajeriaNuevoMensajeList {
        return {
            idTipoMensajeRol: param.codigoTipoMensajeRol,
            idUsuarioRol: param.codigoUsuarioRol,
            apellidosYnombres: param.apellidosyNombres,
            descripcion: param.descripcion,
            iniciaProceso: param.iniciaProceso,
            cierraProceso: param.cierraProceso,
            responder: param.responder,
            temporalidad: param.temporalidad

        }
    }


    // static fromApiToDomainTipoMensaje( param: MensajeriaTipoDTO ): MensajeriaTipo {
    //     return {
    //         id: param.codigo,
    //         tipo: param.nombre
    //     }
    // }

    static fromApiToDomainTipoMensajeGrupo( param: MensajeriaTipoGrupoDTO ): UiSelect {
        return {
            value: param.codigoTipoMensajeGrupo.toString(),
            text: param.nombre,
            disabled: false
        }
    }

    static fromApiToDomainTipoMensaje( param: MensajeriaTipoDTO ): UiSelect {
        return {
            value: param.codigoTipoMensaje.toString(),
            text: param.nombre,
            disabled: false
        }
    }

    
    
}