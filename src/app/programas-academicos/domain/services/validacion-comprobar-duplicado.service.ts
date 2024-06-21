import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacionComprobarDuplicadoService {

  constructor() { }


  duplicadoNombre<T>(control: AbstractControl, lista: T[], objetoEditar: T, propiedadNombre: keyof T): { [key: string]: boolean } | null {
    const listaNombres = lista.map(item => item[propiedadNombre]);
    const nombreIngresado = control.value;
    const nombreEnEdicion = objetoEditar ? objetoEditar[propiedadNombre] : '';
    const nombresFiltrados = listaNombres.filter(nombre => nombre !== nombreEnEdicion);
    
    if (nombresFiltrados.includes(nombreIngresado)) {
      return { codigoDuplicado: true };
    } else {
      return null;
    }
  } 
}
