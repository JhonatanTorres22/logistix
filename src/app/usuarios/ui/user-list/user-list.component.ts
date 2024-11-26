import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioCrearMasivo, Usuario, UsuarioCrear } from 'src/app/usuarios/domain/models/usuario.model';
import { UsuarioRepository } from 'src/app/usuarios/domain/repositories/usuario.repository';

import { CommonModule } from '@angular/common';
import { UserAddComponent } from '../user-add/user-add.component';
import { CustomerDetailsComponent } from 'src/app/demo/pages/application/customer-list/customer-details/customer-details.component';
import { CustomerDetailsEditComponent } from 'src/app/demo/pages/application/customer-list/customer-details-edit/customer-details-edit.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UsuariosDomainService } from '../../domain/services/usuarios-domain.service';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UsuarioLocalService } from '../../infraestructure/services/usuario-local.service';
import { Router } from '@angular/router';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { User } from 'src/app/@theme/types/user';
import { UserRolComponent } from '../user-rol/user-rol.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { UserImportTemplateComponent } from '../user-import-template/user-import-template.component';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/demo/services/alert.service';
import { UsuarioSignal } from '../../domain/signals/usuario.signal';
import { Rol } from 'src/app/roles/domain/models/rol.model';
import { MatSelectChange } from '@angular/material/select';
import { RolRepository } from 'src/app/roles/domain/repositories/rol.repository';
import { UsuarioRolSignal } from '../../domain/signals/usuario-rol.signal';

