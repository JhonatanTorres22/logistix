import { UsuarioRolAgregarDTO, UsuarioRolAltaDTO, UsuarioRolDTO, UsuarioRolEliminarDTO, UsuarioRolSuspenderDTO } from "../../infraestructure/dto/usuario-rol.dto";
import { UsuarioRol, UsuarioRolAgregar, UsuarioRolAlta, UsuarioRolEliminar, UsuarioRolSuspender } from "../models/usuario-rol.model";

export class UsuarioRolMapper {
    static fromDomainToApi( param: UsuarioRol ): UsuarioRolDTO {
        return {
            codigo: param.id,
            apellidosyNombres: param.usuario,
            estadoAlta: param.alta,
            condicion: param.estado,
            nombre: param.rol
        }
    }

    static fromApiToDomain( param: UsuarioRolDTO ): UsuarioRol {
        return {
            id: param.codigo,
            usuario: param.apellidosyNombres,
            alta: param.estadoAlta,
            estado: param.condicion,
            rol: param.nombre
        }
    }

    static fromDomainToApiAgregarRolUser( param: UsuarioRolAgregar ): UsuarioRolAgregarDTO  {

        return {
            codigoRol: param.idRol,
            codigoUsuario: param.idUsuario,
            usuario: param.usuarioId
            
        }

    }

    static fromDomainToApiSuspenderRolUser( param: UsuarioRolSuspender ): UsuarioRolSuspenderDTO {
        return {
            codigo: param.idRol,
            usuario: param.usuarioId
        }
    }


    static fromDomainToApiEliminarRol( param: UsuarioRolEliminar ): UsuarioRolEliminarDTO {
        return {
            codigo: param.idRol,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiDarAltaRol( param: UsuarioRolAlta ): UsuarioRolAltaDTO {
        return {
            codigo: param.idRol,
            usuario: param.usuarioId
        }
    }


}