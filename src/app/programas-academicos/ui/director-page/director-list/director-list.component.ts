import { CommonModule } from '@angular/common';
import { Component, EventEmitter, WritableSignal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { DirectorSignal } from 'src/app/programas-academicos/domain/signals/director.signal';
import { ProgramaSignal } from 'src/app/programas-academicos/domain/signals/programa.signal';
import { UsuarioRol } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { UsuarioRolRepository } from 'src/app/usuarios/domain/repositories/usuario-rol.repository';
import { UserAddComponent } from 'src/app/usuarios/ui/user-add/user-add.component';

@Component({
  selector: 'director-list',
  standalone: true,
  imports: [ CommonModule, SharedModule,  UiButtonComponent, UserAddComponent ],
  templateUrl: './director-list.component.html',
  styleUrl: './director-list.component.scss'
})
export class DirectorListComponent {

  
  showFormAgregarDirector: boolean = false;
  directorEdit: UsuarioRol;
  directores: WritableSignal<UsuarioRol[]>= this.signal.directoresList;
  directorSeleccionado = this.signal.directorSelect;
  programaSelected = this.programaSignal.programaSelect;
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
  // private facultadSignal: LocalSignal,
  private alertService: AlertService,
  public dialogRef: MatDialogRef<DirectorListComponent>,

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
        const decanosRol = ['DIRECTOR DE ESCUELA DE INGENIERÍA DE SISTEMAS']

        const directorList = directores.filter( usuario =>  usuario.rol.toUpperCase() == `DIRECTOR DE ESCUELA DE ${ this.programaSelected().nombre}`)  // && usuario.estado == 'ACTIVO'
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
      usuarioId: 1
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

      this.signal.setSelectDirector(  this.directorSelect );
      this.dialogRef.close('seleccionado');
      // this.aperturarSemestre();
    
    })
  }

  irModuloAsignarDirector = () => {
    const message = 'Director';
    this.router.navigate(['/configuracion/usuarios'], { state: { message: message } });
    this.dialogRef.close()
  }
}