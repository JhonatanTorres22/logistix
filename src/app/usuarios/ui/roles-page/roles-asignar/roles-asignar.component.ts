import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Rol } from 'src/app/roles/domain/models/rol.model';
import { RolRepository } from 'src/app/roles/domain/repositories/rol.repository';
import { Usuario } from 'src/app/usuarios/domain/models/usuario.model';
import { UsuarioRepository } from 'src/app/usuarios/domain/repositories/usuario.repository';

@Component({
  selector: 'roles-asignar',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiInputComponent, UiButtonComponent],
  templateUrl: './roles-asignar.component.html',
  styleUrl: './roles-asignar.component.scss'
})
export class RolesAsignarComponent implements OnInit {

  formAsignarRol: FormGroup;
  roles: Rol[] = []

  usuarios: Usuario[] = [];
  constructor(

    private fb: FormBuilder,
    private rolRepository: RolRepository,
    private usuarioRepository: UsuarioRepository
    
  ) {
    this.formAsignarRol = this.fb.group({
      rol: ['', Validators.required],
      usuario: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerRoles();
  }

  obtenerRoles = () => {
    this.rolRepository.obtenerRoles().subscribe({
      next: (roles) => {
        this.roles = roles;

      }, error: ( error ) => {
        
        console.log(error);
        
      }
    })
  }

  obtenerUsuarios = () => {
    this.usuarioRepository.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios
      }, error: ( error ) => {
        console.log( error );
        
      }
    })
  }

}
