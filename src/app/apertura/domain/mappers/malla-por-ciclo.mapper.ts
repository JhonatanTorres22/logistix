import { MallaPorCicloDTO, MallaPorCicloPlanEstudioDTO } from "../../infraestructure/dto/malla-por-ciclo.dto";
import { MallaPorCiclo, MallaPorCicloPlanEstudio } from "../models/malla-por-ciclo.model";

export class MallaProCicloMapper {
    static fromApiToDomain(param : MallaPorCicloDTO): MallaPorCiclo{
       return{
        idMalla: param.codigoMalla,
        codigoInterno: param.codigoInterno,
        nombreCurso: param.nombre
       }
    }

    static fromApiToDomainMallaFacultad(param : MallaPorCicloPlanEstudioDTO ) : MallaPorCicloPlanEstudio {
        const malla = param.malla.map(MallaProCicloMapper.fromApiToDomain)
        return {
            idPlanDeEstudio : param.codigoPlanDeEstudio,
            fechaInicio: param.inicioVigencia,
            fechaFin: param.finVigencia,
            resolucionPlanDeEstudio: param.resolucion,
            cursos: malla
        }
    }
}