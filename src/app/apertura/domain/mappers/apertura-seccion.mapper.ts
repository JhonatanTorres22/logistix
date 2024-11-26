import { AgregarSeccionDTO, AgregarTipoAmbienteASeccionDTO, EditarSeccionDTO, EliminarSeccionDTO, EliminarTipoAmbienteDTO, ListarAmbienteSeccionDTO, ListarFormatoDTO, ListarSeccionesDTO, ListarTipoAmbienteDTO } from "../../infraestructure/dto/apertura-seccion.dto";
import { AgregarSeccion, AgregarTipoAmbienteASeccion, EditarSeccion, EliminarSeccion, EliminarTipoAmbiente, ListarTipoAmbienteSeccion, ListarFormato, ListarSecciones, ListarTipoAmbiente } from "../models/apertura-seccion.model";

export class AperturaSeccionMapper {
    static fromApiToDomain( param: ListarSeccionesDTO ): ListarSecciones {
        const listarAmbienteSeccion = param.ambiente.map(AperturaSeccionMapper.fromApiToDomainAmbienteSeccion)
        return {
            idAperturaSeccion: param.codigoAperturaSeccion,
            nombreSeccion: param.seccion,
            discapacidad: param.discapacidad,
            nVacantes: param.vacantes,
            detalleObservacion: param.observacion,
            ambiente: listarAmbienteSeccion
        }
    }

    static fromApiToDomainAmbienteSeccion ( param:  ListarAmbienteSeccionDTO) : ListarTipoAmbienteSeccion {
        return{
            idTipoAmbiente: param.codigoAmbienteTipo,
            cantidadGrupos: param.nGrupos,
            nombreFormato: param.nombreFormato,
            nombreTipoAmbiente: param.nombreAmbienteTipo

        }
    }

    static fromDomainToApiAgregarSeccion( param: AgregarSeccion): AgregarSeccionDTO {
        return {
            codigoAperturaCurso: param.idAperturaCurso,
            seccion: param.nombreSeccion,
            discapacidad: param.discapacidad,
            observacion: param.detalleObservacion,
            vacantes: param.nVacantes,
            codigoAmbienteTipo: param.idTipoAmbiente,
            nGrupos: param.nGrupos
        }
    }

    static fromDomainToApiAgregarTipoAmbiente ( param : AgregarTipoAmbienteASeccion ) : AgregarTipoAmbienteASeccionDTO {
        return{
            codigoAperturaSeccion: param.idAperturaSeccion,
            codigoAmbienteTipo: param.idTipoAmbiente,
            nGrupos: param.cantidadGrupos
        }
    }
    
    static fromApiToDomainFormato( param : ListarFormatoDTO): ListarFormato {
        return {
            idFormato: param.codigoFormato,
            nombreFormato: param.nombre,
            descripcionFormato: param.descripcion
        }
    }

    static fromApiToDomainTipoAmbiente ( param: ListarTipoAmbienteDTO) : ListarTipoAmbiente {
        return {
            idTipoAmbiente: param.codigoAmbienteTipo,
            nombreTipoAmbiente: param.nombre,
            descripcionTipoAmbiente: param.descripcion,
            grupo:param.grupo
        }
    }

    static fromDomainToApiEditarSeccion ( param: EditarSeccion ): EditarSeccionDTO {
        return {
            codigoAperturaSeccion: param.idAperturaSeccion,
            discapacidad: param.discapacidad,
            observacion: param.detalleObservacion,
            vacantes: param.nVacantes,
            usuario: param.idUsuario
        }
    }

    static formDomainToApiEliminarSeccion ( param: EliminarSeccion ) : EliminarSeccionDTO {
        return {
            codigoAperturaSeccion: param.idAperturaSeccion,
            usuario: param.idUsuario
        }
    }
    static formDomainToApiEliminarTipoAmbiente ( param: EliminarTipoAmbiente ) : EliminarTipoAmbienteDTO {
        return {
            codigoAperturaSeccion: param.idAperturaSeccion,
            codigoAmbienteTipo: param.idTipoAmbiente
        }
    }


}