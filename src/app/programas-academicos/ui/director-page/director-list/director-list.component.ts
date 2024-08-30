import { CommonModule } from '@angular/common';
import { Component, EventEmitter, WritableSignal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiModalTemplateComponent } from 'src/app/core/components/ui-modal-template/ui-modal-template.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AsignacionProgramaCambiarDirector } from 'src/app/programas-academicos/domain/models/asignacion.model';
import { AsignacionRepository } from 'src/app/programas-academicos/domain/repositories/asignacion.repository';
import { DirectorSignal } from 'src/app/programas-academicos/domain/signals/director.signal';
import { ProgramaSignal } from 'src/app/programas-academicos/domain/signals/programa.signal';
import { SemestreSignal } from 'src/app/programas-academicos/domain/signals/semestre.signal';
import { UsuarioRol } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { UsuarioRolRepository } from 'src/app/usuarios/domain/repositories/usuario-rol.repository';
import { UserAddComponent } from 'src/app/usuarios/ui/user-add/user-add.component';

@Component({
  selector: 'director-list',
  standalone: true,
  imports: [ CommonModule, SharedModule,  UiButtonComponent, UserAddComponent, UiModalTemplateComponent ],
  templateUrl: './director-list.component.html',
  styleUrl: './director-list.component.scss'
})
export class DirectorListComponent {

  
  showFormAgregarDirector: boolean = false;
  directorEdit: UsuarioRol;
  directores: WritableSignal<UsuarioRol[]>= this.signal.directoresList;
  directorSeleccionado = this.signal.directorSelect;
  programaSelected = this.programaSignal.programaSelect;
  programaEditDirector = this.programaSignal.programaEditDirector;
  currentRol = this.authSignal.currentRol;
  semestreSelect = this.semestreSignal.semestreSelect;
  // programaes: 
  directorSelect: UsuarioRol = {
    id: 0,
    usuario: '',
    alta: '',
    estado: '',
    rol: '0',
};
constructor(
  private router: Router,
  private signal: DirectorSignal,
  private programaSignal: ProgramaSignal,
  private repository: UsuarioRolRepository,
  private asignacionRepository: AsignacionRepository,
  private authSignal: AuthSignal,
  private semestreSignal: SemestreSignal,
  // private facultadSignal: LocalSignal,
  private alertService: AlertService,
  private auth: AuthSignal,
  private modal: UiModalService,
  // public dialogRef: MatDialogRef<DirectorListComponent>,

  ) {

  }
  ngOnInit(): void {
    this.obtenerDirectores();
  }

  openShowFormCrearDirector = ( event?: EventEmitter<string> | string) => {

    console.log(event);
    
      switch( event ) {
        case 'Add': {
          console.log('Director Creado');
          this.directorEdit = {
            id: 0,
            usuario: '',
            alta: '',
            estado: '',
            rol: '0',
          };
          this.showFormAgregarDirector = false;
         this.obtenerDirectores();
        } break;

        case 'Edit': {
          console.log('Director Editado');
          this.directorEdit = {
            id: 0,
            usuario: '',
            alta: '',
            estado: '',
            rol: '0',
          };
          this.showFormAgregarDirector = false;
          this.obtenerDirectores();
        } break;

        case 'Open': {
          this.showFormAgregarDirector = true;
          this.directorEdit = {
            id: 0,
            usuario: '',
            alta: '',
            estado: '',
            rol: '0',
          };
        } break;

        case 'Cancelar': {
          console.log('Cancelar');
          this.directorEdit = {
            id: 0,
            usuario: '',
            alta: '',
            estado: '',
            rol: '0',
          };
          this.showFormAgregarDirector = false;
        }
      }
  }

  obtenerDirectores = () => {
    this.repository.obtenerUsuariosRol().subscribe({
      next: ( directores ) => {
        console.log(directores);
        // const decanosRol = ['DIRECTOR DE ESCUELA DE INGENIERÍA DE SISTEMAS']
        console.log( this.programaSelected() );

        const nombrePrograma = this.programaSelected().id != 0 ? this.programaSelected().nombre : this.programaEditDirector().nombrePrograma;
        
        const directorList = directores.filter( usuario =>  usuario.rol.toUpperCase() == `DIRECTOR DE ESCUELA DE ${ nombrePrograma }`)  // && usuario.estado == 'ACTIVO'
        this.signal.setDirectoresList( directorList );

        if(this.directores().length > 0){
          let directorSeleccionado = this.directores().find(director => director.id === this.directorSeleccionado().id )
          if(directorSeleccionado){
            this.directorSelect = directorSeleccionado;
          }
        } 
        
      }, error: ( error ) => {
        console.log(error);
        this.alertService.showAlert('Ocurrió un error, no se pudo listar los directores', 'error');
      }
    })
  }

  
  openShowFormEditarDirector = ( director: UsuarioRol, event?: EventEmitter<string> | string) => {

    console.log(event);
    
      switch( event ) {
        case 'Add': {
          console.log('Director Creado');
          this.showFormAgregarDirector = false;
         this.obtenerDirectores();
        } break;

        case 'Edit': {
          console.log('Director Editado');
          this.showFormAgregarDirector = false;
          this.obtenerDirectores();
        } break;

        case 'Open': {
          this.showFormAgregarDirector = true;
          this.directorEdit = director;
          // this.pathValueFormSemestreEdit();
        } break;

        case 'Cancelar': {
          console.log('Cancelar');
          this.showFormAgregarDirector = false;
        }
      }
  }


  activarDirectorConfirm = ( director: UsuarioRol ) => {
    this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea ACTIVAR al director?').then( isConfirm => {
      if( !isConfirm ) return;

      this.activarDirector( director );

    });
    
  }


  activarDirector = ( director: UsuarioRol ) => {
    const directorActivar = {
      idRol: director.id,
      usuarioId: parseInt( this.auth.currentRol().id )
    }

    this.repository.activarRolUser( directorActivar ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alertService.showAlert('Director activado correctamente', 'success');
        this.obtenerDirectores();
      }, error: ( error ) => {
        console.log( error );
        this.alertService.showAlert(`Ocurrio un error. ${ error }`, 'error')
      }
    });
  }

  onSelect = () => {

    if( this.directorSelect.id == 0 ) return;

    this.alertService.sweetAlert('question', 'Confirmación', `Está seguro que desea SELECCIONAR el director`)
    .then( isConfirm => {
      if( !isConfirm ) return;
      
        if( this.programaEditDirector().idDirector !== 0 ) {
          console.log('Editar Director...');
          this.actualizarDirector();
          return;
        }     
        this.signal.setSelectDirector(  this.directorSelect );
        this.modal.dialogRef.close('seleccionado');
        // this.aperturarSemestre();
      
    })
  }

  actualizarDirector = () => {
    const newDirector: AsignacionProgramaCambiarDirector = {
      idDirector: this.directorSelect.id,
      idPrograma: this.programaEditDirector().idPrograma,
      idSemestre: this.semestreSelect().id,
      usuarioId: parseInt( this.currentRol().id )
    }
    this.asignacionRepository.cambiarDirector( newDirector  ).subscribe({
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

  irModuloAsignarDirector = () => {
    const message = 'Director';
    this.router.navigate(['/configuracion/usuarios'], { state: { message: message } });
    this.modal.dialogRef.close()
  }
}