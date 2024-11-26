import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AmbienteValidation {
    maxLengthNombre : number = 15;
    minLengthNombre : number = 7;

    maxNivel : number = 10;
    minNivel : number = 1;
    maxLengthNivel: number = 2;
    expRegNivelToLockInput : RegExp = /[^0-9]/g

    minAforo : number = 10;
    maxLengthAforo : number = 2;
    expRegAforoToLockInput : RegExp = /[^0-9]/g

    maxLengthPabellon : number = 1;
    minLenghtPabellon : number = 1;
    expRegPabellonToLockInput = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g; // VALIDACION DE LETRAS

    maxLengthDescripcion : number = 20

}