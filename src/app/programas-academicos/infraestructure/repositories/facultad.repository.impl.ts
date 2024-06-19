import { Injectable } from "@angular/core";
import { FacultadRepository } from "../../domain/repositories/facultad.repository";
import { Observable } from "rxjs";
import { Facultad, FacultadCrear, FacultadEliminar } from "../../domain/models/facultad.model";
import { FacultadService } from "../services/facultad.service";



@Injectable({
    providedIn: 'root'
})

export class FacultadRepositoryImpl implements FacultadRepository {

    constructor(

        private facultadService: FacultadService
    ) {

    }
    obtenerFacultades = (): Observable<Facultad[]> => {
        return this.facultadService.obtenerFacultades();
    }
    agregarFacultad = (facultadCrear: FacultadCrear): Observable<void> => {
        return this.facultadService.agregarFacultad( facultadCrear );
    }
    editarFacultad = (facultad: Facultad): Observable<void> => {
        return this.facultadService.editarFacultad( facultad );
    }
    eliminarFacultad = (facultadEliminar: FacultadEliminar): Observable<void> => {
        return this.facultadService.eliminarFacultad( facultadEliminar );
    }
    // obtenerFacultadesAsignadas(): Observable<FacultadAsignadaAlSemestre> {
    //     throw new Error("Method not implemented.");
    // }
    // asignarFacultad(idSemestre: number, idFacultad: number): Observable<FacultadAsignadaAlSemestre> {
    //     throw new Error("Method not implemented.");
    // }

}