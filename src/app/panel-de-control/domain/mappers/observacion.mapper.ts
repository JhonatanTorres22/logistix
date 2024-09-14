import { ObservacionConfirmarDTO, ObservacionConformeDTO, ObservacionDTO, ObservacionInsertDTO, ObservacionPendienteDTO, ObservacionResolverDTO } from "../../infraestructure/dto/observacion.dto";
import { HistorialMensaje, Observacion, ObservacionBase, ObservacionConfirmar, ObservacionConforme, ObservacionInsert, ObservacionPendiente, ObservacionResolver } from "../models/obserbacion.model";


export class ObservacionMapper {
    static fromDomainToApiInsert( param: ObservacionInsert ): ObservacionInsertDTO {
        return {
            codigoMensajeria: param.mensajeId,
            codigoObservacionSubCategoria: param.subCategoriaId,
            detalleObservacion: param.mensaje,
            usuarioObservacion: param.userId
        }
    }

    static fromApiToDomainListar( param: ObservacionDTO ): ObservacionBase {

        // const historial: HistorialMensaje[] = param.detalleResuelto == null ? [] : JSON.parse(param.detalleResuelto);

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
            mensajeResuelto: param.detalleResuelto,
            historial: [],
            fechaConforme: param.fechaConforme
        
        }
    }

    static fromApiToDomainListarPendiente( param: ObservacionPendienteDTO ): ObservacionPendiente {
        // console.log( param.detalleResuelto.substring(0,1) );
        
        const historial: HistorialMensaje[] = param.detalleResuelto == null ? [] : param.detalleResuelto.substring(0,1) == '[' ? JSON.parse(param.detalleResuelto)[0].historial : [];
        const mensaje: string = param.detalleResuelto == null ? '' : param.detalleResuelto.substring(0,1) == '[' ? JSON.parse(param.detalleResuelto)[0].mensaje : param.detalleResuelto;
        return {
            categoriaNombre: param.denominacionCategoria,
            fechaObservacion: param.fechaObservacion,
            id: param.codigoObservacion,
            mensaje: param.detalleObservacion,
            mensajeId: param.codigoMensajeria,
            rol: param.nombreRol,
            subCategoriaNombre: param.denominacionSubCategoria,
            ticket: param.numeroTicket,
            estado: param.detalleResuelto == null ? 'Pendiente' : 'Proceso',
            usuario: param.nombreUsuario,
            fechaResuelto: param.fechaResuelto,
            mensajeResuelto: mensaje,
            historial: historial.length == 0 ? [] : historial,
            fechaConforme: ''
        }
    }

    static fromToDomainToApiResolver( param: ObservacionResolver ): ObservacionResolverDTO {

        // const historial: HistorialMensaje[] = param.historial == null ? [] : param.historial;
        const mensaje = JSON.stringify([{historial: param.historial, mensaje: param.mensajeRespuesta}]);

        return {
            codigoObservacion: param.id,
            descripcion: mensaje,
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

    static fromApiToDomainListarConforme( param: ObservacionConformeDTO ): ObservacionConforme {
        // const historial: HistorialMensaje[] = param.detalleResuelto == null ? [] : JSON.parse(param.detalleResuelto);

        return {
            categoriaNombre: param.denominacionCategoria,
            fechaObservacion: param.fechaObservacion,
            id: param.codigoObservacion,
            mensaje: param.detalleObservacion,
            mensajeId: param.codigoMensajeria,
            rol: param.nombreRol,
            subCategoriaNombre: param.denominacionSubCategoria,
            ticket: param.numeroTicket,
            estado: 'Conforme',
            usuario: param.nombreUsuario,
            fechaConforme: param.fechaConforme,
            fechaResuelto: param.fechaResuelto,
            mensajeResuelto: param.detalleResuelto,
            historial: [],


        }
    }
}