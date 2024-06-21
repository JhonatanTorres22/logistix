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
    maxLengthCodigo = 6;
    minLengthCodigo = 20;
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

    duplicadoNombreLocal(control: AbstractControl): { [key: string]: boolean } | null {
        const listaProgramas = this.signal.localList();
        const editarProgramas = this.signal.localEdit();
        return this.validarDuplicadoService.duplicadoNombre(control, listaProgramas, editarProgramas, 'nombre');
      }
}