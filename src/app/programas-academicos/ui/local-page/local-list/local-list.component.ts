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
import { AsignacionLocal, ListarLocalesAsignados } from 'src/app/programas-academicos/domain/models/asignacion.model';
import { AsignacionSignal } from 'src/app/programas-academicos/domain/signals/asignacion.signal';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';

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
  private auth: AuthSignal,
  public dialogRef: MatDialogRef<LocalListComponent>,

  ) {

  }
  ngOnInit(): void {
    this.obtenerLocales();
    if (this.data && this.data !== undefined) {
      this.programaConLocalesAsignados = this.data.programaConLocales;
  } 
  this.localesChecked = this.localesSelect()
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

      switch( event ) {
        case 'Add': {
          this.limpiarDatosLocales();
          this.showFormAgregarPrograma = false;
         this.obtenerLocales();
        } break;

        case 'Edit': {
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
        this.asignaciones().forEach(asignacion => {
          asignacion.programas.forEach(programa => {
            programa.locales.forEach(local => {
              this.localesAsignados.push(local);
            })
          });
        });
      }, error: ( error ) => {
        console.log(error);
        this.alertService.showAlert('Ocurrió un error, no se pudo listar los locales', 'error');
      }
    })
  }

  localAsignado = (local: Local): boolean => {
    return this.localesAsignados.some(asignado => asignado.idLocal === local.id);
  }
  programaConLocalAsignado = (idLocal: number): boolean => {
    return this.programaConLocalesAsignados.some(local => local.idLocal === idLocal);
  }

  marcarCheckBoxLocales = (idLocal: number): boolean => {
    if(this.programaConLocalesAsignados.length > 0){
      return this.programaConLocalAsignado(idLocal)
    }
    else{
      return this.localesChecked.some(local => local.id === idLocal);
    }
  }

  
  openShowFormEditarPrograma = ( programa: Local, event?: EventEmitter<string> | string) => {
    
      switch( event ) {
        case 'Add': {
          this.showFormAgregarPrograma = false;
         this.obtenerLocales();
        } break;

        case 'Edit': {
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


  eliminarPrograma = ( local: LocalEliminar ) => {
    const localEliminar = {
      id: local.id,
      usuarioId: parseInt( this.auth.currentRol().id )
    }

    this.repository.eliminar( localEliminar ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alertService.sweetAlert('success', '¡ELIMINADO!', 'Local eliminado correctamente')
        this.localesChecked.length = 0;
        const localesActualizados = this.localesSelect().filter(localFiltro => localFiltro.id !== local.id);
        this.signal.setSelectLocales(localesActualizados);
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
      
      this.dialogRef.close('seleccionado');

    
    })
  }

  onLocalChecked = ( localCheked: Local, checked: boolean ) => {
    
    checked ? this.localesChecked.push( localCheked) : this.localesChecked = this.localesChecked.filter( local => local.id != localCheked.id);

  }

}