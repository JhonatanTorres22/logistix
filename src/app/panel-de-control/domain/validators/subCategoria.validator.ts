import { Injectable } from "@angular/core";
import { IValidator } from "../models/categoria.model";

@Injectable({
    providedIn: 'root'
})

export class SubCategoriaValidator {

    validatorNombre: IValidator;

    constructor() {
        this.validatorNombre = {
            expReg: /^[A-Za-záéíóúÁÉÍÓÚñÑ]+( [A-Za-záéíóúÁÉÍÓÚñÑ]+)*[ ]*$/,
            expRegInput: /^(?!([A-Za-zzáéíóúÁÉÍÓÚñÑ]+( [A-Za-z-záéíóúÁÉÍÓÚñÑ]+)*)$).+/,
            maxLength: 20,
            minLength: 4,
        }
    }

}