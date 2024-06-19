import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiInputFechaComponent } from 'src/app/core/components/ui-input-fecha/ui-input-fecha.component';
import { DateAdapter } from '@angular/material/core';
import { SemestreAcademicoValidations } from 'src/app/programas-academicos/domain/validations/semestre-academico.valitations';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputFechaRangeComponent } from 'src/app/core/components/ui-input-fecha-range/ui-input-fecha-range.component';
import { AlertService } from 'src/app/demo/services/alert.service';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiInputComponent, UiInputFechaRangeComponent, UiInputFechaComponent, UiButtonComponent ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  maxLengthNombre: number;
  minLengthNombre: number;
  expRegNombre: RegExp;
  expRegNombreToLockInput: RegExp;
  maxLengthCodigo: number;
  minLengthCodigo: number;
  expRegCodigo: RegExp;
  expRegCodigoToLockInput: RegExp;
  formSemestre: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>,
    private validation: SemestreAcademicoValidations,
    private alertaService: AlertService
  ) {

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.maxLengthNombre = this.validation.maxLengthNombre;
    this.minLengthNombre = this.validation.minLengthNombre;
    this.expRegNombre = this.validation.expRegNombre;
    this.expRegNombreToLockInput = this.validation.expRegNombreToLockInput;

    this.maxLengthCodigo = this.validation.maxLengthCodigo;
    this.minLengthCodigo = this.validation.minLengthCodigo;
    this.expRegCodigo = this.validation.expRegCodigo;
    this.expRegCodigoToLockInput = this.validation.expRegCodigoToLockInput;

    this.formSemestre = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthNombre), Validators.minLength(this.minLengthNombre), Validators.pattern(this.expRegNombre)]),
      codigo: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthCodigo), Validators.minLength(this.minLengthCodigo), Validators.pattern(this.expRegCodigo)]),
      fechaInicio: new FormControl('',[ Validators.required]),
      fechaFin: new FormControl('', [Validators.required]),
     })
  }

  itemToEdit: any;
  entidad: string = 'Semestre';

  onInput( event: any) {
    console.log(event);
    
  }

  onDateChanged( event: any, fecha: string) {
    console.log(event);
    
  }

  onSubmit() {

    if( this.formSemestre.invalid ) {
      this.alertaService.showAlert('El formulario está incompleto o no complen con los valores esperados')
      return;
    }
    console.log(this.formSemestre.value);

    this.alertaService.sweetAlert('question', 'Confirmación', 'Está seguro que desea guardar')
    
  }

}
