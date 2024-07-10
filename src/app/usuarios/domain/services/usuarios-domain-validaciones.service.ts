import { Injectable, signal } from "@angular/core";
import { TipoDocumento, Usuario } from "../models/usuario.model";
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";


@Injectable({
    providedIn: 'root'
})

export class UsuariosDomainValidacionesService {

    /* TIPO DOCUMENTO */
    tipoDocumento: TipoDocumento;

    set setTipoDocumento( tipoDocumentoSeleccionado: TipoDocumento ) {
        this.tipoDocumento = tipoDocumentoSeleccionado;
        switch( tipoDocumentoSeleccionado ) {
            case 'DNI': {
                this.maxLengthNumeroDocumento.set(8);
                this.minLengthNumeroDocumento.set(8);
            }; break;

            case 'CE': {
                this.maxLengthNumeroDocumento.set(15);
                this.minLengthNumeroDocumento.set(8);
            }; break;
            
            // default: this.maxLengthNumeroDocumento = 8;

        }
    }

    /* FIN TIPO DOCUMENTO */



    /* NÚMERO DE DOCUMENTO */
    maxLengthNumeroDocumento = signal(8);
    minLengthNumeroDocumento = signal(8);
    usuarioExistente: Usuario;

    get getMaxLength() {
        return this.maxLengthNumeroDocumento;
    }

    get getMinLength() {
        return this.minLengthNumeroDocumento;
    }

    numeroDocumentoIsValid = ( control: AbstractControl ) => {
        const numeroDocumento = control.value;
        return numeroDocumento.length < this.minLengthNumeroDocumento()
        ? { invalidMinLength: true }
        : numeroDocumento.length > this.maxLengthNumeroDocumento()
        ? { invalidMaxLength: true }
        : null
    }

    set setUsuarioExistente ( usuario: Usuario ) {
        this.usuarioExistente = usuario;
    }

    dniExistente = (  numeroDocumento: string ) => {
        
        return numeroDocumento != this.usuarioExistente?.numeroDocumento ? null : { numedoDocumentoExistente: true }
    }
    dniExistenteValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
        const numeroDocumento = control.value;
        if (numeroDocumento !== this.usuarioExistente?.numeroDocumento) {
          return null; // El número de documento es válido
        } else {
          return { numedoDocumentoExistente: true }; // El número de documento ya existe
        }
      }
    /* FIN NÚMERO DE DOCUMENTO */


    /* APELLIDOS */
    maxLengthApellidos: number = 25;
    maxLengthNombres: number = 25;
    minLengthApellidos: number = 3;
    minLengthNombres: number = 3;
    /* FECHA NACIMIENTO */
    EXP_REG_APELLIDO_AND_NOMBRES = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]/g;

    /* GENERAL */
    EXP_REG_SOLO_NUMEROS = /^[0-9]*$/;
    EXP_REG_SIN_ESPACIO = /\s/g
    EXP_REG_SIN_NUMERO = '^[a-zA-ZñÑáÁéÉíÍóÓúÚ\u00C0-\u017F ]*[a-zA-ZñÑáÁéÉíÍóÓúÚ\u00C0-\u017F]$';

    /* CORREOS */
    EXP_REG_CORREO = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    maxLengthCorreo: number = 40;
    // minLengthCorreo: number = 7;

    /* NUMERO DE CELULAR */
    pattern_celular = /^9\d{8}$/
    EXP_REG_CELULAR = /[^0-9]/g;
    maxLengthCelular = 9

    /* FECHA NACIMIENTO */
    EXP_REG_FECHA_NACIMIENTO = /[^0-9\/]/g;
    maxLengthFechaNacimiento = 10


    

    

    

}