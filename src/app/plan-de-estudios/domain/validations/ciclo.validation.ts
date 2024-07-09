import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { CicloSingal } from "../signal/ciclo.signal";
import { ValidacionComprobarDuplicadoService } from "src/app/programas-academicos/domain/services/validacion-comprobar-duplicado.service";

@Injectable({
    providedIn: 'root'
})

export class CicloValidation {
    constructor (
        private cicloSignal: CicloSingal,
        private validarDuplicadoService:ValidacionComprobarDuplicadoService
    ) {}

    MaxLengthCicloNumero: number = 2;
    MinLengthCicloNumero: number = 1;
    expRegCicloNumero: RegExp = /[0-9]{1,2}/;
    expRegCicloNumeroBlockToInput: RegExp = /^((?![0-9]).)*$/;

    MaxLengthCicloLetra: number = 20;
    MinLengthCicloLetra: number = 5;
    expRegCicloLetra: RegExp = /[A-Za-z]{5,20}/;
    expRegCicloLetraBlockToInput: RegExp = /^((?![A-Za-z]).)*$/;

    MaxLengthDefinicion: number = 20;
    MinLengthDefinicion: number = 5;
    expRegDefinicion: RegExp = /[A-Za-z]{5,20}/;
    expRegDefinicionBlockToInput: RegExp = /^((?![A-Za-z]).)*$/;

    duplicadoNombreCiclo = (control:AbstractControl) : { [key: string]: boolean } | null => {
        const listaCiclos = this.cicloSignal.cicloList();
        const cicloEditar = this.cicloSignal.cicloEdit();
        return this.validarDuplicadoService.duplicadoNombre(control, listaCiclos, cicloEditar, 'definicion')
    }
    duplicado = this.duplicadoNombreCiclo.bind(this)
}