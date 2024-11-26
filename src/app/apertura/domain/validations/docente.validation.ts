import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class DocenteValidation{

    maxLengthNombre: number = 50;
    minLengthNombre: number = 2;
    expRegLockToInputNombre: RegExp =  /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g;

    maxLengthApellidos: number = 50;
    minLengthApellidos: number = 2;
    expRegLockToInputApellidos: RegExp =  /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g;

    maxLengthGrados: number = 80;
    minLengthGrados: number = 10;
    expRegLockToInputGrados: RegExp =  /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g;

    expRegLockToInputFechaNacimiento : RegExp = /[^0-9\/]/g;
    maxLengthFechaNacimiento = 10
}
