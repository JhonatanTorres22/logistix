import { Observable } from "rxjs";
import { SemestreAcademico, SemestreAcademicoAperturar, SemestreAcademicoEliminar } from "../models/semestre-academico.model";


export abstract class SemestreAcademicoRepository {
    abstract obtenerSemestres(): Observable<SemestreAcademico[]>;
    abstract agregarSemestre( semestre: SemestreAcademico ): Observable<void>;
    abstract editarSemestre( semestre: SemestreAcademico): Observable<void>;
    abstract eliminarSemestre( semestreEliminar: SemestreAcademicoEliminar ):Observable<void>

}