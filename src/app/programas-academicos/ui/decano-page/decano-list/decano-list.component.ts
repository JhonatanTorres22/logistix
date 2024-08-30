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

import { AsignacionSignal } from 'src/app/programas-academicos/domain/signals/asignacion.signal';
import { FacultadSignal } from 'src/app/programas-academicos/domain/signals/facultad.signal';
import { Asignacion, AsignacionCambiarDecano } from 'src/app/programas-academicos/domain/models/asignacion.model';
import { Router } from '@angular/router';

import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { SemestreSignal } from 'src/app/programas-academicos/domain/signals/semestre.signal';
import { AsignacionRepository } from 'src/app/programas-academicos/domain/repositories/asignacion.repository';



@Component({
  selector: 'app-decano-list',
  standalone: true,
  imports: [ CommonModule, SharedModule,  UiButtonComponent, UserAddComponent],
  templateUrl: './decano-list.component.html',
  styleUrl: './decano-list.component.scss'
})
export class DecanoListComponent {

  asignaciones = this.asignacionSignal.asignaciones
  listaDecanosAsignados: Asignacion[] = [];
  showFormAgregarDecano: boolean = false;
  decanoEdit: UsuarioRol;
  decanos: WritableSignal<UsuarioRol[]>= this.signal.decanosList;
  decanoSeleccionado = this.signal.decanoSelect;
  semestreSelect = this.semestreSignal.semestreSelect;
  facultadEditDecano = this.signal.facultadEditDecano;
  facultadSelected = this.facultadSignal.facultadSelect;
  // programaes: 
  decanoSelect: UsuarioRol = {
    id: 0,
    usuario: '',
    alta: '',
    estado: '',
    rol: '0',
};
constructor(
  private router: Router,
  private asignacionSignal: AsignacionSignal,
  private signal: DecanoSignal,
  private facultadSignal: FacultadSignal,
  private repository: UsuarioRolRepository,
  private asignacionRepository: AsignacionRepository,
  private semestreSignal: SemestreSignal,
  private modal: UiModalService,
  private auth: AuthSignal,
  // private facultadSignal: LocalSignal,
  private alertService: AlertService,
  // public dialogRef: MatDialogRef<DecanoListComponent>,

  ) {

  }
  ngOnInit(): void {
    this.obtenerDecanos();
    this.decanosAsignados();
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
        const facultad = this.facultadSelected().id != 0 ? this.facultadSelected().nombre : this.facultadEditDecano().nombreFacultad;
        // const decanosRol = ['DECANO DE FACULTAD DE INGENIERÍA CIENCIAS Y ADMINISTRACIÓN', 'DECANO DE FACULTAD DE CIENCIAS DE LA SALUD']
        const decanosList = decanos.filter( usuario => usuario.rol.toUpperCase() == `DECANO DE ${ facultad.replace(',', '') }` )  // && usuario.estado == 'ACTIVO'
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
      usuarioId: parseInt( this.auth.currentRol().id )
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

        if( this.facultadEditDecano().idDecano !== 0 ) {
          console.log('Editar Director...');
          this.actualizarDecano();
          return;
        }   

        this.signal.setSelectDecano(  this.decanoSelect );
        this.modal.getRefModal().close('seleccionado');
        // this.aperturarSemestre();
    
    })
  }

  actualizarDecano = () => {
    const newDecano: AsignacionCambiarDecano = {
      idDecano: this.decanoSelect.id,
      idPrograma: this.facultadEditDecano().programas[0].idPrograma,
      idSemestre: this.semestreSelect().id,
      usuarioId: parseInt( this.auth.currentRol().id )
    }

    console.log( newDecano );
    

    this.asignacionRepository.cambiarDecano( newDecano  ).subscribe({
      next: ( response ) => {
        console.log( response);
        this.alertService.showAlert('Se ha actualizado el Director de Escuela de manera correcta.', 'success', 6);
        this.modal.dialogRef.close('DirectorEditado');

      }, error: ( error ) => {
        console.log( error );
        this.alertService.showAlert('Ocurrió un error al actualizar el Director de Escuela.', 'error', 6);
        this.modal.dialogRef.close('DirectorEditado');
        
      }
    })
  }

  decanosAsignados = () => {
    this.listaDecanosAsignados = [];
    this.asignaciones().forEach(facultad => {
      this.listaDecanosAsignados.push(facultad)
    })
  }

  deshabilitarDecanoAsignado = (decano: UsuarioRol): boolean => {   
    return this.listaDecanosAsignados.some(decanoAsignado => decanoAsignado.idDecano === decano.id )
  }

  irModuloAsignarDecano = () => {
    const message = 'Decano';
    this.router.navigate(['/configuracion/usuarios'], { state: { message: message } });
    this.modal.getRefModal().close()
  }
}