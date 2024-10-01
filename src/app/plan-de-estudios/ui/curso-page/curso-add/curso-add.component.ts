import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, WritableSignal, effect } from '@angular/core';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { KanbanItem, KanbanProfile, KanbanColumn, KanbanUserStory, KanbanComment } from 'src/app/@theme/types/kanban-type';
import { uiModalTemplateData } from 'src/app/core/components/ui-modal/ui-modal.interface';
import { KanbanLayoutService } from 'src/app/demo/pages/application/kanban/kanban-layout.service';
import { KanbanService } from 'src/app/demo/pages/application/kanban/kanban.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Curso, CursoByCiclo, CursoCrear, CursoEditar, CursoRenovar } from 'src/app/plan-de-estudios/domain/models/curso.model';
import { CursoSignal } from 'src/app/plan-de-estudios/domain/signal/curso.signal';
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
import { CicloRepository } from 'src/app/plan-de-estudios/domain/repositories/ciclo.repository';

import { DeshabilitarInputsFormularioService } from 'src/app/core/services/deshabilitar-inputs-formulario.service';

import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { UiButtonIconComponent } from "../../../../core/components/ui-button-icon/ui-button-icon.component";



@Component({
  selector: 'curso-add',
  standalone: true,
  imports: [CommonModule, SharedModule, UiButtonComponent, UiInputComponent, UiSelectComponent, UiButtonIconComponent],
  templateUrl: './curso-add.component.html',
  styleUrl: './curso-add.component.scss'
})
export class CursoAddComponent {

  @Input() readonlyCiclo: boolean = false;
  prefijoCodigoCurso: string = '';
  codigoCursoAnterior: string = '';

  cursoDetails: WritableSignal<Curso> = this.signal.cursoSelect;
  cursoCicloSelect: WritableSignal<CursoByCiclo> = this.signal.cursoCicloSelect;
  cursoOption = this.signal.cursoOption;
  idPrograma = this.planEstudioSignal.programaId;


  maxLengthCodigoCurso: number = this.validation.maxLengthCodigoCurso;
  minLengthCodigoCurso: number = this.validation.minLengthCodigoCurso;
  expRegCodigoCurso: RegExp = this.validation.expRegCodigoCurso;
  expRegCodigoCursoBlockToInput: RegExp = this.validation.expRegCodigoCursoBlockToInput;

  maxLengthNombreCurso: number = this.validation.maxLengthNombreCurso;
  minLengthNombreCurso: number = this.validation.minLengthNombreCurso;
  expRegNombreCurso: RegExp = this.validation.expRegNombreCurso;
  expRegNombreCursoBlockToInput: RegExp = this.validation.expRegNombreCursoBlockToInput;

  maxLengthDescripcion: number = this.validation.maxLengthDescripcion;
  minLengthDescripcion: number = this.validation.minLengthDescripcion;
  expRegDescripcion: RegExp = this.validation.expRegDescripcion;
  expRegDescripcionBlockToInput: RegExp = this.validation.expRegDescripcionBlockToInput;

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

  minTotalHoras = this.validation.minTotalHoras;
  minCredtios = this.validation.minCreditos;
  
