import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon } from 'sweetalert2'
import { tipoAlerta } from "./alert.interface";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})


export class AlertService {

    constructor(
        private snackBar: MatSnackBar
    ) { }

    showAlert(mensaje: string, tipo: tipoAlerta = 'default', duracion: number = 5, positionV: MatSnackBarVerticalPosition = 'bottom', positionH: MatSnackBarHorizontalPosition = 'right') {
        this.snackBar.open(mensaje, 'x', {
            horizontalPosition: positionH,
            verticalPosition: positionV,
            duration: duracion * 1000, panelClass: ['snackbar-'+tipo]});
            // console.log('Show Alert');
    
      }


    sweetAlert(icon: SweetAlertIcon , title?: string, text?: string,confirmButtonText: string = 'Entendido') {

        return new Promise<boolean>((resolve, reject) => {
    
          switch(icon) {
            case 'question': {
              Swal.fire({ icon: icon, title: title, text: text, confirmButtonText: 'SI, CONTINUAR', showCancelButton: true,
              confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', cancelButtonText: 'CANCELAR', allowEnterKey: false, allowEscapeKey: false, allowOutsideClick: false
              }).then( result => {
                  result.isConfirmed ? resolve(true) : resolve(false)
                }); break;
             }
             case 'success': {
              Swal.fire({ icon: icon, title: title, text: text,  confirmButtonText: confirmButtonText, showCancelButton: false,
              confirmButtonColor: '#3085d6', allowEnterKey: false, allowEscapeKey: false, allowOutsideClick: false}).then( result => {
                console.log(result);
                result.isConfirmed ? resolve(true) : resolve(false)
                }); break;
            }
            case 'error': {
              Swal.fire({
                icon: icon,
                title: 'No fue posible conectarse al servidor',
                text: 'Ocurrió un error al comunicarnos con el servidor, vuelva a intentarlo en unos minutos, si el problema persiste, comunicarse con el Administrador.'
              }); break;
            }
    
            case 'warning': {
              Swal.fire({
                icon: icon, title: title, text: text, confirmButtonText: 'AGREGAR METAS', showCancelButton: true,
                confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', cancelButtonText: 'CANCELAR',
                allowEnterKey: false, allowEscapeKey: false, allowOutsideClick: false
              }).then( result => {
                result.isConfirmed ? resolve(true) : resolve(false)
              }); break;
            }
    
            case 'info': {
              Swal.fire({
                icon: icon, title: title, text: text, confirmButtonText: confirmButtonText, showCancelButton: false,
                confirmButtonColor: '#3085d6', allowEnterKey: false, allowEscapeKey: false, allowOutsideClick: false
              }).then( result => {
                result.isConfirmed ? resolve(true) : resolve(false)
              }); break;
            }
    
          }
        })
      }

}