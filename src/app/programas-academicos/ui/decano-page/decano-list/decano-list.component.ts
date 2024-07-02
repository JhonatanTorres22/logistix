import { CommonModule } from '@angular/common';
import { Component, EventEmitter, WritableSignal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { DecanoSignal } from 'src/app/programas-academicos/domain/signals/decano.signal';
import { UsuarioRol, UsuarioRolEliminar } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { UsuarioRolRepository } from 'src/app/usuarios/domain/repositories/usuario-rol.repository';

import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UserAddComponent } from 'src/app/usuarios/ui/user-add/user-add.component';

@Component({
  selector: 'app-decano-list',
  standalone: true,
  imports: [ CommonModule, SharedModule,  UiButtonComponent, UserAddComponent],
  templateUrl: './decano-list.component.html',
  styleUrl: './decano-list.component.scss'
})
export class DecanoListComponent {

  showFormAgregarDecano: boolean = false;
  decanoEdit: UsuarioRol;
  decanos: WritableSignal<UsuarioRol[]>= this.signal.decanosList;
  decanoSeleccionado = this.signal.decanoSelect;
  // programaes: 
  decanoSelect: UsuarioRol = {
    id: 0,
    usuario: '',
    alta: '',
    estado: '',
    rol: '0',
};
constructor(
  
  private signal: DecanoSignal,
  private repository: UsuarioRolRepository,
  // private facultadSignal: LocalSignal,
  private alertService: AlertService,
  public dialogRef: MatDialogRef<DecanoListComponent>,

  ) {

  }
  ngOnInit(): void {
    this.obtenerDecanos();
  }

  openShowFormCrearDecano = ( event?: EventEmitter<string> | string) => {

    console.log(event);
    
      switch( event ) {
        case 'Add': {
          console.log('Decano Creado');
          this.decanoEdit = {
            id: 0,
            usuario: '',
            alta: '',
            estado: '',
            rol: '0',
          };
          this.showFormAgregarDecano = false;
         this.obtenerDecanos();
        } break;

        case 'Edit': {
          console.log('Decano Editado');
          this.decanoEdit = {
            id: 0,
            usuario: '',
            alta: '',
            estado: '',
            rol: '0',
          };
          this.showFormAgregarDecano = false;
          this.obtenerDecanos();
        } break;

        case 'Open': {
          this.showFormAgregarDecano = true;
          this.decanoEdit = {
            id: 0,
            usuario: '',
            alta: '',
            estado: '',
            rol: '0',
          };
        } break;

        case 'Cancelar': {
          console.log('Cancelar');
          this.decanoEdit = {
            id: 0,
            usuario: '',
            alta: '',
            estado: '',
            rol: '0',
          };
          this.showFormAgregarDecano = false;
        }
      }
  }

  obtenerDecanos = () => {
    this.repository.obtenerUsuariosRol().subscribe({
      next: ( decanos ) => {
        console.log(decanos);
        const decanosList = decanos.filter( usuario => usuario.rol.toUpperCase() == 'DECANO DE FACULTAD')  // && usuario.estado == 'ACTIVO'
        this.signal.setDecanosList( decanosList );
        if(this.decanos().length > 0){
          let decanoSeleccionado = this.decanos().find(decano => decano.id === this.decanoSeleccionado().id)
          if(decanoSeleccionado){
            this.decanoSelect = decanoSeleccionado;
          }
        }
        
      }, error: ( error ) => {
        console.log(error);
        this.alertService.showAlert('Ocurrió un error, no se pudo listar los decanos', 'error');
      }
    })
  }

  
  openShowFormEditarDecano = ( decano: UsuarioRol, event?: EventEmitter<string> | string) => {

    console.log(event);
    
      switch( event ) {
        case 'Add': {
          console.log('Decano Creado');
          this.showFormAgregarDecano = false;
         this.obtenerDecanos();
        } break;

        case 'Edit': {
          console.log('Decano Editado');
          this.showFormAgregarDecano = false;
          this.obtenerDecanos();
        } break;

        case 'Open': {
          this.showFormAgregarDecano = true;
          this.decanoEdit = decano;
          // this.pathValueFormSemestreEdit();
        } break;

        case 'Cancelar': {
          console.log('Cancelar');
          this.showFormAgregarDecano = false;
        }
      }
  }


  activarDecanoConfirm = ( decano: UsuarioRol ) => {
    this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea ACTIVAR al decano?').then( isConfirm => {
      if( !isConfirm ) return;

      this.activarDecano( decano );

    });
    
  }


  activarDecano = ( decano: UsuarioRol ) => {
    const decanoActivar = {
      idRol: decano.id,
      usuarioId: 1
    }

    this.repository.activarRolUser( decanoActivar ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alertService.showAlert('Decano activado correctamente', 'success');
        this.obtenerDecanos();
      }, error: ( error ) => {
        console.log( error );
        this.alertService.showAlert(`Ocurrio un error. ${ error }`, 'error')
      }
    });
  }

  onSelect = () => {

    if( this.decanoSelect.id == 0 ) return;

    this.alertService.sweetAlert('question', 'Confirmación', `Está seguro que desea SELECCIONAR el decano`)
    .then( isConfirm => {
      if( !isConfirm ) return;

      this.signal.setSelectDecano(  this.decanoSelect );
      this.dialogRef.close('seleccionado');
      // this.aperturarSemestre();
    
    })
  }

}