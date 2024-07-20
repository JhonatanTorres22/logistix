import { CursoPlanEliminarDTO, CursoPlanListarDTO, PlanEstudioAddDTO, PlanEstudioCursoInsertarDTO, PlanEstudioDTO, PlanEstudioEditCUDTO, PlanEstudioEditDEDTO, PlanEstudioEliminarDTO } from "../../infraestructure/dto/plan-estudio.dto";
import { CursoPlanEliminar, CursoPlanListar, PlanEstudio, PlanEstudioAdd, PlanEstudioCursoInsertar, PlanEstudioEditCU, PlanEstudioEditDE, PlanEstudioEliminar } from "../models/plan-estudio.model";

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
            codigoPlanDeEstudio: param.idPlanEstudio,
            descripcionGrado: param.descripcionGrado,
            descripcionTitulo: param.descripcionTitulo,
            detallePerfil: param.detallePerfil,
            nombre: param.nombre,
            usuario: param.usuarioId
        }
    }

    static fromDomainToApiEditCU( param: PlanEstudioEditCU ): PlanEstudioEditCUDTO {
        return {
            codigoPlanDeEstudio: param.idPlanEstudio,
            descripcionGrado: param.descripcionGrado,
            descripcionTitulo: param.descripcionTitulo,
            detallePerfil: param.detallePerfil,
            nombre: param.nombre,
            resolucion: param.resolucion,
            usuario: param.usuarioId
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
        return {
            idCursoPlan: param.codigoCursoPlan,
            descripcion: param.descripcion,
            nombre: param.nombre
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