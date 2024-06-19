import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class ProgramaValidations {

// INICIO NOMBRE    
    maxLengthNombre = 40;
    minLengthNombre = 5;
    expRegNombre = /[a-zA-Z0-9\- ]{0,40}/;
    expRegNombreToLockInput = /^((?![a-zA-Z0-9\- ]).)*$/;
// FIN NOMBRE


// INICIO CODIGO
    maxLengthCodigo = 6;
    minLengthCodigo = 6;
    expRegCodigo = /[a-zA-Z0-9\- ]{0,40}/
    expRegCodigoToLockInput = /^((?![a-zA-Z0-9\- ]).)*$/;
// FIN CODIGO

}