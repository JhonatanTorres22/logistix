import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { PlanEstudioValidation } from '../../domain/validations/plan-estudio.validation';
import { PlanEstudio, PlanEstudioEditCU } from '../../domain/models/plan-estudio.model';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { PlanEstudioSignal } from '../../domain/signal/plan-estudio.signal';

@Component({
  selector: 'plan-estudio-aprobar-cu',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiInputComponent,],
  templateUrl: './plan-estudio-aprobar-cu.component.html',
  styleUrl: './plan-estudio-aprobar-cu.component.scss'
})
export class PlanEstudioAprobarCuComponent implements OnInit {

  @Input() planEstudio: PlanEstudio;

  isCompletedProcess = this.mensajeriaSignal.isCompletedProcess;
  planEstudioSinResolucion = this.signalPlanEstudio.planEstudioSinResolucion;
  planEstudioPorAprobar = this.signalPlanEstudio.planEstudioPorAprobar;


  formAprobarPlanCU: FormGroup;

  expRegResolucion: RegExp = this.validation.expRegResolucion;
  maxLengthResolucion: number = this.validation.maxLengthResolucion;
  minLengthResolucion: number = this.validation.minLengthResolucion;
  expRegLockInputResolucion: RegExp = this.validation.expRegLockInputResolucion;

  constructor(
    private validation: PlanEstudioValidation,
    private mensajeriaSignal: MensajeriaSignal,
    private signalPlanEstudio: PlanEstudioSignal
  ) {
    this.formAprobarPlanCU = new FormGroup({
      resolucion: new FormControl('', [ Validators.required ]),
      inicioVigencia: new FormControl('', [ Validators.required ]),
      finVigencia: new FormControl('', [ Validators.required ])
    });
  }
  ngOnInit(): void {
    this.isCompletedProcess.set( false );
  }


  onDateChanged = ( event: any, fecha: string) => {
    this.validarForm();
  }


  validarForm = () => {
    this.isCompletedProcess.set( this.formAprobarPlanCU.valid );
    if( this.formAprobarPlanCU.invalid) {
      return
    }
    const plan: PlanEstudioEditCU = {
      ...this.planEstudioSinResolucion(),
      ...this.formAprobarPlanCU.value
    }

    console.log( plan );
    

    this.planEstudioPorAprobar.set( plan );
  }

}
