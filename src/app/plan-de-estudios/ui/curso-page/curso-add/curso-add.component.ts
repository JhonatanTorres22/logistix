import { CommonModule } from '@angular/common';
import { Component, ViewChild, WritableSignal, effect } from '@angular/core';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { KanbanItem, KanbanProfile, KanbanColumn, KanbanUserStory, KanbanComment } from 'src/app/@theme/types/kanban-type';
import { uiModalTemplateData } from 'src/app/core/components/ui-modal/ui-modal.interface';
import { KanbanLayoutService } from 'src/app/demo/pages/application/kanban/kanban-layout.service';
import { KanbanService } from 'src/app/demo/pages/application/kanban/kanban.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Curso, CursoByCiclo, CursoCrear, CursoEditar } from 'src/app/plan-de-estudios/domain/models/curso.model';
import { CursoSingal } from 'src/app/plan-de-estudios/domain/signal/curso.signal';
import { CursoListComponent } from '../curso-list/curso-list.component';
import { UiModalTemplateComponent } from 'src/app/core/components/ui-modal-template/ui-modal-template.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { UiModalHeaderComponent } from 'src/app/core/components/ui-modal-template/ui-modal-header/ui-modal-header.component';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { UiSelectComponent } from 'src/app/core/components/ui-select/ui-select.component';
import { UiSelect } from 'src/app/core/components/ui-select/ui-select.interface';
import { CursoValidation } from 'src/app/plan-de-estudios/domain/validations/curso.validation';
import { AlertService } from 'src/app/demo/services/alert.service';
import { CursoRepository } from 'src/app/plan-de-estudios/domain/repositories/curso.repository';
import { Ciclo } from 'src/app/plan-de-estudios/domain/models/ciclo.model';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';


@Component({
  selector: 'curso-add',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiButtonComponent, UiInputComponent, UiSelectComponent ],
  templateUrl: './curso-add.component.html',
  styleUrl: './curso-add.component.scss'
})
export class CursoAddComponent {

  cursoDetails: WritableSignal<Curso> = this.signal.cursoSelect;
  cursoCicloSelect: WritableSignal<CursoByCiclo> = this.signal.cursoCicloSelect;

  maxLengthCodigoCurso: number = this.validation.maxLengthCodigoCurso;
  minLengthCodigoCurso: number = this.validation.minLengthCodigoCurso;
  expRegCodigoCurso: RegExp = this.validation.expRegCodigoCurso;
  expRegCodigoCursoBlockToInput: RegExp = this.validation.expRegCodigoCursoBlockToInput;

  maxLengthNombreCurso: number = this.validation.maxLengthNombreCurso;
  minLengthNombreCurso: number = this.validation.minLengthNombreCurso;
  expRegNombreCurso: RegExp = this.validation.expRegNombreCurso;
  expRegNombreCursoBlockToInput: RegExp = this.validation.expRegNombreCursoBlockToInput;

  maxLengthHorasTeoricas: number = this.validation.maxLengthHorasTeoricas;
  minLengthHorasTeoricas: number = this.validation.minLengthHorasTeoricas;
  expRegHorasTeoricas: RegExp = this.validation.expRegHorasTeoricas;
  expRegHorasTeoricasBlockToInput: RegExp = this.validation.expRegHorasTeoricasBlockToInput;

  maxLengthHorasPracticas: number = this.validation.maxLengthHorasPracticas;
  minLengthHorasPracticas: number = this.validation.minLengthHorasPracticas;
  expRegHorasPracticas: RegExp = this.validation.expRegHorasPracticas;
  expRegHorasPracticasBlockToInput: RegExp = this.validation.expRegHorasPracticasBlockToInput;

  maxLengthTotalHoras: number = this.validation.maxLengthTotalHoras;
  minLengthTotalHoras: number = this.validation.minLengthTotalHoras;
  expRegTotalHoras: RegExp = this.validation.expRegTotalHoras;
  expRegTotalHorasBlockToInput: RegExp = this.validation.expRegTotalHorasBlockToInput;

  maxLengthTotalCreditos: number = this.validation.maxLengthTotalCreditos;
  minLengthTotalCreditos: number = this.validation.minLengthTotalCreditos;
  expRegTotalCreditos: RegExp = this.validation.expRegTotalCreditos;
  expRegTotalCreditosBlockToInput: RegExp = this.validation.expRegTotalCreditosBlockToInput;

  optionsTipoEstudio = this.validation.optionsTipoEstudio;
  optionsTipoCurso = this.validation.optionsTipoCurso;
  optionsCompetencia = this.validation.optionsCompetencia;
  
