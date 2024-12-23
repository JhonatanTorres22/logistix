import { Injectable } from "@angular/core";
import { ValidarHorarioRepository } from "../../domain/repositories/validar-horario.repository";
import { ValidarHorarioService } from "../services/validar-horario.service";
import { Observable } from "rxjs";
import { ValidarHorario } from "../../domain/models/validar-horario.model";

@Injectable({
    providedIn: 'root'
})

export class ValidarHorarioRepositoryImpl implements ValidarHorarioRepository {
    constructor(private validarHorarioService: ValidarHorarioService){}

    obtenerValidarHorario(idSemestre: number, idLocal: number): Observable<ValidarHorario[]> {
        return this.validarHorarioService.obtenerValidarHorario(idSemestre, idLocal)
    }
}