import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class SemestreAcademicoValidations {
    
// INICIO NOMBRE    
    maxLengthNombre = 40;
    minLengthNombre = 5;
    expRegNombre = /[a-zA-Z0-9\- ]{0,40}/;
    expRegNombreToLockInput = /^((?![a-zA-Z0-9\- ]).)*$/;
// FIN NOMBRE


// INICIO CODIGO
    maxLengthCodigo = 6;
    minLengthCodigo = 6;
    expRegCodigo = /[0-9\-]{5}/
    expRegCodigoToLockInput = /^((?![0-9\-]).)*$/;
// FIN CODIGO


// INICIO FECHA DE INICIO


// FIN FECHA DE INICIO


// INICIO FECHA DE FIN


// FIN FECHA DE FIN




}