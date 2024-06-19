import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UsuarioRolRepository } from '../../domain/repositories/usuario-rol.repository';
import { UsuarioRol, UsuarioRolAgregar, UsuarioRolEliminar } from '../../domain/models/usuario-rol.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolRepository } from 'src/app/roles/domain/repositories/rol.repository';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { Rol } from 'src/app/roles/domain/models/rol.model';
import { UsuariosRolDomainService } from '../../domain/services/usuarios-rol-domain.service';
import { Usuario } from '../../domain/models/usuario.model';
import { CDK_DRAG_CONFIG, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AlertService } from 'src/app/demo/services/alert.service';
const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000
};


@Component({
  selector: 'user-rol',
  standalone: true,
  imports: [ CommonModule, SharedModule],
  templateUrl: './user-rol.component.html',
  styleUrl: './user-rol.component.scss',
  providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }]
})
export class UserRolComponent implements OnInit {

  @Input() usuario: Usuario;
  usuariosRol: UsuarioRol[];

  formAsignarRol: FormGroup;
  roles: Rol[] = []
  newRoles: Rol[] = [];
  deleteRoles: UsuarioRol[] = [];
  /* DRAG AND DROP START */

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  /* DRAG AND DROP END */

  constructor(
    private usuarioRolRepository: UsuarioRolRepository,
    private fb: FormBuilder,
    private rolRepository: RolRepository,
    private usuarioRepository: UsuarioRepository,
    private usuariosRolDomainService: UsuariosRolDomainService,
    private alertService: AlertService

  ) {
    this.formAsignarRol = this.fb.group({
      rol: ['', Validators.required],
    })
  }

  ngOnInit(): void {

    this.obtenerUsuarios().then( resolve => {
      if( !resolve ) {
        return
      }

      this.obtenerRoles();

    });

    
  }

  obtenerUsuarios = () => {

    return new Promise<boolean>( (resolve, reject) => {

      this.usuarioRolRepository.obtenerUsuariosRol().subscribe({
        next: ( data ) => {
          console.log( data );
          this.usuariosRol = data;
          this.usuariosRol = this.usuariosRol.filter( usuario => usuario.usuario == (this.usuario.apellidoPaterno +' '+ this.usuario.apellidoMaterno + ', ' + this.usuario.nombres).toLocaleUpperCase())
          resolve( true )
        }, error: ( error ) => {
          console.log( error );
          resolve( false )
        }
      });

    } )

    
  }

  obtenerRoles = () => {
    this.rolRepository.obtenerRoles().subscribe({
      next: (roles) => {
        // console.log(roles);
        const rol = roles.reduce( (roles: Rol[], rol: Rol) => {

          if( this.usuariosRol.findIndex( rolUser => rolUser.rol == rol.rol)  == -1 ) {
            console.log(rol, ' - ');
            
            roles.push(rol)
          }

        //   const rolesPendiente = this.usuariosRol.map( rolUser => {
        //     let newRol = [];
        //      if (rolUser.id !== rol.id ) {
        //       newRol.push( rol )
        //     }
        //     return newRol
        //  });
        //   console.log(rolesPendiente);
          
          // roles.filter(rol => rol.id == rol.id)
          return roles
        }, [])

        this.roles = rol
        console.log(rol);
        
      }, error: ( error ) => {
        console.log(error);
        
      }
    })
  }

  changeEstadoRol = ( $event: MatSlideToggleChange, rol: Rol ) => {
    console.log($event.checked);
    const estado = $event.checked ? 'ACTIVAR' : 'SUSPENDER'
    this.alertService.sweetAlert('question', 'Confirmación', `¿Está seguro que desea ${estado} el ROL?`).then( isConfirm => {
      if( !isConfirm ) {
        $event.source.checked = !$event.checked;
        return;
      }
      $event.checked ? this.activarRolUser( rol ) : this.suspenderRolUser( rol );

    })
  }

  changeAltaRol = ( $event: MatSlideToggleChange, rol: Rol) => {
    const alta = $event.checked ? 'DAR ALTA' : 'DAR BAJA';
    this.alertService.sweetAlert('question', 'Confirmación', `¿Está seguro que desea ${alta} el ROL?`).then( isConfirm => {
      if( !isConfirm ) {
        $event.source.checked = !$event.checked;
        return;
      }
      $event.checked ? this.darAltaRolUser( rol ) : [
        $event.source.checked = !$event.checked,
        this.alertService.showAlert('No se puede dar baja el rol')
      ];

    })
    
  }

