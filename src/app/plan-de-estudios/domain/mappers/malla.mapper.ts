import { p } from "msw/lib/core/GraphQLHandler-COiPfZ8k";
import { CursoMallaDesfasadoDTO, CursoMallaDesfasarDTO, CursoMallaEliminarDTO, CursoMallaEliminarEquiPreDTO, CursoMallaInformacionEquiPreDTO, CursoMallaInsertarDTO, CursoMallaRenovadoDTO, CursoMallaRenovarDTO, CursoMallaReordenarDTO, CursoMallaRevertirDesfaseDTO, CursoMallaRevertirRenovacionDTO, MallaDeleteDTO, MallaDTO, MallaEquivalenciaDTO, MallaInsertDTO, MallaPreRequisitoDTO } from "../../infraestructure/dto/malla.dto";
import { CursoMallaDesfasado, CursoMallaDesfasar, CursoMallaEliminar, CursoMallaEliminarEquiPre, CursoMallaInformacionEquiPre, CursoMallaInsertar, CursoMallaRenovado, CursoMallaRenovar, CursoMallaReordenar, CursoMallaRevertirDesfase, CursoMallaRevertirRenovacion, Malla, MallaDelete, MallaInsert } from "../models/malla.model";
import { CursoRevertirRenovacionDTO } from "../../infraestructure/dto/curso.dto";

export class MallaMapper {
    static fromApiToDomainList( param: MallaDTO ): Malla {
        return {
            orden: param.orden,
            idMalla: param.codigoMalla,
            idCurso: param.codigoCurso,
            idCiclo: 0,
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
            modalidadDeCreacion: param.modalidadDeCreacion,
            preRequisitos: []
        }
    }

    static fromApiToDomainPreRequisito( param: MallaPreRequisitoDTO ): Malla {
        return {
            orden: param.orden,
            idMalla: param.codigoMalla,
            idCurso: param.codigoCurso,
            idCiclo: param.codigoCiclo,
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
            modalidadDeCreacion: param.modalidadDeCreacion,
            preRequisitos: param.prerequisito.map( pre => {
                return {
                    idMalla: pre.codigoMallaPreRequisito,
                    nombreCurso: pre.nombreMallaPreRequisito,
                    codigoCurso: pre.codigoInternoCursoPreRequisito
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
            idCiclo: param.codigoCiclo,
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
            modalidadDeCreacion: param.modalidadDeCreacion,
            equivalencias: param.equivalencia.map( equiv => {
                return {
                    idMalla: equiv.codigoMallaEquivalencia,
                    nombreCurso: equiv.nombreMallaEquivalencia,
                    porcentajeModificacion: equiv.porcentajeModificacion,
                    codigoCurso: ''
                }
            }),
            color: '',
            preRequisitos: []
        }
    }

    static fromDomainToApiCursoMallaRenovar( param: CursoMallaRenovar ): CursoMallaRenovarDTO {
        return {
            codigoMalla: param.cursoId,
            codigoPlanDeEstudio: param.idPlanEstudio,
            orden: param.orden,
            codigoProgramaAcademico: param.idPrograma,
            codigoCiclo: param.idCiclo,
            codigoInterno: param.codigoCurso,
            nombre: param.nombreCurso,
            descripcion: param.descripcion,
            tipoDeCurso: param.tipoCurso,
            tipoDeEstudio: param.tipoEstudio,
            competencia: param.competencia,
            ht: param.horasTeoricas,
            hp: param.horasPracticas,
            tHoras: param.totalHoras,
            tCreditos: param.totalCreditos,
            usuario: param.userId,
            
            
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

    static fromApiToDomainRenovados( param: CursoMallaRenovadoDTO ): CursoMallaRenovado {
        return {
            idMallaRenovada: param.codigoMallaRenovada,
            idCursoRenovado: param.codigoCursoRenovado,
            codigoCursoRenovado: param.codigoInternoCursoRenovado,
            nombreCursoRenovado: param.nombreCursoRenovado,
            cicloRomanoRenovado: param.definicionCicloRenovado,
            idMalla: param.codigoMallaActiva,
            idCurso: param.codigoCursoActivo,
            codigoCurso: param.codigoInternoCursoActivo,
            nombreCurso: param.nombreCursoActivo,
            cicloRomano: param.definicionCicloActivo
        }
    }

    static fromDomainToApiRevertirRenovacion( param: CursoMallaRevertirRenovacion ): CursoMallaRevertirRenovacionDTO {
        return {
            codigoMallaRenovada: param.idMallaRenovada,
            usuario: param.userId
        }
    }

    static fromDomainToApiDesfasar( param: CursoMallaDesfasar ): CursoMallaDesfasarDTO {
        return {
            codigoMalla: param.idMalla,
            usuario: param.userId
        }
    }

    static froApiToDomainDesfasados( param: CursoMallaDesfasadoDTO ): CursoMallaDesfasado {
        return {
            idMalla: param.codigoMalla,
            idCurso: param.codigoCurso,
            codigoCurso: param.codigoInternoCurso,
            nombreCurso: param.nombreCurso,
            cicloRomano: param.definicionCiclo

        }
    }

    static fromDomainToApiRevertirDesfase( param: CursoMallaRevertirDesfase ): CursoMallaRevertirDesfaseDTO {
        return {
            codigoMalla: param.idMalla,
            usuario: param.userId
        }
    }

    static fromDomainToApiCursoMallaInsertar( param: CursoMallaInsertar ): CursoMallaInsertarDTO {
        return {
          codigoCiclo: param.idCiclo,
          codigoInterno: param.codigoCurso,
          codigoPlanDeEstudio: param.idPlanEstudio,
          codigoProgramaAcademico: param.idPrograma,
          competencia: param.competencia,
          descripcion: param.descripcion,
          hp: param.horasPracticas,
          ht: param.horasTeoricas,
          nombre: param.nombreCurso,
          orden: param.orden,
          tCreditos: param.totalCreditos,
          tHoras: param.totalHoras,
          tipoDeCurso: param.tipoCurso,
          tipoDeEstudio: param.tipoEstudio,
          usuario: param.usuarioId  
        }
    }

    static fromDomainToApiCursoMallaEliminar( param: CursoMallaEliminar ): CursoMallaEliminarDTO {
        return {
            codigoMalla: param.idMalla,
            usuario: param.userId
        }
    }

    static fromApiToDomainCursoMallaInformacionEquiPre( param: CursoMallaInformacionEquiPreDTO ): CursoMallaInformacionEquiPre {
        return {
            preRequisitos: param.preRequisitos.map( pre => ({ codigoCurso: pre.codigoInterno, idMalla: pre.codigoMalla, nombreCurso: pre.nombre })),
            equivalencias: param.equivalencias.map( equi => ({ codigoCurso: equi.codigoInterno, idMalla: equi.codigoMalla, nombreCurso: equi.nombre, porcentajeModificacion: 0 })),
        }
    }

    static fromDomainToApiCursoMallaEliminarEquiPre( param: CursoMallaEliminarEquiPre ): CursoMallaEliminarEquiPreDTO {
        return {
            codigoMalla: param.idMalla,
            usuario: param.userId
        }
    }
}