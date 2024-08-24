import { CommonModule } from '@angular/common';
import { Component, effect, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { PlanEstudioValidation } from '../../domain/validations/plan-estudio.validation';
import { PlanEstudio, PlanEstudioEditCU } from '../../domain/models/plan-estudio.model';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { PlanEstudioSignal } from '../../domain/signal/plan-estudio.signal';
import { UiUploaderFilesComponent } from 'src/app/core/components/ui-uploader-files/ui-uploader-files.component';

@Component({
  selector: 'plan-estudio-aprobar-cu',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiInputComponent, UiUploaderFilesComponent],
  templateUrl: './plan-estudio-aprobar-cu.component.html',
  styleUrl: './plan-estudio-aprobar-cu.component.scss'
})
export class PlanEstudioAprobarCuComponent implements OnInit {

  @Input() planEstudio: PlanEstudio;

  isCompletedProcess = this.mensajeriaSignal.isCompletedProcess;
  planEstudioSinResolucion = this.signalPlanEstudio.planEstudioSinResolucion;
  planEstudioPorAprobar = this.signalPlanEstudio.planEstudioPorAprobar;
  file = this.mensajeriaSignal.file;

  formAprobarPlanCU: FormGroup;

  expRegResolucion: RegExp = this.validation.expRegResolucion;
  maxLengthResolucion: number = this.validation.maxLengthResolucion;
  minLengthResolucion: number = this.validation.minLengthResolucion;
  expRegLockInputResolucion: RegExp = this.validation.expRegLockInputResolucion;

  constructor(
    private validation: PlanEstudioValidation,
    private mensajeriaSignal: MensajeriaSignal,
    private signalPlanEstudio: PlanEstudioSignal,
    
  ) {

    effect ( () => {
      console.log( this.file() );
      this.validarForm();
    }, { allowSignalWrites: true })

    this.formAprobarPlanCU = new FormGroup({
      resolucion: new FormControl('', [ Validators.required ]),
      inicioVigencia: new FormControl('', [ Validators.required ]),
      finVigencia: new FormControl('', [ Validators.required ]),
    });
  }
  ngOnInit(): void {
    this.isCompletedProcess.set( false );
  }


  onDateChanged = ( event: any, fecha: string) => {
    this.validarForm();
  }


  validarForm = () => {
    this.isCompletedProcess.set( this.formAprobarPlanCU.valid && this.file().files.length > 0 );
    if( this.formAprobarPlanCU.invalid && this.file().files.length == 0) {
      console.log( this.file().files.length );
      
      return
    }
    const plan: PlanEstudioEditCU = {
      ...this.planEstudioSinResolucion(),
      ...this.formAprobarPlanCU.value,
      archivo: this.file().files[0]
    }

    console.log( plan );
    

    this.planEstudioPorAprobar.set( plan );
  }

}
