import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SemestreAcademico, SemestreAcademicoAperturar } from 'src/app/programas-academicos/domain/models/semestre-academico.model';
import { SemestreAcademicoRepository } from 'src/app/programas-academicos/domain/repositories/semestre-academico.repository';
import { SemestreAcademicoDomainService } from 'src/app/programas-academicos/domain/services/semestre-academico-domain.service';
import { SemestreAddComponent } from '../semestre-add/semestre-add.component';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { UiInputFechaRangeComponent } from 'src/app/core/components/ui-input-fecha-range/ui-input-fecha-range.component';
import { UiInputFechaComponent } from 'src/app/core/components/ui-input-fecha/ui-input-fecha.component';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SemestreAcademicoValidations } from 'src/app/programas-academicos/domain/validations/semestre-academico.valitations';
import { DateAdapter } from '@angular/material/core';
import { ProgramaAcademicoSignal } from 'src/app/programas-academicos/domain/signals/programa-academico.signal';

@Component({
  selector: 'semestre-list',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiInputComponent, UiInputFechaRangeComponent, UiInputFechaComponent, UiButtonComponent, SemestreAddComponent],
  templateUrl: './semestre-list.component.html',
  styleUrl: './semestre-list.component.scss',
  providers: [ DatePipe ]
})
export class SemestreListComponent {

  semestresAcademicos = this.semestreAcademicoDomainService.semestresAcademicos;
  semestreAcademicoAperturado = this.semestreAcademicoDomainService.semestreAcademicoAperturado;
  semestreAcademicoList: SemestreAcademico[];
  existeSemestreCreado: boolean;

  maxLengthNombre: number;
  minLengthNombre: number;
  expRegNombre: RegExp;
  expRegNombreToLockInput: RegExp;
  maxLengthCodigo: number;
  minLengthCodigo: number;
  expRegCodigo: RegExp;
  expRegCodigoToLockInput: RegExp;
  formSemestre: FormGroup;
  semestreSelect: SemestreAcademico = {
      id: 0,
      codigo: '',
      nombre: '',
      condicion: '',
      usuarioId: 0,
  };

  semestreEdit: SemestreAcademico;

