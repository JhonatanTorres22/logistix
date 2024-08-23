import { RolUserId } from "src/app/core/mappers/rolUserId";
import { CursoCrearDTO, CursoDTO, CursoEditarDTO, CursoEliminarDTO } from "../../infraestructure/dto/curso.dto";
import { Curso, CursoByCiclo, CursoCrear, CursoEditar, CursoEliminar } from "../models/curso.model";

export class CursoMapper {
    static fromApiToDomain( param: CursoDTO ): Curso {
        return {
            id: param.codigoCurso,
            idPrograma: param.codigoProgramaAcademico,
            idCiclo: param.codigoCiclo,
            codigoCurso: param.codigoInterno,
            nombreCurso: param.nombre,
            tipoEstudio: param.tipoDeEstudio,
            tipoCurso: param.tipoDeCurso,
            competencia: param.competencia,
            horasTeoricas: param.ht,
            horasPracticas: param.hp,
            totalHoras: param.tHoras,
            totalCreditos: param.tCreditos,
            preRequisito: param.prerequisito,
            descripcion: param.descripcion
        }
    }

    static fromApiToDomainByCiclo( param: Curso[] ) {

        const cursoByCiclo = param.reduce( ( a, b) => a.idCiclo == b.idCiclo ? a : b )

        // console.log();
        
       
    }

    static fromDomainToApiAgregar( param: CursoCrear ): CursoCrearDTO {
        return {

            codigoProgramaAcademico: param.idPrograma,
            codigoCiclo: param.idCiclo,
            codigoInterno: param.codigoCurso,
            nombre: param.nombreCurso,
            descripcion: param.descripcion,
            tipoDeEstudio: param.tipoEstudio,
            tipoDeCurso: param.tipoCurso,
            competencia: param.competencia,
            ht: param.horasTeoricas,
            hp: param.horasPracticas,
            tHoras: param.totalHoras,
            tCreditos: param.totalCreditos,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiEditar( param: CursoEditar ): CursoEditarDTO {
        return {
            codigoCurso: param.id,
            codigoProgramaAcademico: param.idPrograma,
            // codigoCiclo: param.idCiclo,
            codigoInterno: param.codigoCurso,
            nombre: param.nombreCurso,
            descripcion: param.descripcion,
            tipoDeEstudio: param.tipoEstudio,
            tipoDeCurso: param.tipoCurso,
            competencia: param.competencia,
            ht: param.horasTeoricas,
            hp: param.horasPracticas,
            tHoras: param.totalHoras,
            tCreditos: param.totalCreditos,
            usuario: param.usuarioId
        }
    }

    static formDomainToApiEliminar( param: CursoEliminar ): CursoEliminarDTO {
        return {
            codigoCurso: param.id,
            usuario: param.usuarioId
        }
    }
}