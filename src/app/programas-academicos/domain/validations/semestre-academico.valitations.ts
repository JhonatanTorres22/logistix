import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { SemestreAcademicoDomainService } from "../services/semestre-academico-domain.service";
import { SemestreAcademico } from "../models/semestre-academico.model";
import { ValidacionComprobarDuplicadoService } from "../services/validacion-comprobar-duplicado.service";


@Injectable({
    providedIn: 'root'
})

export class SemestreAcademicoValidations {

    constructor(
        private semestreAcademicoDomainService: SemestreAcademicoDomainService,
        private validarDuplicadoService:ValidacionComprobarDuplicadoService
    ) { }

    // INICIO NOMBRE    
    maxLengthNombre = 40;
    minLengthNombre = 5;
    expRegNombre = /[a-zA-Z0-9\- ]{0,40}/;
    expRegNombreToLockInput = /^((?![a-zA-Z0-9\- ]).)*$/;
    // FIN NOMBRE


    // INICIO CODIGO
    maxLengthCodigo = 6;
    minLengthCodigo = 6;
    expRegCodigo = /[0-9\-]{5}/;
    expRegCodigoToLockInput = /^((?![0-9\-]).)*$/;
    duplicado = this.duplicadoNombreSemestre.bind(this)
    // FIN CODIGO


    // INICIO FECHA DE INICIO

    // FIN FECHA DE INICIO


    // INICIO FECHA DE FIN


    // FIN FECHA DE FIN


    /* CODIGO DUPLICADO */



    duplicadoNombreSemestre(control: AbstractControl): { [key: string]: boolean } | null {
        const listaProgramas = this.semestreAcademicoDomainService.semestresAcademicos();
        const editarProgramas = this.semestreAcademicoDomainService.semestreAcademicoEditado();
        return this.validarDuplicadoService.duplicadoNombre(control, listaProgramas, editarProgramas, 'codigo');
      }

}