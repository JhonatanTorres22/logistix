import { Injectable } from "@angular/core";
import { LocalSignal } from "../signals/local.signal";
import { Local } from "../models/local.model";
import { AbstractControl } from "@angular/forms";
import { ValidacionComprobarDuplicadoService } from "../services/validacion-comprobar-duplicado.service";


@Injectable({
    providedIn: 'root'
})

export class LocalValidations {
    constructor( 
        private signal: LocalSignal,
        private validarDuplicadoService:ValidacionComprobarDuplicadoService
    ){}

// INICIO NOMBRE    
    maxLengthNombre = 40;
    minLengthNombre = 3;
    expRegNombre = /[a-zA-Z0-9\- ]{0,40}/;
    expRegNombreToLockInput = /^((?![a-zA-Z0-9\- ]).)*$/;
    duplicarNombre = this.duplicadoNombreLocal.bind(this)
// FIN NOMBRE


// INICIO CODIGO
    maxLengthCodigo = 20;
    minLengthCodigo = 3;
    expRegCodigo = /[a-zA-Z0-9\- ]{0,40}/
    expRegCodigoToLockInput = /^((?![a-zA-Z0-9\- ]).)*$/;
// FIN CODIGO

// INICIO LATITUD
    maxLengthLatitud = 20;
    minLengthLatitud = 6;
    expRegLatitud = /^[0-9-.,]*$/
    expRegLatitudToLockInput = /^[0-9-.,]*$/;
// FIN LATITUD

// INICIO LONGITUD
    maxLengthLongitud = 20;
    minLengthLongitud = 6;
    expRegLongitud = /^[0-9-.,]*$/
    expRegLongitudToLockInput = /^[0-9-.,]*$/;
// FIN LONGITUD

    duplicadoNombreLocal(control: AbstractControl): { [key: string]: boolean } | null {
        const listaLocales = this.signal.localList();
        const editarLocales = this.signal.localEdit();
        return this.validarDuplicadoService.duplicadoNombre(control, listaLocales, editarLocales, 'nombre');
      }
}