import { CommonModule } from "@angular/common";
import { Component, computed } from "@angular/core";
import { SharedModule } from "../../demo/shared/shared.module";
import { AuthenticarSignal } from "../domain/signals/authenticar.signal";
import { SearchDniComponent } from "./search-dni/search-dni.component";
import { SelectRolComponent } from "./select-rol/select-rol.component";
import { LoginComponent } from "./login/login.component";



@Component({
    selector: 'auth-page',
    templateUrl: './auth-page.component.html',
    styleUrls: ['./auth-page.component.scss'],
    standalone: true,
    imports: [ CommonModule,SelectRolComponent, SharedModule, SearchDniComponent, LoginComponent ]
})

export class AuthComponent {
    step = this.authSignal.stepAuth
    
    constructor(
        private authSignal : AuthenticarSignal
    ){}

     toggleTitle = computed(() => {
    switch (this.step()) {
      case 'dni': return '¡Bienvenido a Logística!';
      case 'roles': return 'Seleccione su rol';
      case 'login': return 'Ingrese sus credenciales';
    }
  });

  toggleText = computed(() => {
    switch (this.step()) {
      case 'dni': return 'Para conectarse, ingrese el número de DNI';
      case 'roles': return 'Elija un rol para continuar';
      case 'login': return 'Ingrese sus credenciales para iniciar sesión';
    }
  });
}