import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { SemestreAcademico } from "../models/semestre-academico.model";
import { ValidacionComprobarDuplicadoService } from "../services/validacion-comprobar-duplicado.service";
import { SemestreSignal } from "../signals/semestre.signal";


@Injectable({
    providedIn: 'root'
})

export class SemestreAcademicoValidations {

    constructor(
        private semestreSignal: SemestreSignal,
        private validarDuplicadoService:ValidacionComprobarDuplicadoService
    ) { }

    // INICIO NOMBRE    
    maxLengthNombre = 18;
    minLengthNombre = 5;
    expRegNombre = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F].*\d$/;
    expRegNombreToLockInput = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9 \-]/g;
    // FIN NOMBRE


    // INICIO CODIGO
    maxLengthCodigo = 6;
    minLengthCodigo = 6;
    expRegCodigo = /^\d{4}-\d{1,2}$/

    expRegCodigoToLockInput =/[^0-9-]/g;
    duplicado = this.duplicadoNombreSemestre.bind(this)
    // FIN CODIGO


    // INICIO FECHA DE INICIO

    // FIN FECHA DE INICIO


    // INICIO FECHA DE FIN


    // FIN FECHA DE FIN


    /* CODIGO DUPLICADO */



    duplicadoNombreSemestre(control: AbstractControl): { [key: string]: boolean } | null {
        const listaProgramas = this.semestreSignal.semestresAcademicos();
        const editarProgramas = this.semestreSignal.semestreAcademicoEditado();
        return this.validarDuplicadoService.duplicadoNombre(control, listaProgramas, editarProgramas, 'codigo');
      }

}