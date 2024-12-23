import { Injectable, signal, WritableSignal } from "@angular/core";
import { ValidarHorario } from "../models/validar-horario.model";

@Injectable({
    providedIn: 'root'
})

export class ValidarHorarioSignal{
    validarHorarioDefault : ValidarHorario[] = [];
    validarHorario : WritableSignal<ValidarHorario[]> = signal (this.validarHorarioDefault)

    renderizarHorario = signal( '' );
}