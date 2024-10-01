import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { DeshabilitarInputsFormularioService } from 'src/app/core/services/deshabilitar-inputs-formulario.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Facultad } from 'src/app/programas-academicos/domain/models/facultad.model';
import { ProgramaCrear, ProgramaEditar, ProgramaFacultad } from 'src/app/programas-academicos/domain/models/programa.model';
import { ProgramaRepository } from 'src/app/programas-academicos/domain/repositories/programa.repository';
import { AsignacionSignal } from 'src/app/programas-academicos/domain/signals/asignacion.signal';
import { FacultadSignal } from 'src/app/programas-academicos/domain/signals/facultad.signal';
import { ProgramaSignal } from 'src/app/programas-academicos/domain/signals/programa.signal';
import { ProgramaValidations } from 'src/app/programas-academicos/domain/validations/programa.validations';

@Component({
  selector: 'programa-add',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiInputComponent, UiButtonComponent],
  templateUrl: './programa-add.component.html',
  styleUrl: './programa-add.component.scss',
  providers: [ DatePipe ]
})
export class ProgramaAcademicoAddComponent {

  @Input() programaEdit: ProgramaFacultad;
  @Output() cerrarFormulario: EventEmitter<string> = new EventEmitter();
  facultadSelect: WritableSignal<Facultad> = this.facultadSignal.facultadSelect

  asignaciones = this.asignacionSignal.asignaciones;

  maxLengthNombre: number;
  minLengthNombre: number;
  expRegNombre: RegExp;
  expRegNombreToLockInput: RegExp;
  maxLengthCodigo: number;
  minLengthCodigo: number;
  expRegCodigo: RegExp;
  expRegCodigoToLockInput: RegExp;
  formPrograma: FormGroup;

  expRegNombreBlockNumeroAndEspacio: string;

  listaCamposFormulario: string [] = ['nombre', 'definicion']

  // semestreAcademico = this.semestreAcademicoDomainService.semestresAcademicos;


  constructor(
    private deshabilitarInputsFormService:DeshabilitarInputsFormularioService,
    private asignacionSignal: AsignacionSignal,
    public dialogRef: MatDialogRef<ProgramaAcademicoAddComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>,
    private validation: ProgramaValidations,
    private alertService: AlertService,
    private repository: ProgramaRepository,
    private programaSignal: ProgramaSignal,
    private facultadSignal: FacultadSignal,
    private auth: AuthSignal,
    private datePipe: DatePipe
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

    this.expRegNombreBlockNumeroAndEspacio = this.validation.EXP_REG_SIN_NUMERO

    this.formPrograma = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthNombre), Validators.minLength(this.minLengthNombre), Validators.pattern(this.expRegNombreBlockNumeroAndEspacio), validation.duplicado]),
      definicion: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthCodigo), Validators.minLength(this.minLengthCodigo), Validators.pattern(this.expRegNombreBlockNumeroAndEspacio)]),

     })

     this.deshabilitarInputsFormService.inicializarInputs(this.formPrograma, this.listaCamposFormulario,0);
     this.deshabilitarInputsFormService.controlarInputs(this.formPrograma, this.listaCamposFormulario)

    // this.semestreEdit = data;
    this.programaEdit ? this.pathValueFormProgramaEdit() : '';
  }
  ngOnInit(): void {
    this.programaEdit ? this.pathValueFormProgramaEdit() : '';
  }

  

  itemToEdit: any;
  entidad: string = 'Programa';

  onInput = ( event: any) => {
    console.log(event);
    
  }

  onDateChanged = ( event: any, fecha: string) => {
    console.log(event);
    
  }

  onSubmit = () => {

    const tipoAccionForm = this.programaEdit.id != 0 ? 'Editar' : 'Crear';

    if( this.formPrograma.invalid ) {
      this.alertService.showAlert('El formulario está incompleto o no complen con los valores esperados')
      return;
    }

    this.alertService.sweetAlert('question', 'Confirmación', `Está seguro que desea ${ tipoAccionForm } la Programa`)
    .then( isConfirm => {
      if( !isConfirm ) return;

      switch( tipoAccionForm ) {
        case 'Crear': {
          const newPrograma = {
            ...this.formPrograma.value,
            idFacultad: this.facultadSelect().id,
            usuarioId: parseInt( this.auth.currentRol().id )
          }
          
          this.addPrograma( newPrograma )
        }; break;

        case 'Editar': {
          const editPrograma = {
            ...this.formPrograma.value,
            id: this.programaEdit.id,
            usuarioId: parseInt( this.auth.currentRol().id )
          }

          this.editPrograma( editPrograma )
        }
      }
      
    })
    
  }

  addPrograma = ( newPrograma: ProgramaCrear ) => {
    this.repository.agregarPrograma( newPrograma ).subscribe({
      next: (data) => {
        this.alertService.sweetAlert('success', 'Correcto', 'Semestre creado correctamente')

          this.programaEdit = {
            id: 0,
            definicion: '',
            nombre: '',
            usuarioId: 0,
          };
          this.cerrarFormulario.emit( 'Add' );
      }, error: ( error ) => {
        console.log(error);
        this.alertService.sweetAlert('error', 'Error', error);
    
      }
    })
  }

  editPrograma = ( editPrograma: ProgramaEditar ) => {
    this.repository.editarPrograma( editPrograma ).subscribe({
      next: ( data ) => {
        this.alertService.sweetAlert('success', 'Correcto', 'Semestre editado correctamente');
        const selectedPrograma = this.programaSignal.programaSelect();
        if (selectedPrograma.id === this.programaEdit.id) {
            this.programaSignal.setSelectPrograma(editPrograma);
        }
        this.asignaciones().forEach(asignacion => {
          asignacion.programas.forEach(programa => {
            if (programa.idPrograma === editPrograma.id) {
              programa.nombrePrograma = editPrograma.nombre;
            }
          });
        });
        this.programaEdit = {
          id: 0,
          definicion: '',
          nombre: '',
          usuarioId: 0,
        };
        this.cerrarFormulario.emit( 'Edit' );
      }, error: ( error ) => {
        console.log( error );
        this.alertService.sweetAlert('error', 'Error', error);
        
      }
    })
  }

  pathValueFormProgramaEdit = () => {

    this.formPrograma.patchValue({
      definicion: this.programaEdit.definicion,
      nombre: this.programaEdit.nombre,

    });

  }

  cancelarAdd = () => {
    this.cerrarFormulario.emit( 'Cancelar' );
  }

}