  activarRolUser = ( rol: Rol) => {

    const rolActivar = {
      idRol: rol.id,
      usuarioId: 1
    }

    this.usuarioRolRepository.activarRolUser( rolActivar ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alertService.showAlert(`El rol ${ rol.rol}, fue activado`, 'success');
        this.obtenerUsuarios();

      }, error: ( error ) => {
        console.log(error);
        this.alertService.showAlert(`Ocurrió un error: ${ error }`, 'success');
        
      }
    });

  }
  
  darAltaRolUser = ( rol: Rol ) => {
    const rolAlta = {
      idRol: rol.id,
      usuarioId: 1
    }

    this.usuarioRolRepository.darAltaRolUser( rolAlta ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alertService.showAlert(`El rol ${ rol.rol}, fue dado de Alta`, 'success');
        this.obtenerUsuarios();

      }, error: ( error ) => {
        console.log(error);
        this.alertService.showAlert(`Ocurrió un error: ${ error }`, 'success');
        
      }
    });
  }

  suspenderRolUser = ( rol: Rol ) => {
    const rolSuspender = {
      idRol: rol.id,
      usuarioId: 1
    }
    this.usuarioRolRepository.suspenderRolUser( rolSuspender ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alertService.showAlert(`El rol ${ rol.rol}, fue suspendido`, 'success');
        this.obtenerUsuarios();
        this.obtenerRoles();
      }, error: ( error ) => {
        console.log(error);
        this.alertService.showAlert(`Ocurrió un error: ${ error }`, 'error');
        
      }
    })
  }

  guardar = () => {

    this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea guardar los cambios?').then( isConfirm => {
      if( !isConfirm ) {
        return
      }

      let contadorNew = 1;
      let contadorDelete = 1;
      this.deleteRoles.forEach( deleteRol => {
        const isLast = contadorDelete == this.deleteRoles.length;
        const eliminarRol = {
          idRol: deleteRol.id,
          usuarioId: 1 
        }

        setTimeout(() => {
          this.eliminarRolUsuario( eliminarRol, isLast );
        }, 1000);
      })
      this.newRoles.forEach( newRol => {
        const isLast = contadorNew == this.newRoles.length;
        const nuevoRol = {
          idUsuario: this.usuario.id,
          idRol: newRol.id,
          usuarioId: 1
        }
        setTimeout(() => {
          this.asignarRolUsuario( nuevoRol, isLast );
        }, 1000);
        contadorNew++;
      })

    })
    // this.newRoles.forEach
  }

  asignarRolUsuario = ( asignarRol: UsuarioRolAgregar, isLast: boolean) => {
    this.usuarioRolRepository.asignarRolToUser( asignarRol ).subscribe({
      next: ( data ) => {
        console.log(data);
        if (isLast) {
          this.alertService.showAlert('Los roles fueron asginados correctamente.', 'success');
          this.obtenerUsuarios();
          this.obtenerRoles();
          this.newRoles = [];
        }
      }, error: ( error ) => {
        console.log( error );
        this.alertService.showAlert(`Ocurrió un error: ${ error }`, 'error');

      }
    })
  }

  eliminarRolUsuario = ( eliminarRolUsuario: UsuarioRolEliminar, isLast: boolean ) => {
    this.usuarioRolRepository.eliminarRolUser( eliminarRolUsuario ).subscribe({
      next: (data) => {
        console.log(data);
        if (isLast) {
          this.alertService.showAlert('Los roles fueron eliminados correctamente.', 'success');
          this.obtenerUsuarios();
          this.obtenerRoles();
          this.deleteRoles = [];
        }
      }, error: ( error ) => {
        console.log( error );
        this.alertService.showAlert(`Ocurrió un error: ${ error }`, 'error');

      }
    })
  }

  setRol = ( rol: UsuarioRol) => {
    console.log( rol );
    
  }

  /*  DRAG AND DROP START */
  drop = (event: CdkDragDrop<string[]>, tipo: string) => {
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      // console.log(event.container.id);
      // console.log(this.deleteRoles);
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      switch( tipo ) {
        case 'asignar': {
          this.newRoles = [];
          // console.log(event.container.data);
          console.log('asignar');
          console.log(event);
          
          event.container.data.forEach( (rol: any) => {
            // console.log(rol.usuario);
            if( rol.usuario ) {
              console.log('no es asignado');
              return  
            }

            console.log(rol);
            this.newRoles.push( rol );

            
          })
          // this.newRoles.push
          // const newUser: any = this.newRoles;
          // event.container.addItem(event.item);
          // this.usuariosRol.push(newUser);
          // this.newRoles = [];
        }; break;

        case 'eliminar': {
          this.deleteRoles = [];
          // console.log(event.container.data);
          console.log('eliminar');
          event.container.data.forEach( (rol: any) => {
            // console.log(rol.usuario);
            if( !rol.usuario ) {
              console.log('no es asignado');
              return  
            }
            
            // console.log(rol);
            this.deleteRoles.push( rol );
            console.log(this.deleteRoles);
            
            
          })
          
        }; break;
      }
    }
  }
  /*  DRAG AND DROP END */

}
