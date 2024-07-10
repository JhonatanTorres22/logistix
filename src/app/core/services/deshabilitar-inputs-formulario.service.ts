import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DeshabilitarInputsFormularioService {

  constructor() { }

  inicializarInputs(form: FormGroup, fieldOrder: string[], initialEnabledIndex: number = 0): void {
    // Deshabilita todos los campos excepto el campo en el índice inicial
    this.deshabilitarInputs(form, fieldOrder, initialEnabledIndex + 1);
  }

  controlarInputs(form: FormGroup, fieldOrder: string[]): void {
    fieldOrder.forEach((field, index) => {
      form.get(field)?.valueChanges.subscribe(() => {
        this.validarYHabilitarSiguiente(form, fieldOrder, field, index);
      });
    });
  }

  validarYHabilitarSiguiente(form: FormGroup, fieldOrder: string[], currentField: string, currentIndex: number): void {
    const isValid = form.get(currentField)?.valid;
    const hasExistingDocumentError = form.get(currentField)?.hasError('existingDocument');
    if (isValid) {
      if (currentIndex < fieldOrder.length - 1) {
        const nextField = fieldOrder[currentIndex + 1];
        form.get(nextField)?.enable();
      }
    } else {
      // Si el campo actual no es válido, mantiene deshabilitados los campos siguientes
      this.deshabilitarInputs(form, fieldOrder, currentIndex + 1);
    }
  }

   deshabilitarInputs(form: FormGroup, fieldOrder: string[], startIndex: number): void {
    for (let i = startIndex; i < fieldOrder.length; i++) {
      form.get(fieldOrder[i])?.disable();
    }
  }
}
