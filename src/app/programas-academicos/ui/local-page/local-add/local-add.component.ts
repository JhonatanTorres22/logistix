import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Local, LocalCrear } from 'src/app/programas-academicos/domain/models/local.model';
import { LocalRepository } from 'src/app/programas-academicos/domain/repositories/local.repository';
import { AsignacionSignal } from 'src/app/programas-academicos/domain/signals/asignacion.signal';
import { LocalSignal } from 'src/app/programas-academicos/domain/signals/local.signal';
import { LocalValidations } from 'src/app/programas-academicos/domain/validations/local.validations';

@Component({
  selector: 'local-add',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiInputComponent, UiButtonComponent],
  templateUrl: './local-add.component.html',
  styleUrl: './local-add.component.scss',
  providers: [
    DatePipe
  ]
})
export class LocalAddComponent {

  @Input() localEdit: Local;
  @Output() cerrarFormulario: EventEmitter<string> = new EventEmitter();
  localSelect: WritableSignal<Local> = this.signal.localSelect
  localesSelect: WritableSignal<Local[]> = this.signal.localesSelect;
  asignaciones = this.asignacionSignal.asignaciones;

  maxLengthNombre: number;
  minLengthNombre: number;
  expRegNombre: RegExp;
  expRegNombreToLockInput: RegExp;
  
  maxLengthDefinicion: number;
  minLengthDefinicion: number;
  expRegDefinicion: RegExp;
  expRegDefinicionToLockInput: RegExp;
  
  maxLengthLatitud: number;
  minLengthLatitud: number;
  expRegLatitud: RegExp;
  expRegLatitudToLockInput: RegExp;

  maxLengthLongitud: number;
  minLengthLongitud: number;
  expRegLongitud: RegExp;
  expRegLongitudToLockInput: RegExp;
  
  formLocal: FormGroup;



  // semestreAcademico = this.semestreAcademicoDomainService.semestresAcademicos;

  
  constructor(
    private asignacionSignal: AsignacionSignal,
    private repository: LocalRepository,
    public dialogRef: MatDialogRef<LocalAddComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>,
    private validation: LocalValidations,
    private alertService: AlertService,
    private signal: LocalSignal,
    private datePipe: DatePipe
  ) {

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

    

    this.maxLengthNombre = this.validation.maxLengthNombre;
    this.minLengthNombre = this.validation.minLengthNombre;
    this.expRegNombre = this.validation.expRegNombre;
    this.expRegNombreToLockInput = this.validation.expRegNombreToLockInput;

    this.maxLengthDefinicion = this.validation.maxLengthDefinicion;
    this.minLengthDefinicion = this.validation.minLengthDefinicion;
    this.expRegDefinicion = this.validation.expRegDefinicion;
    this.expRegDefinicionToLockInput = this.validation.expRegDefinicionToLockInput;

    this.maxLengthLatitud = this.validation.maxLengthLatitud;
    this.minLengthLatitud = this.validation.minLengthLatitud;
    this.expRegLatitud = this.validation.expRegLatitud;
    this.expRegLatitudToLockInput = this.validation.expRegLatitudToLockInput;

    this.maxLengthLongitud = this.validation.maxLengthLongitud;
    this.minLengthLongitud = this.validation.minLengthLongitud;
    this.expRegLongitud = this.validation.expRegLongitud;
    this.expRegLongitudToLockInput = this.validation.expRegLongitudToLockInput;

    this.formLocal = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthNombre), Validators.minLength(this.minLengthNombre), Validators.pattern(this.expRegNombre), validation.duplicarNombre]),
      definicion: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthDefinicion), Validators.minLength(this.minLengthDefinicion), Validators.pattern(this.expRegDefinicion)]),
      latitud: new FormControl('', [ Validators.required, Validators.maxLength(this.maxLengthLatitud), Validators.minLength(this.minLengthLatitud), Validators.pattern(this.expRegLatitud)]),
      longitud: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthLongitud), Validators.minLength(this.minLengthLongitud), Validators.pattern(this.expRegLongitud)])
     })

    this.localEdit ? this.pathValueFormLocalEdit() : '';
  }
  ngOnInit(): void {
    this.localEdit ? this.pathValueFormLocalEdit() : '';
  }

  

  itemToEdit: any;
  entidad: string = 'Local';

  onInput = ( event: any) => {
    console.log(event);
    
  }

  onDateChanged = ( event: any, fecha: string) => {
    console.log(event);
    
  }

  onSubmit = () => {

    const tipoAccionForm = this.localEdit.id != 0 ? 'Editar' : 'Crear';

    if( this.formLocal.invalid ) {
      this.alertService.showAlert('El formulario está incompleto o no complen con los valores esperados')
      return;
    }
    console.log(this.formLocal.value);

    this.alertService.sweetAlert('question', 'Confirmación', `Está seguro que desea ${ tipoAccionForm } la Local`)
    .then( isConfirm => {
      if( !isConfirm ) return;

      switch( tipoAccionForm ) {
        case 'Crear': {
          const newLocal = {
            ...this.formLocal.value,
            idFacultad: this.localSelect().id,
            usuarioId: 1
          }
          
          this.addLocal( newLocal )
        }; break;

        case 'Editar': {
          const editLocal = {
            ...this.formLocal.value,
            id: this.localEdit.id,
            usuarioId: 1
          }

          this.editLocal( editLocal )
        }
      }
      
    })
    
  }

  addLocal = ( newLocal: LocalCrear ) => {
    this.repository.agregar( newLocal ).subscribe({
      next: (data) => {
        this.alertService.sweetAlert('success', 'Correcto', 'Local creado correctamente')

          this.localEdit = {
            id: 0,
            definicion: '',
            nombre: '',
            latitud: 0,
            longitud: 0,
            usuarioId: 0,
          };
          this.cerrarFormulario.emit( 'Add' );
      }, error: ( error ) => {
        console.log(error);
        this.alertService.sweetAlert('error', 'Error', error);
    
      }
    })
  }

  editLocal = (editLocal: Local) => {
    this.repository.editar(editLocal).subscribe({
      next: (data) => {
        this.alertService.sweetAlert('success', 'Correcto', 'Semestre editado correctamente');

        const localIndex = this.localesSelect().findIndex(local => local.id === editLocal.id);
        if (localIndex !== -1) {
          this.localesSelect()[localIndex] = editLocal;
          console.log(this.localesSelect(), '****');
        } 
        this.asignaciones().forEach(asignacion => {
          asignacion.programas.forEach(programa => {
            programa.locales.forEach(local => {
              if(local.idLocal === editLocal.id){
                local.nombreLocal = editLocal.nombre
                console.log(local.nombreLocal,'**');
              }
            })
          });
        });
        // Reinicia localEdit
        this.localEdit = {
          id: 0,
          definicion: '',
          nombre: '',
          latitud: 0,
          longitud: 0,
          usuarioId: 0,
        };
        // Cierra el formulario
        this.cerrarFormulario.emit('Edit');
      },
      error: (error) => {
        console.log(error);
        this.alertService.sweetAlert('error', 'Error', error);
      }
    });
  };

  pathValueFormLocalEdit = () => {

    this.formLocal.patchValue({
      definicion: this.localEdit.definicion,
      nombre: this.localEdit.nombre,
      latitud: this.localEdit.latitud,
      longitud: this.localEdit.longitud

    });

  }

  cancelarAdd = () => {
    this.cerrarFormulario.emit( 'Cancelar' );
  }

}