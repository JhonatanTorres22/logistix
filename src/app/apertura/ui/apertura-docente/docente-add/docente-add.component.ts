import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocenteValidation } from 'src/app/apertura/domain/validations/docente.validation';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputFechaComponent } from 'src/app/core/components/ui-input-fecha/ui-input-fecha.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { DeshabilitarInputsFormularioService } from 'src/app/core/services/deshabilitar-inputs-formulario.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-docente-add',
  standalone: true,
  imports: [CommonModule, SharedModule, UiButtonComponent, UiInputComponent, UiInputFechaComponent],
  templateUrl: './docente-add.component.html',
  styleUrl: './docente-add.component.scss'
})
export class DocenteAddComponent {

  formDocente: FormGroup
  listaCamposFormulario: string[] = ['nombre', 'apellidoPaterno','apellidoMaterno', 'fechaNacimiento', 'grado1', 'grado2', 'discapacidad']
  
  maxLengthNombre = this.docenteValidations.maxLengthNombre;
  minLengthNombre = this.docenteValidations.minLengthNombre;
  expRegLockToInputNombre = this.docenteValidations.expRegLockToInputNombre;

  maxLengthApellidos = this.docenteValidations.maxLengthApellidos;
  minLengthApellidos = this.docenteValidations.minLengthApellidos;
  expRegLockToInputApellidos = this.docenteValidations.expRegLockToInputApellidos;

  maxLengthGrados = this.docenteValidations.maxLengthGrados;
  minLengthGrados = this.docenteValidations.minLengthGrados;
  expRegLockToInputGrados = this.docenteValidations.expRegLockToInputGrados;

  maxLengthFechaNacimiento = this.docenteValidations.maxLengthFechaNacimiento;
  expRegLockToInputFechaNacimiento = this.docenteValidations.expRegLockToInputFechaNacimiento
  
  
  constructor(
    private docenteValidations: DocenteValidation,
    private deshabilitarInputsFormService: DeshabilitarInputsFormularioService,
  ){
    this.formDocente = new FormGroup ({
      nombre: new FormControl('', [Validators.required]),
      apellidoPaterno: new FormControl('', [Validators.required]),
      apellidoMaterno: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      grado1: new FormControl('', [Validators.required]),
      grado2: new FormControl('', [Validators.required]),
      discapacidad: new FormControl('', [Validators.required])
    });

    this.deshabilitarInputsFormService.inicializarInputs(this.formDocente, this.listaCamposFormulario, 0);
    this.deshabilitarInputsFormService.controlarInputs(this.formDocente, this.listaCamposFormulario)
  }


  filtrarFechaNacimiento = (d: Date | null): boolean => {
    if (!d) return false;
    const today = new Date();
    const birthDate = new Date(d);
    // Calcula la diferencia en años entre la fecha de hoy y la fecha seleccionada
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18 && age <= 80;
  };
}
