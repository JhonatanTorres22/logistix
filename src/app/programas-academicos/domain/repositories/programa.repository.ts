import { Observable } from "rxjs";
import { Facultad, FacultadCrear, FacultadEliminar } from "../models/facultad.model";
import { Programa, ProgramaCrear, ProgramaEditar, ProgramaEliminar, ProgramaFacultad } from "../models/programa.model";



export abstract class ProgramaRepository {
    abstract obtenerProgramas( idFacultad: number): Observable<ProgramaFacultad[]>;
    abstract agregarPrograma(programa: ProgramaCrear ): Observable<void>;
    abstract editarPrograma( programa: ProgramaEditar ):Observable<void>;
    abstract eliminarPrograma( programa: ProgramaEliminar ): Observable<void>;

    // abstract obtenerProgramaesAsignadas(): Observable<ProgramaAsignadaAlSemestre>
    // abstract asignarPrograma( idSemestre: number, idPrograma: number): Observable<ProgramaAsignadaAlSemestre>

}