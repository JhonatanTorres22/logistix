import { RolUserId } from "src/app/core/mappers/rolUserId";
import { CursoAddPreRequisitoDTO, CursoBuscarPlanDTO, CursoCrearDTO, CursoDeletePreRequisitoDTO, CursoDTO, CursoEditarDTO, CursoEliminarDTO, CursoEncontradoEnPlanDTO, CursoPreRequisitoDTO } from "../../infraestructure/dto/curso.dto";
import { Curso, CursoAddPreRequisito, CursoBuscarPlan, CursoByCiclo, CursoCrear, CursoDeletePreRequisito, CursoEditar, CursoEliminar, CursoEncontradoEnPlan, CursoPreRequisito } from "../models/curso.model";

export class CursoMapper {
    static fromApiToDomain( param: CursoDTO ): Curso {

        const preRequisitos = param.prerequisito.map( CursoMapper.fromApiToDomainPreRequisito );


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
            preRequisitos: preRequisitos,
            descripcion: param.descripcion
        }
    }

    static fromApiToDomainPreRequisito( param: CursoPreRequisitoDTO ): CursoPreRequisito  {
        return {
            codigoCurso: param.codigoInterno,
            id: param.codigoCurso,
            nombreCurso: param.nombre
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

    static fromDomainToApiAddPreRequisito( param: CursoAddPreRequisito ): CursoAddPreRequisitoDTO {
        return {
            codigoCurso: param.id,
            codigoCursoPreRequisito: param.idCursoPreRequisito,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiDeletePreRequisito( param: CursoDeletePreRequisito ): CursoDeletePreRequisitoDTO {
        return {
            codigoCurso: param.id,
            codigoCursoPreRequisito: param.idCursoPreRequisito,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiBuscarCursoPlanEstudio( param: CursoBuscarPlan ): CursoBuscarPlanDTO {
        return {
            codigoCurso: param.id
        }
    }


    static fromApiToDomainCursoEncontradoEnPlan( param: CursoEncontradoEnPlanDTO ): CursoEncontradoEnPlan {
        return {
            archivo: param.archivo,
            estadoMatricula: param.estadoMatricula,
            id: param.codigoPlanDeEstudio,
            nombre: param.nombre
        }
    }
}