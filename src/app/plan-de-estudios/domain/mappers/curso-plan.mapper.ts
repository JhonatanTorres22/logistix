import { CursoPlanEquivalenciaDTO } from "../../infraestructure/dto/curso-plan.dto";
import { CursoPlanEquivalencia } from "../models/curso-plan.model";

export class CursoPlanMapper {
    static fromApiToDomainListarEquivalencia(param: CursoPlanEquivalenciaDTO): CursoPlanEquivalencia {
        return {
            idCursoPlan: param.codigoCursoPlan,
            nombreCurso: param.nombreCurso,
            codigoCurso: param.codigoInterno,
            tipoCurso: param.tipoDeCurso,
            tipoEstudio: param.tipoDeEstudio,
            horasTeoricas: param.ht,
            horasPracticas: param.hp,
            totalHoras: param.tHoras,
            totalCreditos: param.tCreditos,
            cicloRomano: param.denominacionResumida,
            cicloNumero: param.denominacionExtendida,
            cicloLetra: param.definicion,
            equivalencias: param.eqs.map(eq => ({ nombreCurso: eq.nombreCursoPlanEquivalencia }))
        };
    }

}