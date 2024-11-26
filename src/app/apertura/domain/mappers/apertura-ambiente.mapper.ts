import { EditarAmbienteDTO, EliminarAmbienteDTO, InsertarAmbienteDTO, ListarAmbientesDTO } from "../../infraestructure/dto/apertura-ambiente.dto";
import { EditarAmbiente, EliminarAmbiente, InsertarAmbiente, ListarAmbientes } from "../models/apertura-ambiente.model";


export class AperturaAmbienteMapper {
    static fromApiToDomain( param : ListarAmbientesDTO ) : ListarAmbientes {
        return{
            idAmbiente: param.codigoAmbiente,
            nombreAmbiente: param.nombre,
            nombrePabellon: param.pabellon,
            nivelAmbiente: param.nivel,
            aforo: param.aforo,
            discapacidad: param.discapacidad,
            local: param.local,
            tipoDeAmbiente: param.tipoAmbiente
        }
    }

    static fromDomainToApiInsertarAmbiente ( param : InsertarAmbiente ): InsertarAmbienteDTO {
        return {
            codigoSemestre: param.idSemestre,
            codigoLocal: param.idLocal,
            codigoTipoAmbiente: param.idTipoAmbiente,
            nombre: param.nombreAmbiente,
            pabellon: param.nombrePabellon,
            nivel: param.nivelAmbiente,
            aforo: param.aforo,
            discapacidad: param.discapacidad,
            usuario: param.idUsuario
        }
    }

    static fromDomainToApiEditarAmbiente( param : EditarAmbiente ) : EditarAmbienteDTO {
        return {
            codigoAmbiente: param.idAmbiente,
            nombre: param.nombreAmbiente,
            pabellon: param.nombrePabellon,
            discapacidad: param.discapacidad,
            nivel: param.nivelAmbiente,
            aforo: param.aforo,
            usuario: param.idUsuario
        }
    }

    static fromDomainToApiEliminarAmbiente ( param : EliminarAmbiente ): EliminarAmbienteDTO {
        return {
            codigoAmbiente: param.idAmbiente,
            usuario: param.idUsuario
        }
    }
}