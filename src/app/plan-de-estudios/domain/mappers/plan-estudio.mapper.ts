import { CursoPlanEliminarDTO, CursoPlanListarDTO, PlanEstudioAddDTO, PlanEstudioCursoInsertarDTO, PlanEstudioDTO, PlanEstudioEditCUDTO, PlanEstudioEditDEDTO, PlanEstudioEliminarDTO } from "../../infraestructure/dto/plan-estudio.dto";
import { CursoPlanEliminar, CursoPlanListar, PlanEstudio, PlanEstudioAdd, PlanEstudioCursoInsertar, PlanEstudioEditCU, PlanEstudioEditDE, PlanEstudioEliminar } from "../models/plan-estudio.model";
import { CursoMapper } from "./curso.mapper";

export class PlanEstudioMapper {
    static fromApiToDomain( param: PlanEstudioDTO ): PlanEstudio {
        return {
            archivo: param.archivo,
            descripcionGrado: param.descripcionGrado,
            descripcionTitulo: param.descripcionTitulo,
            detallePerfil: param.detallePerfil,
            estadoCaducidad: param.estadoCaducidad,
            estadoMatricula: param.estadoMatricula,
            id: param.codigoPlanDeEstudio,
            idProgramaAcademico: param.codigoProgramaAcademico,
            finVigencia: param.finVigencia,
            inicioVigencia: param.inicioVigencia,
            nombre: param.nombre,
            resolucion: param.resolucion
        }
    }

    static fromDomainToApiAdd( param: PlanEstudioAdd ): PlanEstudioAddDTO {
        return {
            codigoProgramaAcademico: param.idProgramaAcademico,
            descripcionGrado: param.descripcionGrado,
            descripcionTitulo: param.descripcionTitulo,
            detallePerfil: param.detallePerfil,
            nombre: param.nombre,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiEditDE( param: PlanEstudioEditDE ): PlanEstudioEditDEDTO {
        return {
            codigoPlanDeEstudio: param.id,
            descripcionGrado: param.descripcionGrado,
            descripcionTitulo: param.descripcionTitulo,
            detallePerfil: param.detallePerfil,
            nombre: param.nombre,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiEditCU( param: PlanEstudioEditCU ): PlanEstudioEditCUDTO {
        return {
            codigoPlanDeEstudio: param.id,
            descripcionGrado: param.descripcionGrado,
            descripcionTitulo: param.descripcionTitulo,
            detallePerfil: param.detallePerfil,
            nombre: param.nombre,
            resolucion: param.resolucion,
            inicioVigencia: param.inicioVigencia,
            finVigencia: param.finVigencia,
            usuario: param.usuarioId,
            Archivo: param.archivo
        }
    }

    static fromDomainToApiEliminar( param: PlanEstudioEliminar ): PlanEstudioEliminarDTO {
        return {
            codigoPlanDeEstudio: param.idPlanEstudio,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiCursoPlanInsertar( param: PlanEstudioCursoInsertar[] ): PlanEstudioCursoInsertarDTO[] {
        const cursos: PlanEstudioCursoInsertarDTO[] = param.map( curso => {
            return {
                codigoCurso: curso.idCurso,
                codigoPlanDeEstudio: curso.idPlanEstudio,
                usuario: curso.usuarioId
            }
        })
        return cursos
    }

    static formApiToDomainCursoPlanListar( param: CursoPlanListarDTO ): CursoPlanListar {

        const preRequisitos = param.prerequisito.map( CursoMapper.fromApiToDomainPreRequisito );


        return {
            id: param.codigoCurso,
            idPrograma: param.codigoProgramaAcademico,
            idCiclo: param.codigoCiclo,
            definicionCiclo: param.denominacionResumidaCiclo,
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

    static fromDomainToApiCursoPlanEliminar( param: CursoPlanEliminar[] ): CursoPlanEliminarDTO[] {

        const cursosToEliminar: CursoPlanEliminarDTO[] = param.map( curso => {
            return {
                codigoCursoPlan: curso.idCursoPlan,
                usuario: curso.usuarioId
            }
        })

        return cursosToEliminar
        
    }
}