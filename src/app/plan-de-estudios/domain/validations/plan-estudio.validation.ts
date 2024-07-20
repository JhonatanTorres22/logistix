import { Injectable } from "@angular/core";
import { PlanEstudioAdd } from "../models/plan-estudio.model";

@Injectable({
    providedIn: 'root'
})

export class PlanEstudioValidation {

    // data: PlanEstudioAdd = {
    //     descripcionGrado: '',
    //     descripcionTitulo: '',
    //     detallePerfil: '',
    //     idProgramaAcademico: 0,
    //     nombre: '',
    //     usuarioId: 0
    // }

    expRegDescripcionGrado: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F].*$/;
    expRegDescripcionTitulo: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F].*$/;
    expRegDetallePerfil: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F].*$/;
    // expRegIdProgramaAcademico: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F].*\d$/;
    expRegNombre: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F].*$/;
    // expRegUsuarioId: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F].*\d$/;


    maxLengthDescripcionGrado: number = 40;
    maxLengthDescripcionTitulo: number = 40;
    maxLengthDetallePerfil: number = 80;
    // maxLengthIdProgramaAcademico: number = 40;
    maxLengthNombre: number = 40;
    // maxLengthUsuarioId: number = 0;


    minLengthDescripcionGrado: number = 10;
    minLengthDescripcionTitulo: number = 10;
    minLengthDetallePerfil: number = 10;
    // minLengthIdProgramaAcademico: number = 0;
    minLengthNombre: number = 6;
    // minLengthUsuarioId: number = 0;


    expRegLockInputDescripcionGrado: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9 \-]/g;
    expRegLockInputDescripcionTitulo: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9 \-]/g;
    expRegLockInputDetallePerfil: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9 \-]/g;
    // expRegLockInputIdProgramaAcademico: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9 \-]/g;
    expRegLockInputNombre: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9 \-]/g;
    // expRegLockInputUsuarioId: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9 \-]/g;
}