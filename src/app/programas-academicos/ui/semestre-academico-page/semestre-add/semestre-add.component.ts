import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputFechaRangeComponent } from 'src/app/core/components/ui-input-fecha-range/ui-input-fecha-range.component';
import { UiInputFechaComponent } from 'src/app/core/components/ui-input-fecha/ui-input-fecha.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { SemestreAcademicoValidations } from 'src/app/programas-academicos/domain/validations/semestre-academico.valitations';
import { ModalComponent } from '../../components/modal/modal.component';
import { DateAdapter } from '@angular/material/core';
import { SemestreAcademicoLocalService } from 'src/app/programas-academicos/infraestructure/services/semestre-academico-local.service';
import { SemestreAcademico } from '../../../domain/models/semestre-academico.model';
import { SemestreAcademicoRepository } from 'src/app/programas-academicos/domain/repositories/semestre-academico.repository';
import { SemestreAcademicoDomainService } from 'src/app/programas-academicos/domain/services/semestre-academico-domain.service';
import { SemestreSignal } from 'src/app/programas-academicos/domain/signals/semestre.signal';

@Component({
  selector: 'semestre-add',
  standalone: true,
  imports: [CommonModule, SharedModule, UiInputComponent, UiInputFechaRangeComponent, UiInputFechaComponent, UiButtonComponent],
  templateUrl: './semestre-add.component.html',
  styleUrl: './semestre-add.component.scss',
  providers: [ DatePipe ]
})
export class SemestreAddComponent implements OnInit {

  @Output() cerrarFormulario: EventEmitter<string> = new EventEmitter();

  maxLengthNombre: number;
  minLengthNombre: number;
  expRegNombre: RegExp;
  expRegNombreToLockInput: RegExp;
  maxLengthCodigo: number;
  minLengthCodigo: number;
  expRegCodigo: RegExp;
  expRegCodigoToLockInput: RegExp;
  formSemestre: FormGroup;



  @Input() semestreEdit: SemestreAcademico;
  @Input() listaCodigoSemestre : string[] = []
  semestreAcademico = this.semestreAcademicoDomainService.semestresAcademicos();


  constructor(
    private semestreSignal: SemestreSignal,
    public dialogRef: MatDialogRef<SemestreAddComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>,
    private validation: SemestreAcademicoValidations,
    private alertService: AlertService,
    private semestreRepository: SemestreAcademicoRepository,
    private semestreAcademicoDomainService: SemestreAcademicoDomainService,
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

    this.formSemestre = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthNombre), Validators.minLength(this.minLengthNombre), Validators.pattern(this.expRegNombre)]),
      codigo: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthCodigo), Validators.minLength(this.minLengthCodigo), Validators.pattern(this.expRegCodigo), this.validation.duplicado]),
      fechaInicio: new FormControl('',[]), //Validators.required
      fechaFin: new FormControl('', []), // Validators.required
     })

    // this.semestreEdit = data;
    this.semestreEdit ? this.pathValueFormSemestreEdit() : '';
  }
  ngOnInit(): void {
    this.semestreEdit ? this.pathValueFormSemestreEdit() : '';    
  }

  

  itemToEdit: any;
  entidad: string = 'Semestre';

  onInput = ( event: any) => {
    console.log(event);
    
  }

  onDateChanged = ( event: any, fecha: string) => {
    console.log(event);
    
  }

  onSubmit = () => {
    console.log('***');
    
    const tipoAccionForm = this.semestreEdit && this.semestreEdit.id != 0 ? 'Editar' : 'Crear';
    console.log(tipoAccionForm,'*');
    
    if( this.formSemestre.invalid ) {
      this.alertService.showAlert('El formulario está incompleto o no complen con los valores esperados')
      return;
    }
    console.log(this.formSemestre.value);

    this.alertService.sweetAlert('question', 'Confirmación', `Está seguro que desea ${ tipoAccionForm } el semestre`)
    .then( isConfirm => {
      if( !isConfirm ) return;

      switch( tipoAccionForm ) {
        case 'Crear': {
          const newSemestre = {
            ...this.formSemestre.value,
            usuario: 1
          }
          this.addSemestre( newSemestre )
        }; break;

        case 'Editar': {
          const editSemestre = {
            ...this.formSemestre.value,
            id: this.semestreEdit.id,
            usuario: 1
          }

          this.editSemestre( editSemestre )
        }
      }
      
    })
    
  }

  addSemestre = ( newSemestre: SemestreAcademico ) => {
    this.semestreRepository.agregarSemestre( newSemestre ).subscribe({
      next: (data) => {
        this.alertService.sweetAlert('success', 'Correcto', 'Semestre creado correctamente')
          // this.semestreAcademicoDomainService.setSemestreAcademico( data );
          // this.dialogRef.close(data);
          this.semestreEdit = {
            id: 0,
            codigo: '',
            nombre: '',
            condicion: '',
            usuarioId: 0,
          };
          this.cerrarFormulario.emit( 'Add' );
      }, error: ( error ) => {
        console.log(error);
        this.alertService.sweetAlert('error', 'Error', error);
    
      }
    })
  }

  editSemestre = ( editSemestre: SemestreAcademico ) => {
    this.semestreRepository.editarSemestre( editSemestre ).subscribe({
      next: ( data ) => {
        this.alertService.sweetAlert('success', 'Correcto', 'Semestre editado correctamente');
        if(this.semestreSignal.semestreSelect().id === this.semestreEdit.id){
          this.semestreSignal.setSelectSemestre(editSemestre)
        }
        // this.semestreAcademicoDomainService.setSemestreAcademico( data );
        // this.dialogRef.close( data );
        this.semestreEdit = {
          id: 0,
          codigo: '',
          nombre: '',
          condicion: '',
          usuarioId: 0,
        };
        this.cerrarFormulario.emit( 'Edit' );
      }, error: ( error ) => {
        console.log( error );
        this.alertService.sweetAlert('error', 'Error', error);
        
      }
    })
  }

  pathValueFormSemestreEdit = () => {

    // let fechaInicio_format = this.semestreEdit.fechaInicio.split('/');
    // let fechaFin_format = this.semestreEdit.fechaFin.split('/');
    // const day_inicio = fechaInicio_format[0];
    // const month_inicio = fechaInicio_format[1];
    // const year_inicio = fechaInicio_format[2];

    // const day_fin= fechaFin_format[0];
    // const month_fin= fechaFin_format[1];
    // const year_fin= fechaFin_format[2];

    // const fechaInicio = month_inicio + "-" + day_inicio + "-" + year_inicio;
    // const fechaFin = month_fin + "-" + day_fin + "-" + year_fin;

    this.formSemestre.patchValue({
      codigo: this.semestreEdit.codigo.trim(),
      nombre: this.semestreEdit.nombre.trim(),
      // fechaInicio: new Date( fechaInicio ),
      // fechaFin: new Date( fechaFin ),
    });

  }

  cancelarAdd = () => {
    this.cerrarFormulario.emit( 'Cancelar' );
  }
}
