import { ValidarHorarioDTO } from "../../infraestructure/dto/validar-horario.dto";
import { ValidarHorario } from "../models/validar-horario.model";

export class ValidarHorarioMapper {
    static fromApiToDomain(param: ValidarHorarioDTO): ValidarHorario {
        return{
            idAperturaCurso: param.codigoAperturaCurso,
            nombreProgramaAcademico: param.programaAcademico,
            descripcionCurso: param.nombreCurso,
            descripcionSeccion: param.seccion,
            posibleDocente: param.posibleDocente
        }
    }
}