import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { SemestreAcademicoDomainService } from "../services/semestre-academico-domain.service";
import { SemestreAcademico } from "../models/semestre-academico.model";


@Injectable({
    providedIn: 'root'
})

export class SemestreAcademicoValidations {
    semestreAcademicoEditado!: SemestreAcademico;
    listaSemestreAcademico: SemestreAcademico[] = [];
    constructor(private semestreAcademicoDomainService: SemestreAcademicoDomainService,) { }

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
    duplicado = this.comprobarCodigoSemestre.bind(this)
    // FIN CODIGO


    // INICIO FECHA DE INICIO

    // FIN FECHA DE INICIO


    // INICIO FECHA DE FIN


    // FIN FECHA DE FIN


    /* CODIGO DUPLICADO */
    listaCodigoSemestre: string[] = [];
    codigoFiltro: string[] = []
    comprobarCodigoSemestre(control: AbstractControl) {
        this.listaSemestreAcademico = this.semestreAcademicoDomainService.semestresAcademicos();
        this.codigoFiltro = [];
        this.listaCodigoSemestre = []
        for (let i = 0; i < this.listaSemestreAcademico.length; i++) {
            this.listaCodigoSemestre.push(this.listaSemestreAcademico[i].codigo)
        }
        // console.log(this.listaSemestreAcademico,'semestre academico');
        // console.log(this.listaCodigoSemestre,'lista de codigos');
        this.semestreAcademicoEditado = this.semestreAcademicoDomainService.semestreAcademicoEditado()     
        let codigoIngresado = control.value;
        let codigoEnEdicion = "";

        this.semestreAcademicoEditado === undefined ? codigoEnEdicion = '': codigoEnEdicion = this.semestreAcademicoEditado.codigo;
        this.codigoFiltro = this.listaCodigoSemestre.filter((listaCodigo:string) => listaCodigo !== codigoEnEdicion)
        // console.log(this.codigoFiltro,'*');
        
        if (this.codigoFiltro.includes(codigoIngresado)) {
            return { codigoDuplicado: true }
        } else { return null; }
    }


}