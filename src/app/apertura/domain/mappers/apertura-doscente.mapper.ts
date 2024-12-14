import { AgregarDisponibilidadDocenteDTO, AgregarDocenteDTO, EditarDocenteDTO, EliminarCursoDominioDocenteDTO, EliminarDisponibilidadDocenteDTO, EliminarDocenteDTO, InsertarCursoDominioDocenteDTO, ListarCursosDominioDocenteDTO, ListarDisponibilidadDocenteDTO, ListarDocenteNoAsignadoDTO, ListarDocentesDTO } from "../../infraestructure/dto/apertura-docente.dto";
import { AgregarDisponibilidadDocente, AgregarDocente, EditarDocente, EliminarCursoDominioDocente, EliminarDisponibilidadDocente, EliminarDocente, InsertarCursoDominioDocente, ListarCursosDominioDocente, ListarDisponibilidadDocente, ListarDocenteNoAsignado, ListarDocentes } from "../models/apertura-docente.model";

export class AperturaDocenteMapper {
    static fromApiToDomain ( param : ListarDocentesDTO ) : ListarDocentes {
        return{
            idDocente: param.codigoDocente,
            nombreApellido: param.nombreyApellido,
            fechaNacimiento: param.fechaDeNacimiento,
            tipoDeDocumento: param.tipoDocumento,
            numeroDocumento: param.nDocumento,
            correoPersona: param.cPersonal,
            correoInstitucional: param.cInstitucional,
            numeroCelular: param.celular,
            sexo: param.sexo,
            idSemestre: param.codigoSemestre,
            nombreSemestre: param.semestre,
            idLocal: param.codigoLocal,
            nombreLocal: param.local,
            codigoInterno: param.codigoInterno,
            primerGrado: param.grado1,
            segundoGrado: param.grado2,
            discapacidad: param.discapacidad,
        }
    }

    static formDomainToApiEditarDocente( param: EditarDocente): EditarDocenteDTO {
        return{
            codigoDocente: param.idDocente,
            codigoInterno: param.codigoInterno,
            discapacidad: param.discapacidad,
            grado1: param.primerGrado,
            grado2: param.segundoGrado,
            usuario: param.idUsuario
        }
    }

    static fromDomainToApiEliminarDocente (param: EliminarDocente): EliminarDocenteDTO {
        return {
            codigoDocente: param.idDocente,
            usuario: param.idUsuario
        }
    }

    static fromDomainToApiAgregarDocente (param: AgregarDocente): AgregarDocenteDTO {
        return {
            codigoInterno: param.codigoInterno,
            codigoLocal: param.idLocal,
            codigoSemestre: param.idSemestre,
            codigoUsuarioRol: param.idUsuarioRol,
            discapacidad: param.discapacidad,
            grado1: param.primerGrado,
            grado2: param.segundoGrado,
            usuario: param.idUsuario
        }
    }
    static fromApiToDomainCursoDominioDocente(param: ListarCursosDominioDocenteDTO): ListarCursosDominioDocente{
        return{
            idCursoDominio: param.codigoCursoDominio,
            idDocente: param.codigoDocente,
            ApNomDocente: param.apelidosyNombresDocente,
            nombreCurso: param.nombreCurso,
            idAperturaCurso: param.codigoAperturaCurso,
        }
    }
    static fromDomainToApiInsertarCursoDominioDocente(param : InsertarCursoDominioDocente): InsertarCursoDominioDocenteDTO {
        return {
            codigoAperturaCurso: param.idAperturaCurso,
            codigoDocente: param.idDocente,
            usuario: param.idUsuario
        }
    }

    static fromDomainToApiEliminarCursoDominioDocente ( param: EliminarCursoDominioDocente ) : EliminarCursoDominioDocenteDTO{
        return {
            codigoCursoDominio: param.idCursoDominio,
            usuario: param.idUsuario
        }
    }

    /* DISPONIBILIDAD DOCENTE */
    static fromApiToDomainDisponibilidadDocente (param: ListarDisponibilidadDocenteDTO): ListarDisponibilidadDocente {
        return {
            idDia: param.codigoDia,
            nombreDia: param.dia,
            idHora: param.codigoTiempo,
            horaFin: param.tiempoFin,
            horaInicio: param.tiempoInicio,
            idProgramaAcademico: param.codigoProgramaAcademico,
            idLocal: param.codigoLocal
        }
    }

    static fromDomainToApiAgregarDisponibilidad (param: AgregarDisponibilidadDocente): AgregarDisponibilidadDocenteDTO {
        return {
            codigoDia: param.idDia,
            codigoDocente: param.idDocente,
            codigoTiempo: param.idHora,
            usuario: param.idUsuario,
            codigoProgramaAcademico: param.idProgramaAcademico,
            codigoLocal: param.idLocal
        }
    }
    static fromDomainToApiEliminarDisponibilidad(param: EliminarDisponibilidadDocente): EliminarDisponibilidadDocenteDTO {
        return {
            codigoDia: param.idDia,
            codigoDocente: param.idDocente,
            codigoTiempo: param. idHora,
            usuario: param.idUsuario
        }
    }

    static fromApiToDomainDocenteNoAsignado ( param : ListarDocenteNoAsignadoDTO): ListarDocenteNoAsignado {
        return {
            idUsuarioRol: param.codigoUsuarioRol,
            nombreAp: param.nombreyApellido,
            numeroDocumento: param.nDocumento
        }
    }
}