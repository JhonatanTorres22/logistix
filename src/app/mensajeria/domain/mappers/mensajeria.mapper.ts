import { RolUserId } from "src/app/core/mappers/rolUserId";
import {
    MensajeriaArchivadosDTO,
    MensajeriaCerrarArchivarDTO,
    MensajeriaEnviadosDTO,
    MensajeriaEnviarNuevoMensajeDTO,
     MensajeriaForzarCierreDTO,
     MensajeriaHistorialMensajesDTO,
     MensajeriaInsertarDTO,
     MensajeriaLeerMensajeDTO,
     MensajeriaNuevoMensajeListDTO,
     MensajeriaRecibidosDTO,
     MensajeriaResponderAListDTO,
     MensajeriaResponderAltaDTO,
     MensajeriaResponderDTO,
     MensajeriaTimeLineDTO,
     MensajeriaTipoDTO,
     MensajeriaTipoGrupoDTO } from "../../infraestructure/dto/mensajeria.dto";
import { 
    MensajeriaArchivados,
    MensajeriaCerrarArchivar,
    MensajeriaEnviados,
    MensajeriaEnviarNuevoMensaje,
    MensajeriaForzarCierre,
    MensajeriaHistorialMensajes,
    MensajeriaInsertar,
    MensajeriaLeerMensaje,
    MensajeriaNuevoMensajeList,
    MensajeriaRecibidos,
    // MensajeriaResponder,
    MensajeriaResponderAList, 
    MensajeriaResponderAlta,
    MensajeriaTimeLine} from "../models/mensajeria.model";
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
            nombreTipoMensaje: param.nombreTipoMensaje,
            nombreTipoMensajeGrupo: param.nombreTipoMensajeGrupo,
            asunto: param.asunto,
            mensaje: RemoveHTML.removeHTML( param.contenido),
            rolEmisor: param.rol,
            emisor: param.emisor,
            receptor: param.receptor,
            fecha: param.fechaCreacion,
            fechaVencimiento: param.fechaVencimiento,
            leido: param.leido
        }
    }

    static fromApiToDomainEnviados ( param: MensajeriaEnviadosDTO ): MensajeriaEnviados {
        return {
            idMensaje: param.codigoMensajeria,
            nombreTipoMensaje: param.nombreTipoMensaje,
            nombreTipoMensajeGrupo: param.nombreTipoMensajeGrupo,
            asunto: param.asunto,
            mensaje: RemoveHTML.removeHTML( param.contenido),
            rolReceptor: param.rol,
            emisor: param.emisor,
            receptor: param.receptor,
            fecha: param.fechaCreacion,
            fechaVencimiento: param.fechaVencimiento,
            leido: true
        }
    }


    static fromApiToDomainArchivados ( param: MensajeriaArchivadosDTO ): MensajeriaArchivados {
        return {
            idMensaje: param.codigoMensajeria,
            nombreTipoMensaje: param.nombreTipoMensaje,
            nombreTipoMensajeGrupo: param.nombreTipoMensajeGrupo,
            asunto: param.asunto,
            mensaje: RemoveHTML.removeHTML( param.contenido),
            rolEmisor: param.rol,
            emisor: param.emisor,
            receptor: param.receptor,
            // rolReceptor: param.rolReceptor,
            fecha: param.fechaCreacion,
            fechaVencimiento: param.fechaVencimiento,
            // archivo: param.archivo,
            leido: true,
            fechaCierre: param.fechaCierre,
            usuarioCierre: param.usuarioCierre
        }
    }

    static fromApiToDomainHistorialMensajes( param: MensajeriaHistorialMensajesDTO ): MensajeriaHistorialMensajes {
        return {
            idMensaje: param.codigoMensajeria,
            asunto: param.asunto,
            mensaje: param.contenido,
            archivo: param.archivo,
            rolEmisor: param.rolEmisor,
            emisor: param.emisor,
            receptor: param.receptor,
            rolReceptor: param.rolReceptor,
            fecha: param.fechaCreacion,
            informacionAdicional: param.informacionAdicional,

        }
    }

    // static fromDomainToApiResponder( param: MensajeriaResponder ): MensajeriaResponderDTO {
    //     return {
    //         codigoMensajeria: param.idMensaje,
    //         codigoEmisorRol: param.idRolEmisor,
    //         codigoReceptorRol: param.idRolReceptor,
    //         contenido: param.mensaje,
    //         informacionAdicional: param.informacionAdicional
    //     }
    // }

    static fromDomainToApiLeerMensaje( param: MensajeriaLeerMensaje ): MensajeriaLeerMensajeDTO {
        return {
            codigoMensajeria: param.idMensaje
        }
    }

    static fromDomainToApiCerrarArchivar( param: MensajeriaCerrarArchivar ): MensajeriaCerrarArchivarDTO {
        return {
            codigoMensajeria: param.idMensaje,
            usuario: param.usuarioId
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
            flujoNavegacion: param.flujoNavegacion,
            temporalidad: param.temporalidad

        }
    }

    static fromDomainToSelectUi( param: MensajeriaNuevoMensajeListDTO): UiSelect & { data: MensajeriaNuevoMensajeList } {
        return {
            value: param.codigoUsuarioRol.toString(),
            text: param.apellidosyNombres,
            disabled: false,
            data: {
                apellidosYnombres: param.apellidosyNombres,
                cierraProceso: param.cierraProceso,
                descripcion: param.descripcion,
                flujoNavegacion: param.flujoNavegacion,
                idTipoMensajeRol: param.codigoTipoMensajeRol,
                idUsuarioRol: param.codigoUsuarioRol,
                iniciaProceso: param.iniciaProceso,
                temporalidad: param.temporalidad
            }
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

    static fromDomainToApiNuevoMensaje( param: MensajeriaEnviarNuevoMensaje ): MensajeriaEnviarNuevoMensajeDTO {
        return {
            asunto: param.asunto,
            codigoEmisorRol: param.idRolEmisor,
            codigoReceptorRol: param.idRolReceptor,
            codigoTipoMensajeRol: param.idTipoMensajeRol,
            flujoNavegacion: param.flujoNavegacion,
            informacionAdicional: param.informacionAdicional,
            textoMensaje: param.mensaje,
            usuario: param.usuarioId
        }
    }
    

    static fromApiToDomainResponderAList( param: MensajeriaResponderAListDTO ): MensajeriaResponderAList {
        return {
            apellidosYnombres: param.apellidosyNombres,
            cierraProceso: param.cierraProceso,
            descripcion: param.descripcion,
            flujoNavegacion: param.flujoNavegacion,
            idTipoMensajeRol: param.codigoTipoMensajeRol,
            idUsuarioRol: param.codigoUsuarioRol,
            iniciaProceso: param.iniciaProceso,
            temporalidad: param.temporalidad,
            idMensaje: param.codigoMensajeria
        }
    }


    static fromDomainToApiResponderAlta( param: MensajeriaResponderAlta ): MensajeriaResponderAltaDTO {
        return {
            codigoMensajeria: param.idMensaje,
            codigoTipoMensajeRol: param.idTipoMensajeRol,
            codigoEmisorRol: param.idRolEmisor,
            codigoReceptorRol: param.idRolReceptor,
            contenido: param.mensaje,
            informacionAdicional: param.informacionAdicional,
            Archivo: param.archivo
        }
    }

    static fromDomainToApiCierreForzado( param: MensajeriaForzarCierre ): MensajeriaForzarCierreDTO {
        return {
            codigoMensajeria: param.idMensaje,
            usuario: param.usuarioId
        }
    }

    static fromApiToDomainTimeLine( param: MensajeriaTimeLineDTO, nMensajes: number, orden: number ): MensajeriaTimeLine {

        console.log( param );
        

        return {
            emisor: param.emisor,
            fechaCreacion: param.fechaCreacion,
            fechaVencimiento: param.fechaVencimiento,
            nHitos: param.hitos.length,
            nMensajes: nMensajes,
            orden: orden,
            receptor: param.receptor
        }
    }
}