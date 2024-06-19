import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Usuario } from '../../domain/models/usuario.model';
import { UserRolComponent } from '../user-rol/user-rol.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ CommonModule, SharedModule, UserRolComponent ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  providers: [DatePipe]
})
export class UserDetailsComponent {

  userDetails: any = [];
  userName: any = [];
  usuario: Usuario;
  currentYear = new Date().getFullYear();
  edad: number = 0;
  component: string = '';
  constructor(
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { usuario: Usuario, component: string },
    private datePipe: DatePipe

  ) {

    this.usuario = this.data.usuario;
    this.component = this.data.component;
    this.edad = this.currentYear - new Date(this.usuario.fechaNacimiento).getFullYear();
    this.userDetails = [
 
      {
        icon: 'ti ti-mail',
        text: this.usuario.correoPersonal
      },
      {
        icon: 'ti ti-phone',
        text: this.usuario.celular
      },
      {
        icon: 'ti ti-map-pin',
        text: this.datePipe.transform(this.usuario.fechaNacimiento, 'dd/MM/yyyy')
      }
    ];

    this.userName = [
      {
        name: 'Apellidos',
        text: this.usuario.apellidoPaterno + ' ' + this.usuario.apellidoMaterno,
        secondName: 'Nombres',
        otherName: this.usuario.nombres,
        space: 'p-t-0'
      },
      {
        name: 'Tipo de Documento',
        text: this.usuario.tipoDocumento,
        secondName: 'Número de Documento',
        otherName: this.usuario.numeroDocumento
      }
    ];
  }


  


}
