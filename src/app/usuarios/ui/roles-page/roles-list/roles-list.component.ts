import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UsuarioRol } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { UsuarioRolRepository } from 'src/app/usuarios/domain/repositories/usuario-rol.repository';
import { UsuariosDomainService } from 'src/app/usuarios/domain/services/usuarios-domain.service';
import { UsuariosRolDomainService } from 'src/app/usuarios/domain/services/usuarios-rol-domain.service';
import { UsuariosRolValidations } from 'src/app/usuarios/domain/validations/usuarios-rol.validations';
import { RolesAsignarComponent } from '../roles-asignar/roles-asignar.component';

@Component({
  selector: 'roles-list',
  standalone: true,
  imports: [ CommonModule, SharedModule],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss'
})
export class RolesListComponent {

  usuariosRol = this.usuariosRolDomainService.usuariosRol;

  // public props
  displayedColumns: string[] = ['usuario', 'rol', 'alta', 'estado', 'action'];
  dataSource = new MatTableDataSource(this.usuariosRol());

  // paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // table search filter
  applyFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();
      
    }
  }

  constructor(
    private usuarioRolRepository: UsuarioRolRepository,
    public dialog: MatDialog,
    private usuarioRolValidations: UsuariosRolValidations,
    private usuariosRolDomainService: UsuariosRolDomainService
  ) {

  }

  ngOnInit(): void {
    this.obtenerUsuariosRol();
  }

  obtenerUsuariosRol = (): void => {
    this.usuarioRolRepository.obtenerUsuariosRol().subscribe({
      next: (usuariosRol: UsuarioRol[] ) => {
          console.log(usuariosRol);
          // this.usuarios = usuarios;

          // this.usuarioDomainService.setUsuarios = usuarios; 
          this.usuariosRolDomainService.setUsuariosRol( usuariosRol );
          this.dataSource.data = this.usuariosRolDomainService.usuariosRol();
          
      }, error: ( error ) => {
          console.log(error);
          
      }
    })
  }

  openModalRolAsignar = (): void => {
    const dialogRef = this.dialog.open(RolesAsignarComponent, {
      width: '800px',
      disableClose: true,

    });

    dialogRef.afterClosed().subscribe( (result: any) => {
      console.log(result);
      
      if( result == 'cancelar') {
        return
      }
      this.obtenerUsuariosRol();
      
    })
  }

}
