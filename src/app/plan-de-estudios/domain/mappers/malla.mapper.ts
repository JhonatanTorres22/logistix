import { p } from "msw/lib/core/GraphQLHandler-COiPfZ8k";
import { MallaDeleteDTO, MallaDTO, MallaEquivalenciaDTO, MallaInsertDTO, MallaPreRequisitoDTO } from "../../infraestructure/dto/malla.dto";
import { Malla, MallaDelete, MallaInsert } from "../models/malla.model";

export class MallaMapper {
    static fromApiToDomainList( param: MallaDTO ): Malla {
        return {
            orden: 0,
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
            orden: 0,
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
}