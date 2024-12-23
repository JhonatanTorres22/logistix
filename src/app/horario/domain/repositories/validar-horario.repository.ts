import { Observable } from "rxjs";
import { ValidarHorario } from "../models/validar-horario.model";

export abstract class ValidarHorarioRepository {
    abstract obtenerValidarHorario(idSemestre: number, idLocal:number): Observable<ValidarHorario[]>
}