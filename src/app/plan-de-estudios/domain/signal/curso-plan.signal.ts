import { Injectable, signal } from "@angular/core";
import { CursoPlanEquivalencia } from "../models/curso-plan.model";

@Injectable({
    providedIn: 'root'
})

export class CursoPlanSignal {

    cursoPlanEquivalenciaDefault: CursoPlanEquivalencia = {
        idCursoPlan: 0,
        nombreCurso: '',
        codigoCurso: '',
        tipoCurso: '',
        tipoEstudio: '',
        horasTeoricas: 0,
        horasPracticas: 0,
        totalHoras: 0,
        totalCreditos: 0,
        cicloRomano: '',
        cicloNumero: '',
        cicloLetra: '',
        equivalencias: []
    }

    cursoPlanEquivalenciaSelected = signal<CursoPlanEquivalencia>(this.cursoPlanEquivalenciaDefault);
    cursoPlanEquivalenciaUltimo = signal<CursoPlanEquivalencia>(this.cursoPlanEquivalenciaDefault);

}