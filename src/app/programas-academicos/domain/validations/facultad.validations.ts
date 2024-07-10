import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Facultad } from "../models/facultad.model";
import { FacultadSignal } from "../signals/facultad.signal";
import { ValidacionComprobarDuplicadoService } from "../services/validacion-comprobar-duplicado.service";


@Injectable({
    providedIn: 'root'
})

export class FacultadValidations {

    constructor(private facultadSignal: FacultadSignal,
        private validarDuplicadoService:ValidacionComprobarDuplicadoService
    ){}

// INICIO NOMBRE    
    maxLengthNombre = 60;
    minLengthNombre = 5;
    expRegNombre = /[a-zA-Z0-9\- ]{0,40}/;
    expRegNombreToLockInput = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ,\-]/g ;
    duplicado = this.duplicadoNombreFacultad.bind(this);
    // FIN NOMBRE
    
    
    // INICIO CODIGO
    maxLengthCodigo = 150;
    minLengthCodigo = 6;
    expRegCodigo = /[a-zA-Z0-9\- ]{0,40}/
    expRegCodigoToLockInput = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ,\-.:;]/g;
    // /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ,\-]/g
    // FIN CODIGO
    
     /* GENERAL INICIO */
    EXP_REG_SIN_NUMERO = '^[a-zA-Z]([a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\- ,.;:()"]*)[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F(."\d\d)]$';
    /* GENERAL FIN */

/* INICIO DUPLICIDAD */


duplicadoNombreFacultad(control: AbstractControl): { [key: string]: boolean } | null {
    const listaFacultades = this.facultadSignal.facultadesList();
    const facultadEditar = this.facultadSignal.facultadEdit();
    return this.validarDuplicadoService.duplicadoNombre(control, listaFacultades, facultadEditar, 'nombre');
  }
/* FIN DUPLICIDAD */
}