  totalHorasModel: number;
  formCurso: FormGroup;
  // constructor
  constructor(
    private repository: CursoRepository,
    private signal: CursoSingal,
    private auth: AuthSignal,
    private modal: UiModalService,
    private validation: CursoValidation,
    private alert: AlertService
  ) {

    this.formCurso = new FormGroup({
      // programa: new FormControl('', [Validators.required]),
      // ciclo: new FormControl('', [Validators.required]),
      codigoCurso: new FormControl('', [ Validators.required, Validators.maxLength( this.maxLengthCodigoCurso ), Validators.minLength( this.minLengthCodigoCurso ), Validators.pattern(this.expRegCodigoCurso)]),
      nombreCurso: new FormControl('', [ Validators.required, Validators.maxLength( this.maxLengthNombreCurso ), Validators.minLength( this.minLengthNombreCurso ), Validators.pattern(this.expRegNombreCurso)]),
      tipoEstudio: new FormControl('', [ Validators.required ]),
      tipoCurso: new FormControl('', [ Validators.required]),
      competencia: new FormControl('', [ Validators.required]),
      horasTeoricas: new FormControl('', [ Validators.required, Validators.maxLength( this.maxLengthHorasTeoricas ), Validators.minLength( this.minLengthHorasTeoricas ), Validators.pattern(this.expRegHorasTeoricas)]),
      horasPracticas: new FormControl('', [ Validators.required, Validators.maxLength( this.maxLengthHorasPracticas ), Validators.minLength( this.minLengthHorasPracticas ), Validators.pattern(this.expRegHorasPracticas)]),
      // totalHoras: new FormControl('', [ Validators.required]),
      // totalCreditos: new FormControl('', [ Validators.required, Validators.maxLength( this.maxLengthTotalCreditos ), Validators.minLength( this.minLengthTotalCreditos ), Validators.pattern(this.expRegTotalCreditos)]),
     })
     
    //  this.formCurso ? this.pathValueFormEdit() : '';

    effect( () => {
    // this.cursoDetails().id != 0 ? this.task.toggle() : ''
      // this.task.toggle();
      this.cursoDetails
      console.log('Toggle...');
      
    })
  }

  // life cycle event
  ngOnInit() {

      this.formCurso ? this.pathValueFormEdit() : '';
 
  }

  onSubmit() {
    console.log('Guardando... ', this.formCurso.value);
    if( this.formCurso.invalid ) {
      this.alert.showAlert('El formulario esta incompleto o los datos ingresados no son válidos', 'error', 6);
      return
    }

    const tipo = this.cursoDetails().id != 0 ?'editar' : 'crear';
    switch( tipo ) {
      case 'crear': {
        const dataCurso: CursoCrear = {
          idCiclo: this.signal.cursoCicloSelect().idCiclo,
          codigoCurso: this.formCurso.value.codigoCurso,
          idCompetencia: this.formCurso.value.competencia,
          idTipoCurso: this.formCurso.value.tipoCurso,
          idTipoEstudio: this.formCurso.value.tipoEstudio,
          nombreCurso: this.formCurso.value.nombreCurso,
          horasTeoricas: this.formCurso.value.horasTeoricas,
          horasPracticas: this.formCurso.value.horasPracticas,
          totalHoras: parseInt( this.formCurso.value.horasTeoricas )  + parseInt( this.formCurso.value.horasPracticas ), 
          totalCreditos: ( this.formCurso.value.horasTeoricas * 1 ) + ( this.formCurso.value.horasPracticas * 0.5 ),
          usuarioId: parseInt( this.auth.currentRol().id )
        }
        console.log( dataCurso );
        return
        this.crear( dataCurso );
      }; break;
      
      case 'editar': {
        const dataCurso: CursoEditar = {
          id: this.cursoDetails().id,
          idCiclo: this.signal.cursoCicloSelect().idCiclo,
          codigoCurso: this.formCurso.value.codigoCurso,
          idCompetencia: this.formCurso.value.competencia,
          idTipoCurso: this.formCurso.value.tipoCurso,
          idTipoEstudio: this.formCurso.value.tipoEstudio,
          nombreCurso: this.formCurso.value.nombreCurso,
          horasTeoricas: this.formCurso.value.horasTeoricas,
          horasPracticas: this.formCurso.value.horasPracticas,
          totalHoras: parseInt( this.formCurso.value.horasTeoricas )  + parseInt( this.formCurso.value.horasPracticas ), 
          totalCreditos: ( this.formCurso.value.horasTeoricas * 1 ) + ( this.formCurso.value.horasPracticas * 0.5 ),
          usuarioId: parseInt( this.auth.currentRol().id )
          
        }
        this.editar( dataCurso )
      }
    }
  }

  pathValueFormEdit = () => {

    this.formCurso.patchValue({
      programa: this.cursoDetails().programa,
      ciclo: this.cursoDetails().ciclo,
      codigoCurso: this.cursoDetails().codigoCurso,
      nombreCurso: this.cursoDetails().nombreCurso,
      tipoEstudio: this.cursoDetails().tipoEstudio,
      tipoCurso: this.cursoDetails().tipoCurso,
      competencia: this.cursoDetails().competencia,
      horasTeoricas: this.cursoDetails().horasTeoricas.toString(),
      horasPracticas: this.cursoDetails().horasPracticas.toString(),
      // totalHoras: (parseInt(this.formCurso.value.horasPracticas) + parseInt(this.formCurso.value.horasTeoricas)).toString(),
      totalCreditos: this.cursoDetails().totalCreditos.toString()

    });

    this.totalHorasModel = (parseInt(this.formCurso.value.horasPracticas ) + parseInt(this.formCurso.value.horasTeoricas))

  }

  crear( curso: CursoCrear ) {
    this.repository.agregar( curso ).subscribe({
      next: ( data ) => {
        console.log( data );
        
      }, error: ( error ) => {
        console.log( error );
        
      }
    })
  }

  editar( curso: CursoEditar ) {
    this.repository.editar( curso ).subscribe({
      next: ( data ) => {
        console.log( data );
        
      }, error: ( error ) => {
        console.log( error );
        
      }
    })
  }

}
