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
    expRegNombreToLockInput = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g;
    duplicarNombre = this.duplicadoNombreLocal.bind(this);
// FIN NOMBRE


// INICIO CODIGO
    maxLengthDefinicion = 20;
    minLengthDefinicion = 3;
    expRegDefinicion = /[a-zA-Z0-9\- ]{0,40}/;
    expRegDefinicionToLockInput = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9 \-]/g;
// FIN CODIGO

// INICIO LATITUD
    maxLengthLatitud = 20;
    minLengthLatitud = 6;
    expRegLatitud = /^[\d\-][\d\- ]*\d+$/;
    expRegLatitudToLockInput = /[^0-9\-]|(?!^)-/g;
// FIN LATITUD

// INICIO LONGITUD
    maxLengthLongitud = 20;
    minLengthLongitud = 6;
    expRegLongitud = /^[\d\-][\d\- ]*\d+$/;
    expRegLongitudToLockInput = /[^0-9\-]|(?!^)-/g;
// FIN LONGITUD

/* GENERAL */
EXP_REG_SIN_NUMERO = '^[a-zA-Z]([a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\- ,.;:()"]*)[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F(."\d\d)]$';
    duplicadoNombreLocal(control: AbstractControl): { [key: string]: boolean } | null {
        const listaLocales = this.signal.localList();
        const editarLocales = this.signal.localEdit();
        return this.validarDuplicadoService.duplicadoNombre(control, listaLocales, editarLocales, 'nombre');
      }
}