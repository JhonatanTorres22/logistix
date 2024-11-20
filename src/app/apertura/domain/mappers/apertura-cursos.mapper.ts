import { AgregarCursoAperturaDTO,  EliminarCursoAperturadoDTO,  ListarCursosAperturadosDTO } from "../../infraestructure/dto/apertura-curso.dto";

import { AgregarCursoApertura,  EliminarCursoAperturado,  ListarCursosAperturados } from "../models/apertura-curso.model";

export class AperturaCursosMapper {

    static fromApiToDomain(param: ListarCursosAperturadosDTO): ListarCursosAperturados{
        return{
            idAperturaCurso: param.codigoAperturaCurso,
            codigoInternoCurso: param.codigoInterno,
            nombreCurso: param.nombre,
            tipoDeCurso: param.tipoDeCurso,
            tipoDeEstudio: param.tipoDeEstudio,
            competencia: param.competencia,
            ht: param.ht,
            hp: param.hp,
            tHoras: param.tHoras,
            tCreditos: param.tCreditos,
            idCiclo: param.codigoCiclo,
            definicionCiclo: param.definicion,
            denominacionResumen: param.denominacionResumen,
            nSecciones: param.cantidadSecciones,
            idPlanDeEstudio: param.codigoPlanDeEstudio,
            resolucion: param.resolucionPlanDeEstudio
        }
    }
    static fromDomainToApiAgregar(param : AgregarCursoApertura[]) : AgregarCursoAperturaDTO[] {
        const cursoApertura : AgregarCursoAperturaDTO[] = param.map(curso => {
            return {
                codigoMalla: curso.idMalla,
                codigoLocal: curso.idLocal,
                codigoSemestre: curso.idSemestre,
                usuario: curso.idUsuario
            }
        })
        return cursoApertura
    }

    static fromDomainToApiEliminarCursoApertura( param: EliminarCursoAperturado ): EliminarCursoAperturadoDTO {
            return{
                codigoAperturaCurso: param.idAperturaCurso,
                usuario: param.idUsuario

            }

    }
}