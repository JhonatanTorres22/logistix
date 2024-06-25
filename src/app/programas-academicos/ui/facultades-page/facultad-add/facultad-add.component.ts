import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Facultad, FacultadCrear } from 'src/app/programas-academicos/domain/models/facultad.model';
import { FacultadRepository } from 'src/app/programas-academicos/domain/repositories/facultad.repository';
import { FacultadSignal } from 'src/app/programas-academicos/domain/signals/facultad.signal';
import { FacultadValidations } from 'src/app/programas-academicos/domain/validations/facultad.validations';

@Component({
  selector: 'facultad-add',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiInputComponent, UiButtonComponent ],
  templateUrl: './facultad-add.component.html',
  styleUrl: './facultad-add.component.scss',
  providers: [
    DatePipe
  ]
})
export class FacultadAddComponent {

  @Input() facultadEdit: Facultad;

  @Output() cerrarFormulario: EventEmitter<string> = new EventEmitter();

  maxLengthNombre: number;
  minLengthNombre: number;
  expRegNombre: RegExp;
  expRegNombreBlockNumeroAndEspacio: string;
  expRegNombreToLockInput: RegExp;
  maxLengthCodigo: number;
  minLengthCodigo: number;
  expRegCodigo: RegExp;
  expRegCodigoToLockInput: RegExp;
  formFacultad: FormGroup;



  // semestreAcademico = this.semestreAcademicoDomainService.semestresAcademicos;


  constructor(
    public dialogRef: MatDialogRef<FacultadAddComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>,
    private validation: FacultadValidations,
    private alertService: AlertService,
    private facultadRepository: FacultadRepository,
    private facultadSignal: FacultadSignal,
    private datePipe: DatePipe
  ) {

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

    

    this.maxLengthNombre = this.validation.maxLengthNombre;
    this.minLengthNombre = this.validation.minLengthNombre;
    this.expRegNombre = this.validation.expRegNombre;
    this.expRegNombreBlockNumeroAndEspacio = this.validation.EXP_REG_SIN_NUMERO;
    this.expRegNombreToLockInput = this.validation.expRegNombreToLockInput;
    

    this.maxLengthCodigo = this.validation.maxLengthCodigo;
    this.minLengthCodigo = this.validation.minLengthCodigo;
    this.expRegCodigo = this.validation.expRegCodigo;
    this.expRegCodigoToLockInput = this.validation.expRegCodigoToLockInput;

    this.formFacultad = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthNombre), Validators.minLength(this.minLengthNombre), Validators.pattern(this.expRegNombreBlockNumeroAndEspacio) ,validation.duplicado]),
      definicion: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthCodigo), Validators.minLength(this.minLengthCodigo), Validators.pattern(this.expRegNombreBlockNumeroAndEspacio)]),

     })

    // this.semestreEdit = data;
    this.facultadEdit ? this.pathValueFormFacultadEdit() : '';
  }
  ngOnInit(): void {
    this.facultadEdit ? this.pathValueFormFacultadEdit() : '';
  }

  

  itemToEdit: any;
  entidad: string = 'Facultad';

  onInput = ( event: any) => {
    console.log(event);
    
  }

  onDateChanged = ( event: any, fecha: string) => {
    console.log(event);
    
  }

  onSubmit = () => {

    const tipoAccionForm = this.facultadEdit.id != 0 ? 'Editar' : 'Crear';

    if( this.formFacultad.invalid ) {
      this.alertService.showAlert('El formulario está incompleto o no complen con los valores esperados')
      return;
    }
    console.log(this.formFacultad.value);

    this.alertService.sweetAlert('question', 'Confirmación', `Está seguro que desea ${ tipoAccionForm } la Facultad`)
    .then( isConfirm => {
      if( !isConfirm ) return;

      switch( tipoAccionForm ) {
        case 'Crear': {
          const newFacultad = {
            ...this.formFacultad.value,
            usuarioId: 1
          }
          
          this.addFacultad( newFacultad )
        }; break;

        case 'Editar': {
          const editFacultad = {
            ...this.formFacultad.value,
            id: this.facultadEdit.id,
            usuarioId: 1
          }

          this.editFacultad( editFacultad )
        }
      }
      
    })
    
  }

  addFacultad = ( newFacultad: FacultadCrear ) => {
    this.facultadRepository.agregarFacultad( newFacultad ).subscribe({
      next: (data) => {
        this.alertService.sweetAlert('success', 'Correcto', 'Semestre creado correctamente')

          this.facultadEdit = {
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

  editFacultad = ( editFacultad: Facultad ) => {
    this.facultadRepository.editarFacultad( editFacultad ).subscribe({
      next: ( data ) => {
        this.alertService.sweetAlert('success', 'Correcto', 'Semestre editado correctamente');
        this.facultadSignal.setSelectFacultad(editFacultad)

        this.facultadEdit = {
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

  pathValueFormFacultadEdit = () => {

    this.formFacultad.patchValue({
      definicion: this.facultadEdit.definicion,
      nombre: this.facultadEdit.nombre,

    });

  }

  cancelarAdd = () => {
    this.cerrarFormulario.emit( 'Cancelar' );
  }

}
