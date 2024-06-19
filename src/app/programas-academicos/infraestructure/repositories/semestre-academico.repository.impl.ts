import { Observable } from "rxjs";
import { SemestreAcademico, SemestreAcademicoAperturar, SemestreAcademicoCerrar, SemestreAcademicoEliminar } from "../../domain/models/semestre-academico.model";
import { SemestreAcademicoRepository } from "../../domain/repositories/semestre-academico.repository";
import { SemestreAcademicoLocalService } from "../services/semestre-academico-local.service";
import { Injectable, Signal } from "@angular/core";
import { SemestreAcademicoMock } from "../mocks/semestre-academico.mock";
import { SemestreAcademicoService } from "../services/semestre-academico.service";

@Injectable({
    providedIn: 'root'
})

export class SemestreAcademicoRepositoryImpl implements SemestreAcademicoRepository {

    constructor(
        private semestreAcademicoMock: SemestreAcademicoMock,
        private semestreAcademicoService: SemestreAcademicoService
    ) {

    }
    
    
    obtenerSemestres = (): Observable<SemestreAcademico[]> => {
        return this.semestreAcademicoService.obtenerSemestres();
        // throw new Error("Method not implemented.");
    }
    agregarSemestre = (semestre: SemestreAcademico): Observable<void> => {
        return this.semestreAcademicoService.agregarSemestre( semestre );
    }
    editarSemestre = (semestre: SemestreAcademico): Observable<void> => {
        return this.semestreAcademicoService.editarSemestre( semestre );
    }
    eliminarSemestre = (semestre: SemestreAcademicoEliminar): Observable<void> => {
        return this.semestreAcademicoService.eliminarSemestre( semestre );
    }
    
    aperturarSemestre = (semestreAperturar: SemestreAcademicoAperturar): Observable<void> => {
        return this.semestreAcademicoService.aperturarSemestre( semestreAperturar );
    }

    cerrarSemestre = (semestreCerrar: SemestreAcademicoCerrar): Observable<void> => {
        return this.semestreAcademicoService.cerrarSemestre( semestreCerrar )
    }
}