import { Inject, OnInit, WritableSignal, signal } from "@angular/core";
import { Rol } from "src/app/auth/domain/models/auth.model";
import { AuthDomainService } from "src/app/auth/domain/services/auth-domain.service";
import { AuthService } from "src/app/auth/infraestructure/services/auth.service";

export class RolUserId {

    // public idRol: WritableSignal<Rol>;
    // static currentRolUser = new AuthDomainService().currentRol;
    // constructor( private signal: AuthDomainService ) {
    //     this.idRol = this.signal.currentRol;
    // }
    static currentIdRolUser: number = localStorage.getItem('currentRol') ? JSON.parse(localStorage.getItem('currentRol')!).id : '';
    // static currentIdRolUser() {} 

    // public idRolUser() {
        
    //     const currentRol =  this.idRol;
        

    //     return currentRol;
    // }

 
    

    
    
}

