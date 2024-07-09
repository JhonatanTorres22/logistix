import { Injectable, signal } from "@angular/core";
import { Navigation } from "src/app/@theme/types/navigation";
import { Authenticated, Rol } from "../models/auth.model";


@Injectable({
    providedIn: 'root'
})


export class AuthSignal {
    userDeault: Authenticated = {
        unique_name: '',
        ApellidosyNombres: '',
        TipoDocumento: '',
        NumeroDocumento: '',
        Sexo: '',
        Edad: '',
        CorreoPersonal: '',
        CorreoInstitucional: '',
        Celular: '',
        ImagenPerfil: '',
        Roles: [],
        nbf: 0,
        exp: 0,
        iat: 0,
        iss: '',
        aud: '',
        serviceToken: ''
      }

      menusToRoleOfUsersDefault: Rol[] = [];
      menusDefault: Navigation[] = [];
      rolDefault: Rol = {
        id: '',
        menus: [],
        rol: ''
      };

      
      public currentMenu = signal(this.menusDefault)
      public currentUserData = signal(this.userDeault);
      public menusToRoleOfUsers = signal(this.menusToRoleOfUsersDefault);
      public currentRol = signal(this.rolDefault)
      public currentExpirarToken = signal(0);
      public currentTimer = signal( 0 );

      constructor() {}

      setCurrentUserData( userAuthenticated: Authenticated) {
        this.currentUserData.set( userAuthenticated );
      }

      setMenusToRoleOfUsers( userAuthenticatedRoles: Rol[]) {
        this.menusToRoleOfUsers.set( userAuthenticatedRoles );
      }

      setCurrentUserDefault() {
        this.currentUserData.set( this.userDeault );
      }

      setCurrentMenu( rolSelected: Navigation[] ) {
        this.currentMenu.set( rolSelected );
      }

      setCurrentRol( rolSelected: Rol) {
        this.currentRol.set( rolSelected );
      }

      setCurrentExpirarToken( exp: number) {
        this.currentExpirarToken.set( exp )
      }

      setCurrentTimer( num: number) {
        this.currentTimer.set( num )
      }

      checkExpiredToken(): boolean {
        return new Date( this.currentExpirarToken() ).getTime() < new Date().getTime();
      }
}