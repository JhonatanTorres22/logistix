import { RolUserId } from "src/app/core/mappers/rolUserId";
import { CursoCrearDTO, CursoDTO, CursoEditarDTO, CursoEliminarDTO } from "../../infraestructure/dto/curso.dto";
import { Curso, CursoByCiclo, CursoCrear, CursoEditar, CursoEliminar } from "../models/curso.model";

export class CursoMapper {
    static fromApiToDomain( param: CursoDTO ): Curso {
        return {
            id: param.id,
            programa: param.programa,
            ciclo: param.ciclo,
            idCiclo: param.idCiclo,
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

    static fromApiToDomainByCiclo( param: Curso[] ) {

        const cursoByCiclo = param.reduce( ( a, b) => a.ciclo == b.ciclo ? a : b )

        // console.log();
        
       
    }

    static fromDomainToApiAgregar( param: CursoCrear ): CursoCrearDTO {
        return {

            codigoCurso: param.codigoCurso,
            nombreCurso: param.nombreCurso,
            idCiclo: param.idCiclo,
            idTipoCurso: param.idTipoCurso,
            idTipoEstudio: param.idTipoEstudio,
            idCompetencia: param.idCompetencia,
            horasTeoricas: param.horasTeoricas,
            horasPracticas: param.horasPracticas,
            totalHoras: param.totalHoras,
            totalCreditos: param.totalCreditos,
            usuario: param.usuarioId
        
        }
    }

    static fromDomainToApiEditar( param: CursoEditar ): CursoEditarDTO {
        return {
            id: param.id,
            codigoCurso: param.codigoCurso,
            nombreCurso: param.nombreCurso,
            idCiclo: param.idCiclo,
            idTipoCurso: param.idTipoCurso,
            idTipoEstudio: param.idTipoEstudio,
            idCompetencia: param.idCompetencia,
            horasTeoricas: param.horasTeoricas,
            horasPracticas: param.horasPracticas,
            totalHoras: param.totalHoras,
            totalCreditos: param.totalCreditos,
            usuario: param.usuarioId
        }
    }

    static formDomainToApiEliminar( param: CursoEliminar ): CursoEliminarDTO {
        return {
            id: param.id,
            usuario: RolUserId.currentIdRolUser
        }
    }
}