import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, WritableSignal } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Facultad, FacultadEliminar } from 'src/app/programas-academicos/domain/models/facultad.model';
import { FacultadRepository } from 'src/app/programas-academicos/domain/repositories/facultad.repository';
import { FacultadSignal } from 'src/app/programas-academicos/domain/signals/facultad.signal';
import { FacultadAddComponent } from '../facultad-add/facultad-add.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputFechaComponent } from 'src/app/core/components/ui-input-fecha/ui-input-fecha.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ProgramaSignal } from 'src/app/programas-academicos/domain/signals/programa.signal';
import { AsignacionSignal } from 'src/app/programas-academicos/domain/signals/asignacion.signal';
import { Asignacion } from 'src/app/programas-academicos/domain/models/asignacion.model';

@Component({
  selector: 'facultad-list',
  standalone: true,
  imports: [ CommonModule, SharedModule, FacultadAddComponent, UiInputComponent, UiButtonComponent],
  templateUrl: './facultad-list.component.html',
  styleUrl: './facultad-list.component.scss'
})
export class FacultadListComponent implements OnInit{
  listaFacultadesAsignadas: Asignacion[] = [];
  asignaciones = this.asignacionSignal.asignaciones

  showFormAgregarFacultad: boolean = false;
  facultadEdit: Facultad;
  facultades: WritableSignal<Facultad[]>= this.facultadSignal.facultadesList;
  facultadSeleccionado = this.facultadSignal.facultadSelect
  // facultades: 
  facultadSelect: Facultad = {
    id: 0,
    definicion: '',
    nombre: '',
    usuarioId: 0
};

  constructor(
    private asignacionSignal: AsignacionSignal,
    private programaSignal: ProgramaSignal,
    private facultadRepository: FacultadRepository,
    private facultadSignal: FacultadSignal,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<FacultadListComponent>,

  ) {

  }
  ngOnInit(): void {
    this.obtenerFacultades();
    this.facultadesAsignadas()
  }

  limpiarDatosFacultad = () => {
    this.facultadEdit = {
      id: 0,
      definicion: '',
      nombre: '',
      usuarioId: 0
    };
  }

  openShowFormCrearFacultad = ( event?: EventEmitter<string> | string) => {

    console.log(event);
    
      switch( event ) {
        case 'Add': {
          console.log('Facultad Creado');
          this.limpiarDatosFacultad()
          this.showFormAgregarFacultad = false;
         this.obtenerFacultades();
        } break;

        case 'Edit': {
          console.log('Facultad Editadooooooooo');
          this.obtenerFacultades();
          this.limpiarDatosFacultad();
          this.facultadSelect = this.facultadEdit
          this.showFormAgregarFacultad = false;
        } break;

        case 'Open': {
          this.showFormAgregarFacultad = true;
          this.limpiarDatosFacultad()
        } break;

        case 'Cancelar': {
          console.log('Cancelar');
          this.limpiarDatosFacultad()
          this.showFormAgregarFacultad = false;
        }
      }
  }

  obtenerFacultades = () => {
    this.facultadRepository.obtenerFacultades().subscribe({
      next: ( facultades ) => {
        console.log(facultades);
        this.facultadSignal.setFacultadesList( facultades );
        
        if (this.facultades().length > 0) {
          const facultadSeleccionada = this.facultades().find(facultad => facultad.id === this.facultadSeleccionado().id);
          if (facultadSeleccionada) {
            this.facultadSelect = facultadSeleccionada;
          }
        }
      }, error: ( error ) => {
        console.log(error);
        
      }
    })
  }

  
  openShowFormEditarFacultad = ( facultad: Facultad, event?: EventEmitter<string> | string) => {

    console.log(event);
    
      switch( event ) {
        case 'Add': {
          console.log('Semestre Creado');
          this.showFormAgregarFacultad = false;
         this.obtenerFacultades();
        } break;

        case 'Edit': {
          console.log('Semestre Editadoooooooo');
          this.showFormAgregarFacultad = false;
          this.obtenerFacultades();
        } break;

        case 'Open': {
          this.showFormAgregarFacultad = true;
          this.facultadEdit = facultad;
          // this.pathValueFormSemestreEdit();
          this.facultadSignal.setEditFacultad(facultad)
          
        } break;

        case 'Cancelar': {
          console.log('Cancelar');
          this.showFormAgregarFacultad = false;
        }
      }
  }


  eliminarFacultadConfirm = ( facultad: Facultad ) => {
    this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea eliminar el semestre?').then( isConfirm => {
      if( !isConfirm ) return;
      this.eliminarFacultad( facultad );    

    });
    
  }


  eliminarFacultad = ( facultad: FacultadEliminar ) => {
    const facultadEliminar = {
      id: facultad.id,
      usuarioId: 1
    }

    this.facultadRepository.eliminarFacultad( facultadEliminar ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alertService.sweetAlert('success', '¡ELIMINADO!', 'La facultad fue eliminada correctamente')
        this.limpiarDatosFacultad();
        if(facultad.id === this.facultadSeleccionado().id){
          this.facultadSignal.setSelectFacultad(this.facultadSelect)
          console.log(this.facultadSelect); 
        }
        this.obtenerFacultades();
      }, error: ( error ) => {
        console.log( error );
        this.alertService.showAlert(`Ocurrio un error. ${ error }`, 'error')
      }
    });
  }

  onSelect = () => {

    if( this.facultadSelect.id == 0 ) return;

    this.alertService.sweetAlert('question', 'Confirmación', `Está seguro que desea SELECCIONAR la facultad`)
    .then( isConfirm => {
      if( !isConfirm ) return;

      this.facultadSignal.setSelectFacultad(  this.facultadSelect );
      this.programaSignal.setSelectProgramaDefault();
      this.dialogRef.close('seleccionado');
      // this.aperturarSemestre();
    
    })
  }
  
  facultadesAsignadas = () => {
    this.listaFacultadesAsignadas = [];
    this.asignaciones().forEach(facultad => {
      console.log(facultad.nombreFacultad);
      this.listaFacultadesAsignadas.push(facultad)
    })
  }

  deshabilitarFacultadAsignada = ( facultad: Facultad): boolean => {
    this.limpiarDatosFacultad()
    return this.listaFacultadesAsignadas.some(asignado => asignado.idFacultad === facultad.id)
  }

}
