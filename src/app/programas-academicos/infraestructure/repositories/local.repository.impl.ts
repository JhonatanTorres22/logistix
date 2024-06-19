import { Injectable } from "@angular/core";
import { LocalRepository } from "../../domain/repositories/local.repository";
import { Observable } from "rxjs";
import { Local, LocalCrear, LocalEliminar } from "../../domain/models/local.model";
import { LocalService } from "../services/local.service";

@Injectable({
    providedIn: 'root'
})

export class LocalRepositoryImpl implements LocalRepository {

    constructor(
        private service: LocalService
    ) {}

    obtener = (): Observable<Local[]> => {
        return this.service.obtener();
    }

    agregar = (local: LocalCrear): Observable<void> => {
        return this.service.agregar( local );
    }

    editar = (local: Local): Observable<void> => {
        return this.service.editar( local );
    }
    
    eliminar = (local: LocalEliminar): Observable<void> => {
        return this.service.eliminar( local );
    }

}