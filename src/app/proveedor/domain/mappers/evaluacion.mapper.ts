import { CriterioDto, EvaluacionDto } from "../../infrastructure/dto/evaluacion.dto";
import { Criterio, Evaluacion } from "../models/evaluacion.model";

export class EvaluacionMapper {
    static toDomainCriterio(dto: CriterioDto): Criterio {
        return {
            codigo: dto.codigoCriterio,
            nombre: dto.nombreCriterio,
            detalleVerificar: dto.detalleVerificar,
            obligatorio: dto.obligatorio
        }
    }

    static toDomainEvaluacionList(dtoList: EvaluacionDto): Evaluacion {
        return {
            codigo: dtoList.codigoProveedor,
            nombre: dtoList.nombreLegal,
            tipo: dtoList.tipo,
            direccion: dtoList.direccion,
            evaluaciones: dtoList.evaluaciones.map(eva => ({
                codigoEva: eva.codigoEvaluacion,
                codigoCrit: eva.codigoCriterio,
                nombre: eva.nombreCriterio,
                detalle: eva.detalleCriterio,
                obligatorio: eva.obligatorioCriterio,
                cumple: eva.cumple,
                observacion: eva.observacion,
                documento: eva.documento
            }))
        }
    }
}