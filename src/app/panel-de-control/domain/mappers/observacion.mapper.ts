import { ObservacionInsertDTO, ObservacionListarDTO } from "../../infraestructure/dto/observacion.dto";
import { ObservacionInsert, ObservacionListar } from "../models/obserbacion.model";


export class ObservacionMapper {
    static fromDomainToApiInsert( param: ObservacionInsert ): ObservacionInsertDTO {
        return {
            codigoMensajeria: param.mensajeId,
            codigoObservacionSubCategoria: param.subCategoriaId,
            detalleObservacion: param.mensaje,
            usuarioObservacion: param.userId
        }
    }

    static fromApiToDomainListar( param: ObservacionListarDTO ): ObservacionListar {
        return {
            categoriaNombre: param.denominacionCategoria,
            fechaObservacion: param.fechaObservacion,
            id: param.codigoObservacion,
            mensaje: param.detalleObservacion,
            mensajeId: param.codigoMensajeria,
            subCategoriaNombre: param.denominacionSubCategoria,
            ticket: param.numeroTicket
        
        }
    }
}