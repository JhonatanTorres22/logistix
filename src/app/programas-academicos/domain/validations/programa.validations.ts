import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { ProgramaSignal } from "../signals/programa.signal";
import { ProgramaFacultad } from "../models/programa.model";
import { ValidacionComprobarDuplicadoService } from "../services/validacion-comprobar-duplicado.service";


@Injectable({
    providedIn: 'root'
})

export class ProgramaValidations {

    listaPrograma: ProgramaFacultad[] = [];
    programaEdit: ProgramaFacultad;
    constructor(
        private programaSignal: ProgramaSignal,
        private validarDuplicadoService:ValidacionComprobarDuplicadoService
    ){}

// INICIO NOMBRE    
    maxLengthNombre = 50;
    minLengthNombre = 5;
    expRegNombre = /[a-zA-Z0-9\- ]{0,40}/;
    expRegNombreToLockInput = /^((?![a-zA-Z0-9\- ]).)*$/;
    duplicado = this.duplicadoNombrePrograma.bind(this);
// FIN NOMBRE


// INICIO CODIGO
    maxLengthCodigo = 150;
    minLengthCodigo = 6;
    expRegCodigo = /[a-zA-Z0-9\- ]{0,40}/
    expRegCodigoToLockInput = /^((?![a-zA-Z0-9\- ]).)*$/;
// FIN CODIGO


/* GENERAL INICIO */
    EXP_REG_SIN_NUMERO = '^[a-zA-Z]([a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\- ]*)[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F]$';
/* GENERAL FIN */



/* INICIO DUPLICIDAD PROGRAMA */


duplicadoNombrePrograma(control: AbstractControl): { [key: string]: boolean } | null {
    const listaProgramas = this.programaSignal.programasList();
    const editarProgramas = this.programaSignal.programaEdit();
    return this.validarDuplicadoService.duplicadoNombre(control, listaProgramas, editarProgramas, 'nombre');
  }
/* FIN DUPLICIDAD PROGRAMA */
}