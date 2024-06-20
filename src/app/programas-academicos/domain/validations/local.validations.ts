import { Injectable } from "@angular/core";
import { LocalSignal } from "../signals/local.signal";
import { Local } from "../models/local.model";
import { AbstractControl } from "@angular/forms";


@Injectable({
    providedIn: 'root'
})

export class LocalValidations {
    listaLocales: Local[] = [];
    localEditar!: Local

    constructor( private signal: LocalSignal,){}

// INICIO NOMBRE    
    maxLengthNombre = 40;
    minLengthNombre = 3;
    expRegNombre = /[a-zA-Z0-9\- ]{0,40}/;
    expRegNombreToLockInput = /^((?![a-zA-Z0-9\- ]).)*$/;
    duplicarNombre = this.duplicarNombreLocal.bind(this)
// FIN NOMBRE


// INICIO CODIGO
    maxLengthCodigo = 6;
    minLengthCodigo = 20;
    expRegCodigo = /[a-zA-Z0-9\- ]{0,40}/
    expRegCodigoToLockInput = /^((?![a-zA-Z0-9\- ]).)*$/;
// FIN CODIGO

// INICIO LATITUD
    maxLengthLatitud = 6;
    minLengthLatitud = 6;
    expRegLatitud = /[a-zA-Z0-9\- ]{0,40}/
    expRegLatitudToLockInput = /^((?![a-zA-Z0-9\- ]).)*$/;
// FIN LATITUD

// INICIO LONGITUD
    maxLengthLongitud = 6;
    minLengthLongitud = 6;
    expRegLongitud = /[a-zA-Z0-9\- ]{0,40}/
    expRegLongitudToLockInput = /^((?![a-zA-Z0-9\- ]).)*$/;
// FIN LONGITUD

    listaNombreLocal: string[] = [];
    listaLatitudLocal: number[] = [];
    listaLongitudLocal: number[] = [];

    duplicarNombreLocal(control:AbstractControl){
        this.listaLocales = this.signal.localList();

        for(let i = 0 ; i< this.listaLocales.length; i++){
            this.listaNombreLocal.push(this.listaLocales[i].nombre);
            this.listaLatitudLocal.push(this.listaLocales[i].latitud);
            this.listaLongitudLocal.push(this.listaLocales[i].longitud);
        }

        this.localEditar = this.signal.localEdit();

        let nombreIngresado = control.value;
        let nombreEnEdicion = "";

        this.localEditar === undefined ? nombreEnEdicion = '' : nombreEnEdicion = this.localEditar.nombre;
        this.listaNombreLocal = this.listaNombreLocal.filter((listaNombreLocal:string) => listaNombreLocal !== nombreEnEdicion)
        
        if(this.listaNombreLocal.includes(nombreIngresado)){
            return { codigoDuplicado : true }
        } else { return null }
    
    }
}