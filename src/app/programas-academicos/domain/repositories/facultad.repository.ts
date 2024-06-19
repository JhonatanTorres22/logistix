import { Observable } from "rxjs";
import { Facultad, FacultadCrear, FacultadEliminar } from "../models/facultad.model";



export abstract class FacultadRepository {
    abstract obtenerFacultades(): Observable<Facultad[]>;
    abstract agregarFacultad( facultad: FacultadCrear ): Observable<void>;
    abstract editarFacultad( facultad: Facultad ):Observable<void>;
    abstract eliminarFacultad( facultad: FacultadEliminar ): Observable<void>;

    // abstract obtenerFacultadesAsignadas(): Observable<FacultadAsignadaAlSemestre>
    // abstract asignarFacultad( idSemestre: number, idFacultad: number): Observable<FacultadAsignadaAlSemestre>

}