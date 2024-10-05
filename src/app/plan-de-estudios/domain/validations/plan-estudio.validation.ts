import { Injectable } from "@angular/core";
import { PlanEstudioAdd } from "../models/plan-estudio.model";
import { AbstractControl } from "@angular/forms";
import { PlanEstudioSignal } from "../signal/plan-estudio.signal";
import { ValidacionComprobarDuplicadoService } from "src/app/programas-academicos/domain/services/validacion-comprobar-duplicado.service";

@Injectable({
    providedIn: 'root'
})

export class PlanEstudioValidation {
    constructor(
        private planEstudioSignal: PlanEstudioSignal,
        private validarDuplicadoService:ValidacionComprobarDuplicadoService
    ){}

    // data: PlanEstudioAdd = {
    //     descripcionGrado: '',
    //     descripcionTitulo: '',
    //     detallePerfil: '',
    //     idProgramaAcademico: 0,
    //     nombre: '',
    //     usuarioId: 0
    // }

    expRegDescripcionGrado: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F][a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s]*[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F]$/;
    expRegDescripcionTitulo: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F][a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s]*[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F]$/;
    expRegDetallePerfil: RegExp = /^[a-zA-Z]([a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\- ,.;:"]*)[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F(."\d\d)]$/;
    // expRegIdProgramaAcademico: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F].*\d$/;
    expRegNombre: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F][a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s-]*[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F]?(\d+)$/
    duplicadoNombre = this.duplicarNombrePlanEstudio.bind(this)
    // expRegUsuarioId: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F].*\d$/;


    maxLengthDescripcionGrado: number = 40;
    maxLengthDescripcionTitulo: number = 40;
    maxLengthDetallePerfil: number = 500;
    // maxLengthIdProgramaAcademico: number = 40;
    maxLengthNombre: number = 40;
    // maxLengthUsuarioId: number = 0;

    maxLengthResolucion: number = 40;
    minLengthResolucion: number = 10;
    expRegResolucion: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F].*$/;
    expRegLockInputResolucion: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9 \-]/g;
    
    // maxLengthUsuarioId: number = 0;


    minLengthDescripcionGrado: number = 10;
    minLengthDescripcionTitulo: number = 10;
    minLengthDetallePerfil: number = 10;
    // minLengthIdProgramaAcademico: number = 0;
    minLengthNombre: number = 6;
    // minLengthUsuarioId: number = 0;


    expRegLockInputDescripcionGrado: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]/g;
    expRegLockInputDescripcionTitulo: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]/g;
    expRegLockInputDetallePerfil: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9 \-,.;:]/g;
    // expRegLockInputIdProgramaAcademico: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9 \-]/g;
    expRegLockInputNombre: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9 \-]/g;
    // expRegLockInputUsuarioId: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9 \-]/g;

    duplicarNombrePlanEstudio(control:AbstractControl): { [key : string] : boolean} | null {
        const listaPlanesEstudio = this.planEstudioSignal.planesDeEstudio();
        const editarPlanEstudio = this.planEstudioSignal.planEstudioEdit();
        return this.validarDuplicadoService.duplicadoNombre(control, listaPlanesEstudio, editarPlanEstudio, 'nombre')
    }
}