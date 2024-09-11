import { ObservacionDTO, ObservacionInsertDTO, ObservacionPendienteDTO } from "../../infraestructure/dto/observacion.dto";
import { Observacion, ObservacionInsert, ObservacionPendiente } from "../models/obserbacion.model";


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
            estado: 'Pendiente',
            rol: param.nombreRol,
            usuario: param.nombreUsuario,
            ticket: param.numeroTicket
        
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
            estado: 'Pendiente',
            usuario: param.nombreUsuario
        }
    }
}