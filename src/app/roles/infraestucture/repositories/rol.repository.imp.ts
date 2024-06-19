import { Injectable } from "@angular/core";
import { RolRepository } from "../../domain/repositories/rol.repository";
import { Observable } from "rxjs";
import { Rol } from "../../domain/models/rol.model";
import { RolService } from "../services/rol.service";

@Injectable({
    providedIn: 'root'
})

export class RolRepositoryImpl implements RolRepository {

    constructor(
        private rolService: RolService
    ) {}

    obtenerRoles = (): Observable<Rol[]> => {
        return this.rolService.obtenerRoles()
    }

}