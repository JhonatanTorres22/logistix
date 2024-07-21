import { Injectable } from "@angular/core";
import { UiSelect } from "src/app/core/components/ui-select/ui-select.interface";

@Injectable({
    providedIn: 'root'
})

export class CursoValidation {

    // maxLengthPrograma:string
    // maxLengthCiclo: string
    maxLengthCodigoCurso: number = 10;
    minLengthCodigoCurso: number = 5;
    expRegCodigoCurso: RegExp = /[A-Za-z]{5,20}/;
    expRegCodigoCursoBlockToInput: RegExp = /^((?![A-Za-z]).)*$/;

    maxLengthNombreCurso: number = 50;
    minLengthNombreCurso: number = 6;
    expRegNombreCurso: RegExp = /[A-Za-z]{5,20}/;
    expRegNombreCursoBlockToInput: RegExp = /^((?![A-Za-z]).)*$/;

    maxLengthDescripcion: number = 80;
    minLengthDescripcion: number = 6;
    expRegDescripcion: RegExp = /[A-Za-z]{5,20}/;
    expRegDescripcionBlockToInput: RegExp = /^((?![A-Za-z]).)*$/;
    // maxLengthTipoEstudio: string
    // maxLengthTipoCurso: string
    // maxLengthCompetencia: string
    maxLengthHorasTeoricas: number = 2
    minLengthHorasTeoricas: number = 1;
    expRegHorasTeoricas: RegExp = /[0-9]{1,2}/;
    expRegHorasTeoricasBlockToInput: RegExp = /^((?![0-9]).)*$/;

    maxLengthHorasPracticas: number = 2
    minLengthHorasPracticas: number = 1;
    expRegHorasPracticas: RegExp = /[0-9]{1,2}/;
    expRegHorasPracticasBlockToInput: RegExp = /^((?![0-9]).)*$/;

    maxLengthTotalHoras: number = 2
    minLengthTotalHoras: number = 1;
    expRegTotalHoras: RegExp = /[0-9]{1,2}/;
    expRegTotalHorasBlockToInput: RegExp = /^((?![0-9]).)*$/;

    maxLengthTotalCreditos: number = 2
    minLengthTotalCreditos: number = 1;
    expRegTotalCreditos: RegExp = /[0-9]{1,2}/;
    expRegTotalCreditosBlockToInput: RegExp = /^((?![0-9]).)*$/;
    
    // maxLengthPreRequisito: number[]

    optionsTipoEstudio: UiSelect[] = [
        { value: 'GENERAL', text: 'GENERAL', disabled: false },
        { value: 'ESPECÍFICO', text: 'ESPECÍFICO', disabled: false },
        { value: 'DE ESPECIALIDAD', text: 'DE ESPECIALIDAD', disabled: false },
      ]
    
    optionsTipoCurso: UiSelect[] = [
    { value: 'OBLIGATORIO', text: 'OBLIGATORIO', disabled: false },
    { value: 'ELECTIVO', text: 'ELECTIVO', disabled: false },
    ]

    optionsCompetencia: UiSelect[] = [
        { value: 'CG1', text: 'Competencia General 1', disabled: false },
        { value: 'CG2', text: 'Competencia General 2', disabled: false },
        { value: 'CG3', text: 'Competencia General 3', disabled: false },
        { value: 'CE1', text: 'Competencia Específica 1', disabled: false },
        { value: 'CE2', text: 'Competencia Específica 2', disabled: false },
        { value: 'CT1', text: 'Competencia de Especialidad 1', disabled: false },
        { value: 'CT2', text: 'Competencia de Especialidad 2', disabled: false },
        { value: 'CT3', text: 'Competencia de Especialidad 3', disabled: false },
    ]


}