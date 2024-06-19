import { UsuarioCrearDTO, UsuarioDTO } from "../../infraestructure/dto/usuario.dto";
import { Usuario, UsuarioCrear } from "../models/usuario.model";



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
                usuario: param.usuario,
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
            usuario: param.usuario,
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
            usuario: param.usuario
     
        }
    }

}
