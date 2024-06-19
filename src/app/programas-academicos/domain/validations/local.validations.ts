import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class LocalValidations {

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

// INICIO LATITUD
maxLengthLatitud = 6;
minLengthLatitud = 6;
expRegLatitud = /[a-zA-Z0-9\- ]{0,40}/
expRegLatitudToLockInput = /^((?![a-zA-Z0-9\- ]).)*$/;
// FIN LATITUD

// INICIO LONGITUD
maxLengthLongitud = 6;
minLengthLongitud = 6;
expRegLongitud = /[a-zA-Z0-9\- ]{0,40}/
expRegLongitudToLockInput = /^((?![a-zA-Z0-9\- ]).)*$/;
// FIN LONGITUD

}