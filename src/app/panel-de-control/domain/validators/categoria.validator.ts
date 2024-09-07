import { Injectable } from "@angular/core";
import { IValidator } from "../models/categoria.model";

@Injectable({
    providedIn: 'root'
})

export class CategoriaValidator {

    validatorNombre: IValidator;
    validatorAbreviatura: IValidator;

    maxLengthNombre = 20;
    minLengthNombre = 4;
    expRegNombre: RegExp = /^[A-Za-záéíóúÁÉÍÓÚñÑ]+( [A-Za-záéíóúÁÉÍÓÚñÑ]+)*[ ]*$/
    expRegNombreInput: RegExp = /^(?!([A-Za-zzáéíóúÁÉÍÓÚñÑ]+( [A-Za-z-záéíóúÁÉÍÓÚñÑ]+)*)$).+/

    constructor() {
        this.validatorNombre = {
            expReg: this.expRegNombre,
            expRegInput: this.expRegNombreInput,
            maxLength: this.maxLengthNombre,
            minLength: this.minLengthNombre,
        }

        this.validatorAbreviatura = {
            expReg: /^[A-Za-z]+([A-Za-z]+)*$/,
            expRegInput: /^(?!([A-Za-z]+( [A-Za-z]+)*)$).+/,
            maxLength: 3,
            minLength: 3
        }
    }

}