export interface PeriodicElement {
  id: number;
  name: string;
  img: string;
  email: string;
  contact: string;
  order: number;
  spent: string;
  status: string;
  status_type: string;
}

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [CommonModule, SharedModule, UserRolComponent,UserImportTemplateComponent, UiButtonComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  loadingImportUser = this.usuarioSignal.loadingImportUser
  roles = this.signalRol.roles;
  userImportExcel = this.usuarioSignal.userImportExcel
  file = this.mensajeriaSignal.file;
  @ViewChild('userRol') userRol: TemplateRef<any>;
  currentRol = this.authSignal.currentRol;
  usuarios: Usuario[] = [];
  usuarioSelected: Usuario;
  mensajeAsignarRolDirectoroDecano: string;

  // public props
  displayedColumns: string[] = ['fullName', 'tipoDocumento', 'numeroDocumento', 'action'];
  dataSource = new MatTableDataSource(this.usuarios);

  // paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // table search filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
    }
  }

  constructor(
    private signalRol: UsuarioRolSignal,
    private rolRepository: RolRepository,
    private usuarioSignal: UsuarioSignal,
    private alertaService:AlertService,
    private mensajeriaSignal: MensajeriaSignal,
    private authSignal: AuthSignal,
    private usuarioRepository: UsuarioRepository,
    public dialog: MatDialog,
    private modal: UiModalService,
    private usuarioDomainService: UsuariosDomainService,
    private mock: UsuarioLocalService
  ) {}

  ngOnInit(): void {
    this.obtenerRoles()
     const state = history.state;
     if (state && state.message) {
       this.mensajeAsignarRolDirectoroDecano = state.message;
     }     
    this.obtenerUsuarios();
    // this.getUserMock();
  }

  // getUserMock() {
  //   this.mock.getUser().subscribe({
  //     next: (data) => {
  //       console.log('MOCK WEB SERVICES INIT');
        
  //       console.log(data);
        
  //     }, error: (error) => {
  //       console.log('MOCK WEB SERVICES ERROR');
  //       console.log(error);
        
  //     }
  //   })
  // }

  obtenerUsuarios = (): void => {
    this.usuarioRepository.obtenerUsuarios().subscribe({
      next: (usuarios: Usuario[] ) => {

          this.usuarioDomainService.setUsuarios = usuarios; 
          this.dataSource.data = this.usuarioDomainService.getListaDeUsuarios;
          
          
      }, error: ( error ) => {
          console.log(error);
          
      }
    })
  }

  openModalUserAdd = (): void => {
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '800px',
      disableClose: true,

    });

    dialogRef.afterClosed().subscribe( result => {
      
      if( result == 'cancelar') {
        return
      }
      this.obtenerUsuarios();
      
    })
  }

  openModalUserEdit = ( usuario: Usuario): void => {
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '800px',
      data: usuario,
      disableClose: true,

    });

    dialogRef.afterClosed().subscribe( result => {
      
      if( result == 'cancelar') {
        return
      }
      this.obtenerUsuarios();
    })
  }

    // open dialog customer details view
  customerDetails = ( usuario: Usuario): void => {
    this.usuarioSelected = usuario;
    this.modal.openTemplate( {
     template: this.userRol,
     titulo: 'Detalles del Usuario',
    });
  }

  // open dialog of customer edit details
  customerDetailsEdit = () => {
    this.dialog.open(CustomerDetailsEditComponent, {
      width: '800px'
    });
  }

  // life cycle event
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  modalImportarDocente = (template: TemplateRef<any>) => {
    this.modal.openTemplate({
      template,
      titulo: 'Importar Docentes'
    }).afterClosed().subscribe(response => {
      if (response == 'cancelar') {
        console.log(response);
        return
      }
    });
  }
  
  importarDocente = () => {
    this.loadingImportUser.set(true);
    Swal.fire({
      title: "¡Cuidado!",
      titleText: "Recuerde que no se podrán ingresar personas duplicadas",
      text: "¿Está seguro que desea continuar?",
      imageUrl: "./assets/gif/avatar-iguales.gif", // URL del GIF de los avatares
      imageWidth: 250,
      imageHeight: 150,
      imageAlt: "Error: Personas duplicadas no permitidas",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: '#d33',
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (!result.isConfirmed) {
        this.loadingImportUser.set(false);
        console.log("Usuario decidió cancelar");
        return
      }
      this.alertaService.sweetAlert('question', 'Confirmación', `¿Está seguro que desea guardar los usuarios importados con el rol de ${this.seleccionarRol.rol}?`)
      .then(isConfirm => {
        if(!isConfirm){
          this.loadingImportUser.set(false);
          return
        }
        const docentes: UsuarioCrearMasivo[] = this.userImportExcel().map(docente => {
          return{
            nombres: docente.nombres,
            apellidoPaterno: docente.apellido_paterno,
            apellidoMaterno: docente.apellido_materno,
            tipoDocumento: docente.documento,
            numeroDocumento: docente.n_documento.toString(),
            sexo: docente.sexo,
            fechaNacimiento: docente.fecha_nacimiento,
            correoPersonal: docente.correo_personal,
            correoInstitucional: docente.correo_institucional,
            celular: docente.celular.toString(),
            imagenPerfil: '',
            usuarioId:parseInt( this.authSignal.currentRol().id ),
            idRol: this.seleccionarRol.id
          }
        })
        console.log(docentes,'lista de docentes que se va a crear');

        this.agregarUsuarioConRol(docentes)
      })
    });
  }

  agregarUsuarioConRol = (agregarUsuario: UsuarioCrearMasivo[]) => {
    this.usuarioRepository.agregarUsuarioMasivo(agregarUsuario).subscribe({
      next: (usuario) => {
        console.log('usuario');
        this.alertaService.showAlert('Usuario registrado exitosamente', 'success');
        this.obtenerUsuarios()
        this.modal.getRefModal()?.close('Obtener');
        this.seleccionarRol = this.usuarioSignal.seleccionarRolDefault
        this.loadingImportUser.set(false);
      } , error: ( error ) => {
        console.log(error,'este es el error');
        this.alertaService.showAlert('Hubo un error al registrar los usuarios', 'error')
        this.loadingImportUser.set(false);
      }
    })
  }

  obtenerRoles = () => {
    this.rolRepository.obtenerRoles().subscribe({
      next: (roles) => {

        this.roles.set( roles );

        
      }, error: ( error ) => {
        console.log(error);
        
      }
    })
  }

  seleccionarRol: Rol;

  // Método que maneja el evento selectionChange
  onRoleChange(event: MatSelectChange): void {
    // Obtenemos el rol completo (con id y nombre)
    const rolSeleccionado = this.roles().find(rol => rol.id === event.value)!;
    this.seleccionarRol = rolSeleccionado;
  }
  

}
