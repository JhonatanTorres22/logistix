import { Injectable, signal } from "@angular/core";
import { Navigation } from "src/app/@theme/types/navigation";
import { Authenticated, Modulo, Rol, RolUsuario } from "../models/authenticar.model";

@Injectable({
    providedIn: 'root'
})

export class AuthenticarSignal {
    stepAuth = signal<'dni' | 'roles' | 'login'>('dni');
    dni = signal('')
    rol = signal('')

    listarRol = signal<RolUsuario[]>([])
    userDefault: Authenticated = {
        IdUsuario: "",
        apellidosyNombres: "",
        Correo: "",
        Rol: "",
        permission: "",
        jti: "",
        rt: "",
        nbf: 0,
        exp: 0,
        iat: 0,
        iss: "",
        aud: "",
        serviceToken: ""
    }
    rolDefault: Rol = {
        nombre: ''
    }
    public currentRol = signal(this.rolDefault)
    public currentUserData = signal(this.userDefault);

    setCurrentUserData(userAuthenticated: Authenticated) {
        this.currentUserData.set(userAuthenticated);
    }
}