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





}