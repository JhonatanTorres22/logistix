import { Observable } from "rxjs";
import { Asignacion, AsignarNuevoPrograma } from "../../domain/models/asignacion.model";
import { AsignacionRepository } from "../../domain/repositories/asignacion.repository";
import { Injectable } from "@angular/core";
import { AsignacionService } from "../services/asignacion.service";

@Injectable({
    providedIn: 'root'
})

export class AsignacionRepositoryImpl implements AsignacionRepository {
  
    constructor( private asignacionService: AsignacionService ) {}
    
    obtener(idSemestre: number): Observable<Asignacion[]> {
        return this.asignacionService.obtener(idSemestre);
    }
    
    insertar(newPrograma: AsignarNuevoPrograma): Observable<void> {
        return this.asignacionService.insertar( newPrograma );
    }
}