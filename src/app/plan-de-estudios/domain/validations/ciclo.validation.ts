import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CicloValidation {

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

}