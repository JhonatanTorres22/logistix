import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SeccionValidation {

    /* OBSERVACIÓN */
    maxLengthObservacion: number = 500;
    minLenghtObservación: number = 1;

    /* VACANTES */
    minLengthVacantes:number = 1;
    maxLengthVacantes: number = 2;
    minVacantes: number = 1;
    maxVacantes: number = 50;
    expRegVacantesBlockToInput: RegExp = /[^0-9]/g;

    /* GRUPO */


}