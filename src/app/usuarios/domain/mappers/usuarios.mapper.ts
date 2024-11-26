import { AuthDomainService } from "src/app/auth/domain/services/auth-domain.service";
import { UsuarioCrearDTO, UsuarioCrearMaivoDTO, UsuarioDTO } from "../../infraestructure/dto/usuario.dto";
import { Usuario, UsuarioCrear, UsuarioCrearMasivo } from "../models/usuario.model";
import { UsuarioRol } from "../models/usuario-rol.model";
import { WritableSignal } from "@angular/core";
import { Rol } from "src/app/roles/domain/models/rol.model";
import { RolUserId } from "src/app/core/mappers/rolUserId";



export class UsuarioMapper {


    static formApiToDomain( param: UsuarioDTO ): Usuario {
            return {
                nombres: param.nombres,
                apellidoPaterno: param.apPaterno,
                apellidoMaterno: param.apMaterno,
                tipoDocumento: param.documento,
                numeroDocumento: param.nDocumento,
                sexo: param.sexo,
                fechaNacimiento: param.fechaDeNac,
                correoPersonal: param.correoPersonal,
                correoInstitucional: param.correoInstitucional,
                celular: param.nCelular,
                imagenPerfil: param.foto,
                usuarioId: param.usuario,
                id: param.codigo
            }
    }

    static formDomainToApi ( param: Usuario ): UsuarioDTO {

        return {
            nombres: param.nombres,
            apPaterno: param.apellidoPaterno,
            apMaterno: param.apellidoMaterno,
            documento: param.tipoDocumento,
            nDocumento: param.numeroDocumento,
            sexo: param.sexo,
            fechaDeNac: param.fechaNacimiento,
            correoPersonal: param.correoPersonal,
            correoInstitucional: param.correoInstitucional,
            nCelular: param.celular,
            foto: param.imagenPerfil,
            usuario: param.usuarioId,
            codigo: param.id
        }
    }

    static formDomainToApiCrear ( param: UsuarioCrear ): UsuarioCrearDTO {
        return {
            nombres: param.nombres,
            apPaterno: param.apellidoPaterno,
            apMaterno: param.apellidoMaterno,
            documento: param.tipoDocumento,
            nDocumento: param.numeroDocumento,
            sexo: param.sexo,
            fechaDeNac: param.fechaNacimiento,
            correoPersonal: param.correoPersonal,
            correoInstitucional: param.correoInstitucional,
            nCelular: param.celular,
            foto: param.imagenPerfil,
            usuario: param.usuarioId
     
        }
    }

    static fromDomainToApiCrearMasivo ( param : UsuarioCrearMasivo ) : UsuarioCrearMaivoDTO {
        return {
            nombres : param.nombres,
            apPaterno : param.apellidoPaterno,
            apMaterno: param.apellidoMaterno,
            sexo: param.sexo,
            correoInstitucional: param.correoInstitucional,
            correoPersonal: param.correoPersonal,
            fechaDeNac: param.fechaNacimiento,
            codigoRol: param.idRol,
            documento: param.tipoDocumento,
            nDocumento: param.numeroDocumento,
            foto: param.imagenPerfil,
            nCelular: param.celular,
            usuario: param.usuarioId

        }
    }

}
