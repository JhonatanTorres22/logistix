import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root'
})

export class AuthValidations {

    /* USERNAME */
    maxLengthUserName = 15;
    minLengthUserName = 8;
    expRegUserName = /[0-9]{8,15}/ ;
    expRegUserNameToLockInput = /^((?![0-9]$).)*$/;

    /* PASSWORD */
    maxLengthPassword = 15;
    minLengthPassword = 8;

    expRegPassword = / /;
    expRegPasswordToLockInput = / /;


    /* AUTHENTICATION */
    // errorLoginMes = 'El usuario o la contraseña es incorrecto'

    errorLogin( message: string ): string {
        let messageError = ''; 

        switch ( message ) {
            case 'Usuario o contraseña incorrectos': messageError = message;
            break;

            default: messageError = 'Ocurrió un error, comunicarse con el administrador....'
        }

        return messageError
    }
}