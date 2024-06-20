import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { ProgramaSignal } from "../signals/programa.signal";
import { ProgramaFacultad } from "../models/programa.model";


@Injectable({
    providedIn: 'root'
})

export class ProgramaValidations {

    listaPrograma: ProgramaFacultad[] = [];
    programaEdit: ProgramaFacultad;
    constructor(private programaSignal: ProgramaSignal,){}

// INICIO NOMBRE    
    maxLengthNombre = 50;
    minLengthNombre = 5;
    expRegNombre = /[a-zA-Z0-9\- ]{0,40}/;
    expRegNombreToLockInput = /^((?![a-zA-Z0-9\- ]).)*$/;
    duplicado = this.duplicidadNombrePrograma.bind(this);
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
listaNombrePrograma: string[] = [];
nombreFiltroPrograma: string[] = [];
    duplicidadNombrePrograma(control:AbstractControl){
        this.listaPrograma = this.programaSignal.programasList();
        
        this.listaNombrePrograma = [];
        this.nombreFiltroPrograma = [];
        for(let i=0;i < this.listaPrograma.length; i++){
            this.listaNombrePrograma.push(this.listaPrograma[i].nombre);
        }
        
        this.programaEdit = this.programaSignal.programaEdit();
        let nombreIngresado = control.value;
        let nombreEnEdicion = "";

        this.programaEdit === undefined ? nombreEnEdicion = '' : nombreEnEdicion = this.programaEdit.nombre
        this.nombreFiltroPrograma = this.listaNombrePrograma.filter((listaNombrePrograma: string) => listaNombrePrograma !== nombreEnEdicion)
        
        if(this.nombreFiltroPrograma.includes(nombreIngresado)){
            return { codigoDuplicado : true}
        } else {return null ;}
    }

/* FIN DUPLICIDAD PROGRAMA */
}