  showFormAgregarSemestre: boolean = false;
  constructor(
    private semestreAcademicoRepository: SemestreAcademicoRepository,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<SemestreListComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>,
    private validation: SemestreAcademicoValidations,
    private semestreRepository: SemestreAcademicoRepository,
    private semestreAcademicoDomainService: SemestreAcademicoDomainService,
    private datePipe: DatePipe,
    private programaSignal: ProgramaAcademicoSignal
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
      codigo: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthCodigo), Validators.minLength(this.minLengthCodigo), Validators.pattern(this.expRegCodigo)]),
      fechaInicio: new FormControl('',[]), //Validators.required
      fechaFin: new FormControl('', []), // Validators.required
     });



    this.semestreEdit = data;
    this.semestreEdit ? this.pathValueFormSemestreEdit() : '';
  }

  ngOnInit(): void {
    this.obtenerSemestres();
  }

  obtenerSemestres = () => {
    this.semestreAcademicoRepository.obtenerSemestres().subscribe({
      next: ( semestres ) => {
        
          console.log(semestres);
          // this.existeSemestreCreado = semestres.length > 0;
          // if( semestres.length == 0 ) {
          //   this.semestreAcademicoDomainService.setSemestreAcademicoDefault();
          //   return;
          // }
          // semestres.forEach( semestre => {

          // })
          this.semestreAcademicoDomainService.setSemestreAcademico(semestres); 
        
          // this.semestreSelect = {
          //   id: 0,
          //   codigo: '',
          //   nombre: '',
          //   condicion: '',
          //   usuarioId: 0,
          // };

          
          // this.semestreAcademicoList = this.semestreAcademicoDomainService.semestresAcademicos();
          
          // this.semestreAcademicoDomainService.setSemestreAcademico(semestres[0]);
      }, error: ( error ) => {
          console.log(error);
          
      }
    }) 
  }

  openShowFormCrearSemestre = ( event?: EventEmitter<string> | string) => {

    console.log(event);
    
    
      switch( event ) {
        case 'Add': {
          console.log('Semestre Creado');
          this.semestreEdit = {
            id: 0,
            codigo: '',
            nombre: '',
            condicion: '',
            usuarioId: 0,
          };
          this.showFormAgregarSemestre = false;
         this.obtenerSemestres();
        } break;

        case 'Edit': {
          console.log('Semestre Editado');
          this.semestreEdit = {
            id: 0,
            codigo: '',
            nombre: '',
            condicion: '',
            usuarioId: 0,
          };
          this.showFormAgregarSemestre = false;
          this.obtenerSemestres();
        } break;

        case 'Open': {
          this.showFormAgregarSemestre = true;
          this.semestreEdit = {
            id: 0,
            codigo: '',
            nombre: '',
            condicion: '',
            usuarioId: 0,
          };
        } break;

        case 'Cancelar': {
          console.log('Cancelar');
          this.semestreEdit = {
            id: 0,
            codigo: '',
            nombre: '',
            condicion: '',
            usuarioId: 0,
          };
          this.showFormAgregarSemestre = false;
        }
      }
  }

  openShowFormEditarSemestre = ( semestre: SemestreAcademico, event?: EventEmitter<string> | string) => {

    

    console.log(event);
    
    
      switch( event ) {
        case 'Add': {
          console.log('Semestre Creado');
          this.showFormAgregarSemestre = false;
         this.obtenerSemestres();
        } break;

        case 'Edit': {
          console.log('Semestre Editado');
          this.showFormAgregarSemestre = false;
          this.obtenerSemestres();
        } break;

        case 'Open': {
          this.showFormAgregarSemestre = true;
          this.semestreEdit = semestre;
          // this.pathValueFormSemestreEdit();
        } break;

        case 'Cancelar': {
          console.log('Cancelar');
          this.showFormAgregarSemestre = false;
        }
      }
  }

  openModalEditarSemestre = ( semestre: SemestreAcademico) => {
    const dialogRef = this.dialog.open(SemestreAddComponent, {
        width: '600px',
        height: '360px',
        disableClose: true,
        data: semestre
    });

    dialogRef.afterClosed().subscribe( semestreEditado => {
      if( semestreEditado == 'cancelar' ) return
      
        console.log(semestreEditado);
        this.obtenerSemestres();

    })

  }

  eliminarSemestreConfirm = ( semestre: SemestreAcademico ) => {
    this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea eliminar el semestre?').then( isConfirm => {
      if( !isConfirm ) return;

      this.eliminarSemestre( semestre );

    });
    
  }


  eliminarSemestre = ( semestre: SemestreAcademico ) => {
    const semestreEliminar = {
      id: semestre.id,
      usuarioId: 1
    }

    this.semestreAcademicoRepository.eliminarSemestre( semestreEliminar ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alertService.showAlert('Semestre eliminado correctamente', 'success');
        this.obtenerSemestres();
      }, error: ( error ) => {
        console.log( error );
        this.alertService.showAlert(`Ocurrio un error. ${ error }`, 'error')
      }
    });
  }

  cerrarSemestreConfirm = ( semestre: SemestreAcademico ) => {

  }


  itemToEdit: any;
  entidad: string = 'Semestre';

  onInput = ( event: any) => {
    console.log(event);
    
  }

  onDateChanged = ( event: any, fecha: string) => {
    console.log(event);
    
  }

  onSelect = () => {

    if( this.semestreSelect.id == 0 ) return;

    this.alertService.sweetAlert('question', 'Confirmación', `Está seguro que desea SELECCIONAR el semestre`)
    .then( isConfirm => {
      if( !isConfirm ) return;

      this.programaSignal.setSelectSemestre(  this.semestreSelect );
      this.dialogRef.close('seleccionado');
      // this.aperturarSemestre();
    
    })
  }

  // aperturarSemestre = () => {
  //   const semestreAperturar: SemestreAcademicoAperturar = {
  //     id: this.semestreSelect.id,
  //     usuarioId: 1
  //   }
  //   this.semestreRepository.aperturarSemestre( semestreAperturar ).subscribe({
  //     next: ( data ) => {
  //       console.log( data );
  //       this.alertService.sweetAlert('success', 'Correcto', 'Semestre aperturado correctamente');
        
  //       this.obtenerSemestres();
  //       this.dialogRef.close('Aperturado');

  //     }, error: ( error ) => {
  //       console.log(error);
  //       this.alertService.sweetAlert('error', 'Error', 'Ocurrió un error, comunicarse con el administrador');
        
  //     }
  //   });
  // }

  addSemestre = ( newSemestre: SemestreAcademico ) => {
    this.semestreRepository.agregarSemestre( newSemestre ).subscribe({
      next: (data) => {
        this.alertService.sweetAlert('success', 'Correcto', 'Semestre creado correctamente')
          // this.semestreAcademicoDomainService.setSemestreAcademico( data );
          this.dialogRef.close(data);
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
        // this.semestreAcademicoDomainService.setSemestreAcademico( data );
        this.dialogRef.close( data );
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
      codigo: this.semestreEdit.codigo,
      nombre: this.semestreEdit.nombre,
      // fechaInicio: new Date( fechaInicio ),
      // fechaFin: new Date( fechaFin ),
    });

  }

}
