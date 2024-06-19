import { SemestreAcademicoAperturarDTO, SemestreAcademicoCerrarDTO, SemestreAcademicoCrearDTO, SemestreAcademicoDTO, SemestreAcademicoEliminarDTO } from '../../infraestructure/dto/semestre-academico.dto';
import { SemestreAcademico, SemestreAcademicoAperturar, SemestreAcademicoCerrar, SemestreAcademicoCrear, SemestreAcademicoEliminar } from "../models/semestre-academico.model";


export class SemestreAcademicoMapper {
    static formApiToDomain( param: SemestreAcademicoDTO): SemestreAcademico {
        return {
            id: param.codigo,
            codigo: param.nombre,
            nombre: param.definicion,
            // fechaInicio: param.fechaDeInicio,
            // fechaFin: param.fechaDeFin,
            // estado: param.estado,
            condicion: param.condicion,
            usuarioId: param.usuario
        }
    }

    static formDomainToApi( param: SemestreAcademico ): SemestreAcademicoDTO {
        return {
            codigo: param.id,
            nombre: param.codigo,
            definicion: param.nombre,
            // fechaDeInicio: param.fechaInicio,
            // fechaDeFin: param.fechaFin,
            // estado: param.estado,
            condicion: param.condicion,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiCrear( param: SemestreAcademicoCrear ): SemestreAcademicoCrearDTO {
        return {
            nombre: param.codigo,
            definicion: param.nombre,
            // fechaDeInicio: param.fechaInicio,
            // fechaDeFin: param.fechaFin,
            // estado: param.estado,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiEliminar( param: SemestreAcademicoEliminar ): SemestreAcademicoEliminarDTO {
        return {
            codigo: param.id,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiAperturar( param: SemestreAcademicoAperturar ): SemestreAcademicoAperturarDTO {
        return {
            codigo: param.id,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiCerrar( param: SemestreAcademicoCerrar ): SemestreAcademicoCerrarDTO {
        return {
            codigo: param.id,
            usuario: param.usuarioId
        }
    }
}