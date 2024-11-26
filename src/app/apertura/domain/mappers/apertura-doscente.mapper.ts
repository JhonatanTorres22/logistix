import { ListarDocentesDTO } from "../../infraestructure/dto/apertura-docente.dto";
import { ListarDocentes } from "../models/apertura-docente.model";

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
            grado1: param.grado1,
            grado2: param.grado2,
            discapacidad: param.discapacidad,
        }
    }
}