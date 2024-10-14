import { p } from "msw/lib/core/GraphQLHandler-COiPfZ8k";
import { CursoMallaRenovarDTO, CursoMallaReordenarDTO, MallaDeleteDTO, MallaDTO, MallaEquivalenciaDTO, MallaInsertDTO, MallaPreRequisitoDTO } from "../../infraestructure/dto/malla.dto";
import { CursoMallaRenovar, CursoMallaReordenar, Malla, MallaDelete, MallaInsert } from "../models/malla.model";

export class MallaMapper {
    static fromApiToDomainList( param: MallaDTO ): Malla {
        return {
            orden: param.orden,
            idMalla: param.codigoMalla,
            idCurso: param.codigoCurso,
            codigoCurso: param.codigoInterno,
            nombreCurso: param.nombre,
            tipoCurso: param.tipoDeCurso,
            tipoEstudio: param.tipoDeEstudio,
            horasTeoricas: param.ht,
            horasPracticas: param.hp,
            totalHoras: param.tHoras,
            totalCreditos: param.tCreditos,
            estado: param.estado,
            cicloRomano: param.definicion,
            cicloNumero: parseInt(param.denominacionResumida),
            cicloLetra: param.denominacionExtendida,
            competencia: param.competencia,
            descripcion: param.descripcion,
            equivalencias: [],
            color: '',
            preRequisitos: []
        }
    }

    static fromApiToDomainPreRequisito( param: MallaPreRequisitoDTO ): Malla {
        return {
            orden: param.orden,
            idMalla: param.codigoMalla,
            idCurso: param.codigoCurso,
            codigoCurso: param.codigoInterno,
            nombreCurso: param.nombreCurso,
            tipoCurso: param.tipoDeCurso,
            tipoEstudio: param.tipoDeEstudio,
            horasTeoricas: param.ht,
            horasPracticas: param.hp,
            totalHoras: param.tHoras,
            totalCreditos: param.tCreditos,
            estado: param.estado,
            cicloRomano: param.definicion,
            cicloNumero: parseInt(param.denominacionResumida),
            cicloLetra: param.denominacionExtendida,
            competencia: '',
            descripcion: '',
            equivalencias: [],
            color: '',
            preRequisitos: param.prerequisito.map( pre => {
                return {
                    idMalla: pre.codigoMallaPreRequisito,
                    nombreCurso: pre.nombreMallaPreRequisito
                }
            })
        }
    }

    static fromDomainToApiInsert( param: MallaInsert ): MallaInsertDTO {
        return {
            orden: param.orden,
            codigoPlanDeEstudio: param.idPlanEstudio,
            codigoCurso: param.idCurso,
            codigoCiclo: param.idCiclo,
            usuario: param.userId
        }
    }

    static fromDomainToApiDelete( param: MallaDelete ): MallaDeleteDTO {
        return {
            codigoMalla: param.idMalla,
            usuario: param.userId
        }
    }


    static fromApiToDomainEquivalencia( param: MallaEquivalenciaDTO ): Malla {
        return {
            orden: param.orden,
            idMalla: param.codigoMalla,
            idCurso: param.codigoCurso,
            codigoCurso: param.codigoInterno,
            nombreCurso: param.nombreCurso,
            tipoCurso: param.tipoDeCurso,
            tipoEstudio: param.tipoDeEstudio,
            horasTeoricas: param.ht,
            horasPracticas: param.hp,
            totalHoras: param.tHoras,
            totalCreditos: param.tCreditos,
            estado: param.estado,
            cicloRomano: param.definicion,
            cicloNumero: parseInt(param.denominacionResumida),
            cicloLetra: param.denominacionExtendida,
            competencia: '',
            descripcion: '',
            equivalencias: param.equivalencia.map( equiv => {
                return {
                    idMalla: equiv.codigoMallaEquivalencia,
                    nombreCurso: equiv.nombreMallaEquivalencia,
                    porcentajeModificacion: equiv.porcentajeModificacion
                }
            }),
            color: '',
            preRequisitos: []
        }
    }

    static fromDomainToApiCursoMallaRenovar( param: CursoMallaRenovar ): CursoMallaRenovarDTO {
        return {
            codigoCiclo: param.idCiclo,
            codigoPlanDeEstudio: param.idPlanEstudio,
            codigoCurso: param.idCurso,
            usuario: param.userId,
            orden: param.orden,
            codigoInterno: param.codigoCurso,
            nombre: param.nombreCurso,
            tipoDeCurso: param.tipoCurso,
            tipoDeEstudio: param.tipoEstudio,
            ht: param.horasTeoricas,
            hp: param.horasPracticas,
            tHoras: param.totalHoras,
            tCreditos: param.totalCreditos,
            codigoProgramaAcademico: param.idPrograma,
            descripcion: param.descripcion,
            competencia: param.competencia,
            
            
        }
    }
    static fromDomainToApiCursoMallaReordenar( param: CursoMallaReordenar ): CursoMallaReordenarDTO {
        return {
            codigoMalla: param.idMalla,
            orden: param.orden,
            codigoCiclo: param.idCiclo,
            usuario: param.userId
        }
    }

}