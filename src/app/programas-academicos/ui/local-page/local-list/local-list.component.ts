import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, WritableSignal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Local, LocalEliminar } from 'src/app/programas-academicos/domain/models/local.model';
import { LocalRepository } from 'src/app/programas-academicos/domain/repositories/local.repository';
import { LocalSignal } from 'src/app/programas-academicos/domain/signals/local.signal';
import { LocalAddComponent } from '../local-add/local-add.component';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsignacionLocal, AsignacionPrograma, AsignarNuevoPrograma, ListarLocalesAsignados } from 'src/app/programas-academicos/domain/models/asignacion.model';
import { AsignacionSignal } from 'src/app/programas-academicos/domain/signals/asignacion.signal';

@Component({
  selector: 'app-local-list',
  standalone: true,
  imports: [ CommonModule, SharedModule, LocalAddComponent, UiButtonComponent],
  templateUrl: './local-list.component.html',
  styleUrl: './local-list.component.scss'
})
export class LocalListComponent {

  localesAsignados:  AsignacionLocal[] = [];
  programaConLocalesAsignados:  AsignacionLocal[] = [];
  asignaciones = this.asignacionSignal.asignaciones;
  showFormAgregarPrograma: boolean = false;
  localEdit: Local;
  locales: WritableSignal<Local[]>= this.signal.localList;
  localesSelect: WritableSignal<Local[]> = this.signal.localesSelect;
  localesChecked: Local[] = [];
  // programaes: 
  localSelect: Local = {
    id: 0,
    nombre: '',
    definicion: '',
    latitud: 0,
    longitud: 0,
    usuarioId: 0
};
constructor(
  private asignacionSignal: AsignacionSignal,
  @Inject(MAT_DIALOG_DATA) public data: ListarLocalesAsignados,
  private signal: LocalSignal,
  private repository: LocalRepository,
  // private facultadSignal: LocalSignal,
  private alertService: AlertService,
  public dialogRef: MatDialogRef<LocalListComponent>,

  ) {

  }
  ngOnInit(): void {
    this.obtenerLocales();
    if (this.data && this.data !== undefined) {
      this.localesAsignados = this.data.locales;
      this.programaConLocalesAsignados = this.data.programaConLocales;
      console.log(this.localesAsignados,'locales asignados');
  } 
  }

  limpiarDatosLocales = () => {
    this.localEdit = {
      id: 0,
      nombre: '',
      definicion: '',
      latitud: 0,
      longitud: 0,
      usuarioId: 0
    };
  }

  openShowFormCrearPrograma = ( event?: EventEmitter<string> | string) => {

    console.log(event);
      switch( event ) {
        case 'Add': {
          console.log('Programa Creado');
          this.limpiarDatosLocales();
          this.showFormAgregarPrograma = false;
         this.obtenerLocales();
        } break;

        case 'Edit': {
          console.log('Programa Editado');
          this.limpiarDatosLocales();
          this.showFormAgregarPrograma = false;
          this.obtenerLocales();
          this.localesChecked.length = 0;
        } break;

        case 'Open': {
          this.showFormAgregarPrograma = true;
          this.limpiarDatosLocales();
        } break;

        case 'Cancelar': {
          console.log('Cancelar');
          this.limpiarDatosLocales();
          this.showFormAgregarPrograma = false;
        }
      }
  }

  obtenerLocales = () => {
    this.repository.obtener().subscribe({
      next: ( locales ) => {
        console.log(locales);
        this.signal.setLocalesList( locales );        
      }, error: ( error ) => {
        console.log(error);
        this.alertService.showAlert('Ocurrió un error, no se pudo listar los locales', 'error');
      }
    })
  }

  localAsignado(local: Local): boolean {
    return this.localesAsignados.some(asignado => asignado.idLocal === local.id);
  }
  programaConLocalAsignado(id: number): boolean {
    return this.programaConLocalesAsignados.some(local => local.idLocal === id);
}

  
  openShowFormEditarPrograma = ( programa: Local, event?: EventEmitter<string> | string) => {

    console.log(event);
    
      switch( event ) {
        case 'Add': {
          console.log('Semestre Creado');
          this.showFormAgregarPrograma = false;
         this.obtenerLocales();
        } break;

        case 'Edit': {
          console.log('Semestre Editado');
          this.showFormAgregarPrograma = false;
          this.obtenerLocales();
        } break;

        case 'Open': {
          this.showFormAgregarPrograma = true;
          this.localEdit = programa;
          this.signal.setLocalEditar( programa );
          // this.pathValueFormSemestreEdit();
        } break;

        case 'Cancelar': {
          console.log('Cancelar');
          this.showFormAgregarPrograma = false;
        }
      }
  }


  eliminarProgramaConfirm = ( programa: Local ) => {
    this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea eliminar el semestre?').then( isConfirm => {
      if( !isConfirm ) return;

      this.eliminarPrograma( programa );

    });
    
  }


  eliminarPrograma = ( locales: LocalEliminar ) => {
    const localEliminar = {
      id: locales.id,
      usuarioId: 1
    }

    this.repository.eliminar( localEliminar ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alertService.sweetAlert('success', '¡ELIMINADO!', 'Local eliminado correctamente')
        this.localesChecked.length = 0;
        const localesActualizados = this.localesSelect().filter(local => local.id !== locales.id);
        this.signal.setSelectLocales(localesActualizados);
        console.log(localesActualizados,'locales actualizados');
        this.obtenerLocales();
      }, error: ( error ) => {
        console.log( error );
        this.alertService.showAlert(`Ocurrio un error. ${ error }`, 'error')
      }
    });
  }

  onSelect = () => {

    if( this.localesChecked.length == 0 ) return;

    this.alertService.sweetAlert('question', 'Confirmación', `Está seguro que desea SELECCIONAR el local`)
    .then( isConfirm => {
      if( !isConfirm ) return;
      this.signal.setSelectLocales( this.localesChecked );
      console.log(this.signal.localesSelect());
      
      // this.signal.setSelectLocal(  this.localSelect );
      this.dialogRef.close('seleccionado');
      // this.aperturarSemestre();
    
    })
  }

  onLocalChecked = ( localCheked: Local, checked: boolean ) => {
    console.log(checked, localCheked);
    
    checked ? this.localesChecked.push( localCheked) : this.localesChecked = this.localesChecked.filter( local => local.id != localCheked.id);

  }

}