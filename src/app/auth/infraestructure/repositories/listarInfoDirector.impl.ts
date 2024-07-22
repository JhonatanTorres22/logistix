import { Injectable } from "@angular/core";
import { ListarInfoDirectorRepository } from "../../domain/repositories/listarInfoDirector.repository";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { ListarInfoDirector } from "../../domain/models/listarInfoDirector.model";
import { Auth } from "../../domain/models/auth.model";

@Injectable({
    providedIn: 'root'
})

export class ListarInfoDirectorRepositoryImpl implements ListarInfoDirectorRepository{
    constructor(
        private service: AuthService
    ){}

    obtener(idRol: number): Observable<ListarInfoDirector[]> {
        return this.service.obtener(idRol)
    }
}