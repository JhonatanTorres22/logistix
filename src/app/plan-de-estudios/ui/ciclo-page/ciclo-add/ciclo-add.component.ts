import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Ciclo } from 'src/app/plan-de-estudios/domain/models/ciclo.model';
import { CicloRepository } from 'src/app/plan-de-estudios/domain/repositories/ciclo.repository';
import { CicloSingal } from 'src/app/plan-de-estudios/domain/signal/ciclo.signal';
import { CicloValidation } from 'src/app/plan-de-estudios/domain/validations/ciclo.validation';

@Component({
  selector: 'ciclo-add',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiInputComponent, UiButtonComponent],
  templateUrl: './ciclo-add.component.html',
  styleUrl: './ciclo-add.component.scss'
})
export class CicloAddComponent implements OnInit {
  @Output() cerrarFormulario: EventEmitter<string> = new EventEmitter();

  @Input() cicloEdit: Ciclo;
  formCiclo: FormGroup;
  entidad: string = 'Ciclo';

  /* VALIDATIONS */
  MaxLengthCicloNumero = this.validations.MaxLengthCicloNumero;
  MinLengthCicloNumero = this.validations.MinLengthCicloNumero;
  expRegCicloNumero= this.validations.expRegCicloNumero;
  expRegCicloNumeroBlockToInput = this.validations.expRegCicloNumeroBlockToInput;

  MaxLengthCicloLetra = this.validations.MaxLengthCicloLetra;
  MinLengthCicloLetra = this.validations.MinLengthCicloLetra;
  expRegCicloLetra = this.validations.expRegCicloLetra;
  expRegCicloLetraBlockToInput = this.validations.expRegCicloLetraBlockToInput;

  MaxLengthDefinicion = this.validations.MaxLengthDefinicion;
  MinLengthDefinicion = this.validations.MinLengthDefinicion;
  expRegDefinicion = this.validations.expRegDefinicion;
  expRegDefinicionBlockToInput = this.validations.expRegDefinicionBlockToInput;

  /* VALIDATIONS */ 
  constructor(
    private signal: CicloSingal,
    private validations: CicloValidation,
    private alert: AlertService,
    private repository: CicloRepository
  ) {
    this.formCiclo = new FormGroup({
      cicloLetra: new FormControl('', [Validators.required]),
      cicloNumero: new FormControl('', [Validators.required]),
      definicion: new FormControl('', [Validators.required, validations.duplicado])
    })

    this.cicloEdit ? this.pathValueForm() : '';
  }
  ngOnInit(): void {
    this.cicloEdit ? this.pathValueForm() : '';

  }


  onSubmit() {
    const tipoAccionForm = this.cicloEdit.id != 0 ? 'Editar' : 'Crear';
    
    if( this.formCiclo.invalid ) {
      this.alert.showAlert('El formulario está incompleto o no complen con los valores esperados')
      return;
    }
    
    this.signal.setCicloAdd( this.formCiclo.value );

    this.alert.sweetAlert('question', 'Confirmación', `Está seguro que desea ${ tipoAccionForm } el semestre`)
      .then( isConfirm => {
        if( !isConfirm ) return;

        tipoAccionForm == 'Crear' ? this.agregar() : this.editar()

      });
  }

  agregar() {

    this.repository.agregar( this.formCiclo.value ).subscribe({
      next: ( data ) => {
        this.alert.sweetAlert('success', 'Correcto', 'Ciclo agregado correctamente');
        console.log(data);
        this.cerrarFormulario.emit('Add')
      }, error: ( error ) => {
        console.log( error );
        this.alert.sweetAlert('error', 'Error', 'Ocurrió un error al guardar:' + error);
        
      }
    });
  }

  editar() {
    const cicloEdit: Ciclo = {
      id: this.cicloEdit.id,
      ...this.formCiclo.value
    }
    this.repository.editar( cicloEdit ).subscribe({
      next:( data ) => {
        this.alert.sweetAlert('success', 'Correcto', 'Ciclo editado correctamente');
        this.cerrarFormulario.emit('Edit')

      }, error: ( error ) => {
        console.log(error);
        this.alert.sweetAlert('error', 'Error', 'Ocurrió un error al editar: ' + error);
      }
    })
  }
  

  cancelar = () => {
    console.log('ujhm');
    
    this.cerrarFormulario.emit('Cancelar')
  }


  pathValueForm() {
    this.formCiclo.patchValue({
      cicloNumero: this.cicloEdit.cicloNumero.trim(),
      cicloLetra: this.cicloEdit.cicloLetra.trim(),
      definicion: this.cicloEdit.definicion.trim(),

    });
  }

}
