import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { UiTextAreaComponent } from 'src/app/core/components/ui-text-area/ui-text-area.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { PlanEstudioValidation } from '../../domain/validations/plan-estudio.validation';
import { PlanEstudioSignal } from '../../domain/signal/plan-estudio.signal';
import { PlanEstudioAdd, PlanEstudioEditDE } from '../../domain/models/plan-estudio.model';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { PlanEstudioRepository } from '../../domain/repositories/plan-estudio.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';

@Component({
  selector: 'plan-estudio-add',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiInputComponent, UiTextAreaComponent, UiButtonComponent],
  templateUrl: './plan-estudio-add.component.html',
  styleUrl: './plan-estudio-add.component.scss'
})
export class PlanEstudioAddComponent implements OnInit {

  formPlanEstudio: FormGroup;
  planEstudio = this.signal.planEstudio;
  planEstudioEdit = this.signal.planEstudioEdit;
  
  expRegDescripcionGrado: RegExp = this.validation.expRegDescripcionGrado;
  expRegDescripcionTitulo: RegExp = this.validation.expRegDescripcionTitulo;
  expRegDetallePerfil: RegExp = this.validation.expRegDetallePerfil;
  expRegNombre: RegExp = this.validation.expRegNombre;
  maxLengthDescripcionGrado: number = this.validation.maxLengthDescripcionGrado;
  maxLengthDescripcionTitulo: number = this.validation.maxLengthDescripcionTitulo;
  maxLengthDetallePerfil: number = this.validation.maxLengthDetallePerfil;
  maxLengthNombre: number = this.validation.maxLengthNombre;
  minLengthDescripcionGrado: number = this.validation.minLengthDescripcionGrado;
  minLengthDescripcionTitulo: number = this.validation.minLengthDescripcionTitulo;
  minLengthDetallePerfil: number = this.validation.minLengthDetallePerfil;
  minLengthNombre: number = this.validation.minLengthNombre;
  expRegLockInputDescripcionGrado: RegExp = this.validation.expRegLockInputDescripcionGrado;
  expRegLockInputDescripcionTitulo: RegExp = this.validation.expRegLockInputDescripcionTitulo;
  expRegLockInputDetallePerfil: RegExp = this.validation.expRegLockInputDetallePerfil;
  expRegLockInputNombre: RegExp = this.validation.expRegLockInputNombre;


  constructor(
    private validation: PlanEstudioValidation,
    private authSignal: AuthSignal,
    private signal: PlanEstudioSignal,
    private repository: PlanEstudioRepository,
    private modal: UiModalService,
    private alert: AlertService
  ) {
    this.formPlanEstudio = new FormGroup({
      nombre: new FormControl('', [ Validators.required, Validators.maxLength( this.maxLengthNombre ), Validators.minLength( this.minLengthNombre ), Validators.pattern( this.expRegNombre )]),
      descripcionGrado: new FormControl('', [ Validators.required, Validators.maxLength( this.maxLengthDescripcionGrado), Validators.minLength( this.minLengthDescripcionGrado), Validators.pattern( this.expRegDescripcionGrado)]),
      descripcionTitulo: new FormControl('', [ Validators.required, Validators.maxLength( this.maxLengthDescripcionTitulo), Validators.minLength( this.minLengthDescripcionTitulo), Validators.pattern( this.expRegDescripcionTitulo) ]),
      detallePerfil: new FormControl('', [ Validators.required, Validators.maxLength( this.maxLengthDetallePerfil), Validators.minLength( this.minLengthDetallePerfil), Validators.pattern( this.expRegDetallePerfil)])
    })
  }
  ngOnInit(): void {
    console.log(this.planEstudioEdit());
    
    this.planEstudioEdit().id != 0 ? this.pathValueForm() : '';
  }


  onSubmit = () => {

    const accion: 'Editar' | 'Crear' = this.planEstudioEdit().id != 0 ? 'Editar' : 'Crear';

    if( this.formPlanEstudio.invalid ) {
      return
    }

    if( this.planEstudioEdit().id != 0 ) {

    }

    this.alert.sweetAlert('question', 'Confirmar', `¿Está seguro que desea ${ accion } el plan de estudio?`)
      .then( isConfirm => {
        if( !isConfirm ) { return }

        switch( accion ) {
          case 'Crear': {

            const newPlan: PlanEstudioAdd = {
              descripcionGrado: this.formPlanEstudio.value.descripcionGrado,
              descripcionTitulo: this.formPlanEstudio.value.descripcionTitulo,
              detallePerfil: this.formPlanEstudio.value.detallePerfil,
              idProgramaAcademico: 1,
              nombre: this.formPlanEstudio.value.nombre,
              usuarioId: parseInt( this.authSignal.currentRol().id )
        
            }
            console.log(this.formPlanEstudio.value);
    
            this.insertar( newPlan );

          }; break;

          case 'Editar': {
            const editPlan: PlanEstudioEditDE = {
              idPlanEstudio: this.planEstudioEdit().id,
              descripcionGrado: this.formPlanEstudio.value.descripcionGrado,
              descripcionTitulo: this.formPlanEstudio.value.descripcionTitulo,
              detallePerfil: this.formPlanEstudio.value.detallePerfil,
              nombre: this.formPlanEstudio.value.nombre,
              usuarioId: parseInt( this.authSignal.currentRol().id )
            }

            console.log( editPlan );
            
            this.editarDE( editPlan );
          }
        }

        
      });

    
  }


  insertar = ( newPlan: PlanEstudioAdd ) => {
    this.repository.insertar( newPlan ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alert.showAlert('Plan de estudios insertado de manera correcta', 'success', 6)
        this.modal.getRefModal().close('Add');
      }, error: ( error ) => {
        console.log( error );
        
        this.alert.showAlert('Ocurrió un error al insertar el plan de estudios', 'error', 6)
      } 
    })
  }

  editarDE = ( editPlan: PlanEstudioEditDE ) => {
    this.repository.editarDE( editPlan ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alert.showAlert('Plan de estudios fué editado de manera correcta', 'success', 6)
        this.modal.getRefModal().close('EditDE');
        
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al editar el plan de estudios', 'error', 6)

      }
    })
  }

  pathValueForm = () => {

    this.formPlanEstudio.patchValue({
      nombre: this.planEstudioEdit().nombre,
      descripcionGrado: this.planEstudioEdit().descripcionGrado,
      descripcionTitulo: this.planEstudioEdit().descripcionTitulo,
      detallePerfil: this.planEstudioEdit().detallePerfil,

    });

  }

}