  optionsCiclos: UiSelect[] = [];
  totalHorasModel: number;
  formCurso: FormGroup;
  listaCamposFormulario: string[] = ['idCiclo', 'codigoCurso', 'nombreCurso', 'descripcion',
    'tipoEstudio', 'tipoCurso', 'competencia', 'horasTeoricas','horasPracticas', 
    'totalHoras', 'totalCreditos' 
  ]
  // constructor
  constructor(
    private deshabilitarInputsFormService:DeshabilitarInputsFormularioService,
    private repository: CursoRepository,
    private signal: CursoSignal,
    private auth: AuthSignal,
    private modal: UiModalService,
    private validation: CursoValidation,
    private planEstudioSignal: PlanEstudioSignal,
    private cicloRepository: CicloRepository,
    private alert: AlertService
  ) {

    this.formCurso = new FormGroup({
      // programa: new FormControl('', [Validators.required]),
      idCiclo: new FormControl('', [Validators.required]),
      codigoCursoAnterior: new FormControl(''),
      codigoCurso: new FormControl('', [ Validators.required, Validators.maxLength( this.maxLengthCodigoCurso ), Validators.minLength( this.minLengthCodigoCurso ), Validators.pattern(this.expRegCodigoCurso), validation.duplicado]),
      nombreCurso: new FormControl('', [ Validators.required, Validators.maxLength( this.maxLengthNombreCurso ), Validators.minLength( this.minLengthNombreCurso ), Validators.pattern(this.expRegNombreCurso), validation.duplicado]),
      descripcion: new FormControl('', [Validators.required, Validators.pattern(this.expRegDescripcion)]),
      tipoEstudio: new FormControl('', [ Validators.required ]),
      tipoCurso: new FormControl('', [ Validators.required]),
      competencia: new FormControl('', [ Validators.required]),
      horasTeoricas: new FormControl('', [ Validators.required, Validators.maxLength( this.maxLengthHorasTeoricas ), Validators.minLength( this.minLengthHorasTeoricas ), Validators.pattern(this.expRegHorasTeoricas)]),
      horasPracticas: new FormControl('', [ Validators.required, Validators.maxLength( this.maxLengthHorasPracticas ), Validators.minLength( this.minLengthHorasPracticas ), Validators.pattern(this.expRegHorasPracticas)]),
      totalHoras: new FormControl('', [ Validators.required, Validators.min(this.minTotalHoras)]),
      totalCreditos: new FormControl('', [ Validators.required, Validators.min(this.minCredtios),Validators.maxLength( this.maxLengthTotalCreditos ), Validators.minLength( this.minLengthTotalCreditos ), Validators.pattern(this.expRegTotalCreditos)]),
     })
     
     this.deshabilitarInputsFormService.inicializarInputs(this.formCurso, this.listaCamposFormulario,0);
     this.deshabilitarInputsFormService.controlarInputs(this.formCurso, this.listaCamposFormulario)
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
    // console.log( this.cursoCicloSelect() );
    
    this.obtenerCiclos().then( res  => {
      if( !res ) { return }
      this.formCurso.patchValue({
        // idCiclo: this.cursoCicloSelect().idCiclo.toString()
        idCiclo: this.optionsCiclos.find( ciclo => ciclo.value == this.cursoCicloSelect().idCiclo.toString() )

      })
    });
    console.log( this.formCurso);
      const cursoFormPathValue = this.cursoDetails().id != 0 ? this.cursoDetails() : this.cursoOption().id != 0 ? this.cursoOption() : '';
      // this.formCurso ? this.pathValueFormEdit( cursoFormPathValue ) : '';
      cursoFormPathValue ? this.pathValueFormEdit( cursoFormPathValue ) : '';
      this.cursoOption().id != 0 ? this.formCurso.controls['codigoCursoAnterior'].disable() : '';
      this.codigoCursoAnterior = this.cursoOption().codigoCurso;
      this.cursoDetails().id != 0 ? this.prefijoCodigoCurso = this.cursoDetails().codigoCurso : this.prefijoCodigoCurso = 'P'
 
  }

  obtenerCiclos() {

    return new Promise<boolean>( (resolve, reject) => {

      this.cicloRepository.obtener().subscribe({
        next: ( ciclos ) => {
          console.log( ciclos );
          const ciclosOptions: UiSelect[] = ciclos.map( ciclo => {
            return {
              value: ciclo.id.toString(),
              text: ciclo.cicloLetra,
              disabled: false
            }
          })
          resolve(true);
          this.optionsCiclos = ciclosOptions;
        }, error: ( error ) => {
          console.log( error );
          this.alert.showAlert('Ocurrió un error al obtener los ciclos', 'error', 6);
          resolve(false);
        }
      })

    })
  }

  limpiar = () => {
    this.formCurso.patchValue({
      nombreCurso: '',
      descripcion: '',
      tipoEstudio: '',
      tipoCurso: '',
      competencia: '',
      horasTeoricas: '',
      horasPracticas: '',
      totalHoras: '',
      totalCreditos: ''
    });
  }

