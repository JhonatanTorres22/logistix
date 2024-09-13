import { ObservacionConfirmarDTO, ObservacionDTO, ObservacionInsertDTO, ObservacionPendienteDTO, ObservacionResolverDTO } from "../../infraestructure/dto/observacion.dto";
import { Observacion, ObservacionConfirmar, ObservacionInsert, ObservacionPendiente, ObservacionResolver } from "../models/obserbacion.model";


export class ObservacionMapper {
    static fromDomainToApiInsert( param: ObservacionInsert ): ObservacionInsertDTO {
        return {
            codigoMensajeria: param.mensajeId,
            codigoObservacionSubCategoria: param.subCategoriaId,
            detalleObservacion: param.mensaje,
            usuarioObservacion: param.userId
        }
    }

    static fromApiToDomainListar( param: ObservacionDTO ): Observacion {
        return {
            categoriaNombre: param.denominacionCategoria,
            fechaObservacion: param.fechaObservacion,
            id: param.codigoObservacion,
            mensaje: param.detalleObservacion,
            mensajeId: param.codigoMensajeria,
            subCategoriaNombre: param.denominacionSubCategoria,
            estado: param.detalleResuelto == null ? 'pendiente' : 'proceso',
            rol: param.nombreRol,
            usuario: param.nombreUsuario,
            ticket: param.numeroTicket,
            fechaResuelto: param.fechaResuelto,
            mensajeResuelto: param.detalleResuelto
        
        }
    }

    static fromApiToDomainListarPendiente( param: ObservacionPendienteDTO ): ObservacionPendiente {
        return {
            categoriaNombre: param.denominacionCategoria,
            fechaObservacion: param.fechaObservacion,
            id: param.codigoObservacion,
            mensaje: param.detalleObservacion,
            mensajeId: param.codigoMensajeria,
            rol: param.nombreRol,
            subCategoriaNombre: param.denominacionSubCategoria,
            ticket: param.numeroTicket,
            estado: param.detalleResuelto == null ? 'pendiente' : 'proceso',
            usuario: param.nombreUsuario,
            fechaResuelto: param.fechaResuelto,
            mensajeResuelto: param.detalleResuelto
        }
    }

    static fromToDomainToApiResolver( param: ObservacionResolver ): ObservacionResolverDTO {
        return {
            codigoObservacion: param.id,
            descripcion: param.mensajeRespuesta,
            usuario: param.userId
        }
    }
    
    static fromDomainToApiConfirmar( param: ObservacionConfirmar ): ObservacionConfirmarDTO {
        return {
            codigoObservacion: param.id,
            descripcion: param.mensajeRespuesta,
            usuario: param.userId,
            puntuacion: param.puntuacion
        }
    }

}