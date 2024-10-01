import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/usuarios/domain/models/usuario.model';
import { UsuarioRepository } from 'src/app/usuarios/domain/repositories/usuario.repository';

import { SharedModule } from 'src/app/demo/shared/shared.module';
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
  imports: [CommonModule, SharedModule, UserRolComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
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
    private authSignal: AuthSignal,
    private usuarioRepository: UsuarioRepository,
    public dialog: MatDialog,
    private modal: UiModalService,
    private usuarioDomainService: UsuariosDomainService,
    private mock: UsuarioLocalService
  ) {}

  ngOnInit(): void {
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
}
