import { RolUserId } from "src/app/core/mappers/rolUserId";
import { CursoCrearDTO, CursoDTO, CursoEditarDTO, CursoEliminarDTO } from "../../infraestructure/dto/curso.dto";
import { Curso, CursoCrear, CursoEliminar } from "../models/curso.model";

export class CursoMapper {
    static fromApiToDomain( param: CursoDTO ): Curso {
        return {
            id: param.id,
            programa: param.programa,
            ciclo: param.ciclo,
            codigoCurso: param.codigoCurso,
            nombreCurso: param.nombreCurso,
            tipoEstudio: param.tipoEstudio,
            tipoCurso: param.tipoCurso,
            competencia: param.competencia,
            horasTeoricas: param.horasTeoricas,
            horasPracticas: param.horasPracticas,
            totalHoras: param.totalHoras,
            totalCreditos: param.totalCreditos,
            preRequisito: param.preRequisito
        }
    }

    static fromDomainToApiAgregar( param: CursoCrear ): CursoCrearDTO {
        return {
            programa: param.programa,
            ciclo: param.ciclo,
            codigoCurso: param.codigoCurso,
            nombreCurso: param.nombreCurso,
            tipoEstudio: param.tipoEstudio,
            tipoCurso: param.tipoCurso,
            competencia: param.competencia,
            horasTeoricas: param.horasTeoricas,
            horasPracticas: param.horasPracticas,
            totalHoras: param.totalHoras,
            totalCreditos: param.totalCreditos,
            preRequisito: param.preRequisito,
            usuario: RolUserId.currentIdRolUser
        
        }
    }

    static fromDomainToApiEditar( param: Curso ): CursoEditarDTO {
        return {
            id: param.id,
            programa: param.programa,
            ciclo: param.ciclo,
            codigoCurso: param.codigoCurso,
            nombreCurso: param.nombreCurso,
            tipoEstudio: param.tipoEstudio,
            tipoCurso: param.tipoCurso,
            competencia: param.competencia,
            horasTeoricas: param.horasTeoricas,
            horasPracticas: param.horasPracticas,
            totalHoras: param.totalHoras,
            totalCreditos: param.totalCreditos,
            preRequisito: param.preRequisito,
            usuario: RolUserId.currentIdRolUser
        }
    }

    static formDomainToApiEliminar( param: CursoEliminar ): CursoEliminarDTO {
        return {
            id: param.id,
            usuario: RolUserId.currentIdRolUser
        }
    }
}