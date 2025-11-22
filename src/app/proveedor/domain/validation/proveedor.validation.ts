import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ProveedorValidation {
    constructor() {}

    expRegNombreRs: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F][a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s\.]*[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F]$/;
    expRegRuc: RegExp = /^\d{11}$/
    expRegDireccionFiscal: RegExp = /^[a-zA-Z0-9áÁéÉíÍóÓúÚ\u00C0-\u017F0-9\s\-,.#()]*$/;

    maxLengthNombreRs: number = 100
    maxLengthRuc: number = 11
    maxLengthDireccionFiscal: number = 200
    
    minLengthNombreRs: number = 3
    minLengthRuc: number = 11
    minLengthDireccionFiscal: number = 10
}