  onSubmit() {

    

    console.log('Guardando... ', this.formCurso.value);
    if( this.formCurso.invalid ) {
      this.alert.showAlert('El formulario esta incompleto o los datos ingresados no son válidos', 'error', 6);
      return
    }

    if( this.cursoOption().id != 0 ) {
      console.log( this.cursoOption() );
      
      const cursoRenovar: CursoRenovar = {
        ...this.formCurso.value,
        idPrograma: this.idPrograma(), //TODO CAMBIAR AL PROGRAMA DEL DIRECTOR
        idCiclo: parseInt( this.formCurso.value.idCiclo.value ),
        competencia: this.formCurso.value.competencia.value,
        tipoCurso: this.formCurso.value.tipoCurso.value,
        tipoEstudio: this.formCurso.value.tipoEstudio.value,
        horasTeoricas: parseInt( this.formCurso.value.horasTeoricas ),
        horasPracticas: parseInt( this.formCurso.value.horasPracticas ),
        cursoId: this.cursoOption().id,
        usuarioId: parseInt( this.auth.currentRol().id )
      }

      this.alert.sweetAlert('question', 'Confirmar', `¿Está seguro que desea Renovar el curso?`)
      .then( isConfirm => {
        if( !isConfirm ) { return }

        this.renovar( cursoRenovar );
        console.log( cursoRenovar );
        return
        
      })

      return
      
    } 

    const tipo = this.cursoDetails().id != 0 ?'editar' : 'crear';
    this.alert.sweetAlert('question', 'Confirmar', `¿Está seguro que desea ${ tipo } el curso?`)
      .then( isConfirm => {
        if( !isConfirm ) { return }
        
        switch( tipo ) {
          case 'crear': {
            const dataCurso: CursoCrear = {
              idCiclo: parseInt( this.formCurso.value.idCiclo.value ),
              descripcion: this.formCurso.value.descripcion,
              idPrograma: this.idPrograma(), //TODO CAMBIAR AL PROGRAMA DEL DIRECTOR
              codigoCurso: this.formCurso.value.codigoCurso,
              competencia: this.formCurso.value.competencia.value,
              tipoCurso: this.formCurso.value.tipoCurso.value,
              tipoEstudio: this.formCurso.value.tipoEstudio.value,
              nombreCurso: this.formCurso.value.nombreCurso,
              horasTeoricas: parseInt( this.formCurso.value.horasTeoricas ),
              horasPracticas: parseInt( this.formCurso.value.horasPracticas ),
              totalHoras: parseInt( this.formCurso.value.horasTeoricas )  + parseInt( this.formCurso.value.horasPracticas ), 
              totalCreditos: parseInt( this.formCurso.value.totalCreditos),
              usuarioId: parseInt( this.auth.currentRol().id )
            }
            console.log( dataCurso );
            // return
            this.crear( dataCurso );
          }; break;
          
          case 'editar': {
            const dataCurso: CursoEditar = {
              descripcion: this.formCurso.value.descripcion,
              idPrograma: 1,
              id: this.cursoDetails().id,
              // idCiclo: parseInt( this.formCurso.value.idCiclo ),
              codigoCurso: this.formCurso.value.codigoCurso,
              competencia: this.formCurso.value.competencia.value,
              tipoCurso: this.formCurso.value.tipoCurso.value,
              tipoEstudio: this.formCurso.value.tipoEstudio.value,
              nombreCurso: this.formCurso.value.nombreCurso,
              horasTeoricas: this.formCurso.value.horasTeoricas,
              horasPracticas: this.formCurso.value.horasPracticas,
              totalHoras: parseInt( this.formCurso.value.horasTeoricas )  + parseInt( this.formCurso.value.horasPracticas ), 
              totalCreditos: parseInt( this.formCurso.value.totalCreditos),
              usuarioId: parseInt( this.auth.currentRol().id )
              
            }
            this.editar( dataCurso )
          }
        }

      })

    
  }

  calcular() {
    console.log( this.formCurso.value.horasTeoricas );
    const total = parseInt( this.formCurso.value.horasTeoricas ) + parseInt( this.formCurso.value.horasPracticas );
    const totalCreditos = parseInt( this.formCurso.value.horasTeoricas ) + (parseInt( this.formCurso.value.horasPracticas ) / 2) ?? 0;
    this.formCurso.patchValue({
      totalHoras: total,
      totalCreditos: totalCreditos
    });
    
  }

  pathValueFormEdit = ( curso: Curso ) => {

    const tipoCurso = this.optionsTipoCurso.find( tipo => tipo.value == curso.tipoCurso );
    const tipoEstudio = this.optionsTipoEstudio.find( tipo => tipo.value == curso.tipoEstudio );
    const competencia = this.optionsCompetencia.find( tipo => tipo.value == curso.competencia );

    this.formCurso.patchValue({
      programa: curso.idPrograma,
      ciclo: curso.idCiclo,
      codigoCurso: curso.codigoCurso,
      nombreCurso: curso.nombreCurso,
      descripcion: curso.descripcion,
      tipoEstudio: tipoEstudio,
      tipoCurso: tipoCurso,
      competencia: competencia,
      horasTeoricas: curso.horasTeoricas.toString(),
      horasPracticas: curso.horasPracticas.toString(),
      totalHoras: curso.totalHoras.toString(),
      totalCreditos: curso.totalCreditos.toString()

    });

    this.totalHorasModel = (parseInt(this.formCurso.value.horasPracticas ) + parseInt(this.formCurso.value.horasTeoricas))

  }

  crear( curso: CursoCrear ) {
    this.repository.agregar( curso ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alert.showAlert('Curso agregado de manera correcta', 'success', 6);
        this.modal.getRefModal().close('Add');
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al agregar el curso', 'error', 6)
      }
    })
  }

  editar( curso: CursoEditar ) {
    // this.alert.sweetAlert('info', 'ATENCIÓN', 'Aun no hay API para editar un curso.....')
    // console.log( curso );
    
    this.repository.editar( curso ).subscribe({
      next: ( data ) => {
        console.log( data );  
        this.alert.showAlert('Curso editado de manera correcta', 'success', 6);
        this.modal.getRefModal().close('Edit');
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al agregar el curso', 'error', 6);
      }
    })
  }

  renovar = ( curso: CursoRenovar ) => {
    this.repository.renovar( curso ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alert.showAlert('Curso renovado de manera correcta', 'success', 6);
        this.modal.getRefModal().close('Renovar');
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al renovar el curso', 'error', 6);
      }
    })
  }
}
