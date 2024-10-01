import { Component, EventEmitter, Inject, OnInit, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SemestreAcademico, SemestreAcademicoAperturar } from 'src/app/programas-academicos/domain/models/semestre-academico.model';
import { SemestreAcademicoRepository } from 'src/app/programas-academicos/domain/repositories/semestre-academico.repository';
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
import { SemestreSignal } from 'src/app/programas-academicos/domain/signals/semestre.signal';
import { AsignacionSignal } from 'src/app/programas-academicos/domain/signals/asignacion.signal';

import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';

import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { ProgramaSignal } from 'src/app/programas-academicos/domain/signals/programa.signal';


@Component({
  selector: 'semestre-list',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiInputComponent, UiInputFechaRangeComponent, UiInputFechaComponent, UiButtonComponent, SemestreAddComponent],
  templateUrl: './semestre-list.component.html',
  styleUrl: './semestre-list.component.scss',
  providers: [ DatePipe ]
})
export class SemestreListComponent implements OnInit {
  listaAsignaciones = this.asignacionSignal.asignaciones;
  semestresAcademicos = this.semestreSignal.semestresAcademicos;
  semestreAcademicoAperturado = this.semestreSignal.semestreAcademicoAperturado;
  programaSelect = this.programaSignal.programaSelect;
  semestreSeleccionado = this.semestreSignal.semestreSelect;
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
    private modal: UiModalService,
    private asignacionSignal: AsignacionSignal,
    private semestreAcademicoRepository: SemestreAcademicoRepository,
    private programaSignal: ProgramaSignal,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<SemestreListComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>,
    private validation: SemestreAcademicoValidations,
    private semestreRepository: SemestreAcademicoRepository,
    // private semestreSignal: semestreSignal,
    private auth: AuthSignal,
    private semestreSignal: SemestreSignal
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

  limpiarDatosSemestre = () => {
    this.semestreSelect = {
      id: 0,
      codigo: '',
      nombre: '',
      condicion: '',
      usuarioId: 0,
    }
  }


  obtenerSemestres = () => {
    this.semestreAcademicoRepository.obtenerSemestres().subscribe({
      next: ( semestres ) => {

          this.semestreSignal.setSemestresAcademicos(semestres);

          if(this.semestresAcademicos().length > 0){
            let semestreMarcado = this.semestresAcademicos().find(semestre => semestre.id === this.semestreSeleccionado().id)
            if(semestreMarcado){
              this.semestreSelect = semestreMarcado;            
            }            
          }

      }, error: ( error ) => {
          console.log(error);
          
      }
    }) 
  }

  openModalSemestre ( semestre: SemestreAcademico, template: TemplateRef<any>) {
    let titleModal = 'Editar Semestre';
    this.semestreEdit = semestre;

    this.showFormAgregarSemestre = !semestre;

    semestre ? this.semestreSignal.semestreSelect.set(semestre) : (titleModal = 'Crear Semestre' )

    this.modal.openTemplate({
      template,
      titulo:titleModal
    }).afterClosed().subscribe( resp => {
      if(resp == 'cancelar'){
        this.semestreSignal.setSelectSemestreDefault();
      }
    })
  }

  openShowFormCrearSemestre = ( event?: EventEmitter<string> | string) => {
    
      switch( event ) {
        case 'Add': {
          this.limpiarDatosSemestre()
          this.showFormAgregarSemestre = false;
         this.obtenerSemestres();
        } break;

        case 'Edit': {
          this.limpiarDatosSemestre()
          this.showFormAgregarSemestre = false;
          this.obtenerSemestres();
        } break;

        case 'Open': {
          this.showFormAgregarSemestre = true;
          this.limpiarDatosSemestre()
          
        } break;

        case 'Cancelar': {
          this.limpiarDatosSemestre()
          this.showFormAgregarSemestre = false;
        }
      }
  }

  openShowFormEditarSemestre = ( semestre: SemestreAcademico, event?: EventEmitter<string> | string) => {
    
      switch( event ) {
        case 'Add': {
          this.showFormAgregarSemestre = false;
         this.obtenerSemestres();
        } break;

        case 'Edit': {
          this.showFormAgregarSemestre = false;
          this.obtenerSemestres();
        } break;

        case 'Open': {
          this.showFormAgregarSemestre = true;
          this.semestreEdit = semestre;
          this.semestreSignal.setSemestreEditado(semestre);
          
          // this.pathValueFormSemestreEdit();
        } break;

        case 'Cancelar': {
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
      usuarioId: parseInt( this.auth.currentRol().id )
    }

    this.semestreAcademicoRepository.eliminarSemestre( semestreEliminar ).subscribe({
      next: ( data ) => {
        this.alertService.sweetAlert('success', '¡Eliminado!', 'Semestre eliminado correcamente')
        this.limpiarDatosSemestre(); 
        if(semestre.id === this.semestreSeleccionado().id){
          this.semestreSignal.setSelectSemestre(  this.semestreSelect );
        }
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

      this.semestreSignal.setSelectSemestre(  this.semestreSelect );
      console.log( this.semestreSignal.semestreSelect());
      this.programaSelect.set( this.programaSignal.programa );
      this.dialogRef.close('seleccionado');
      
      // this.aperturarSemestre();
    
    })
  }

  // aperturarSemestre = () => {
  //   const semestreAperturar: SemestreAcademicoAperturar = {
  //     id: this.semestreSelect.id,
  //     usuarioId: parseInt( this.auth.currentRol().id )
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
        this.alertService.sweetAlert('success', 'Correcto', 'Semestre creado correctamente');
        
          // this.semestreSignal.setSemestreAcademico( data );
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
        // this.semestreSignal.setSemestreAcademico( data );
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
