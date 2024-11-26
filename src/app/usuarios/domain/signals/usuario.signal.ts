import { Injectable, signal } from "@angular/core";
import { UserImportExcel } from "../models/usuario.model";
import { Rol } from "src/app/roles/domain/models/rol.model";

@Injectable({
    providedIn: 'root'
})

export class UsuarioSignal {

    userImportExcelDefault: UserImportExcel[] = [];
    userImportExcel = signal( this.userImportExcelDefault );

    loadingImportUser = signal<boolean>(false);

    seleccionarRolDefault: Rol = {
        id: 0,
        usuario: "",
        rol: "",
        alta: "",
        estado: ""
    }
}

