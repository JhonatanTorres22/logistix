import { Injectable, signal } from "@angular/core";
import { CursoMallaByCiclo, Malla } from "../models/malla.model";

@Injectable({
    providedIn: 'root'
})

export class MallaSignal {
    mallaDefault: Malla[] = []
    cursoMallaByCicloDefault: CursoMallaByCiclo[] = [];
    cursoMallaPreRequisitoByCicloDefault: CursoMallaByCiclo[] = [];

    cursoMallaDefault: Malla = {
        orden: 0,
        idMalla: 0,
        codigoCurso: '',
        nombreCurso: '',
        tipoCurso: '',
        tipoEstudio: '',
        horasTeoricas: 0,
        horasPracticas: 0,
        totalHoras: 0,
        totalCreditos: 0,
        estado: '',
        cicloRomano: '',
        cicloNumero: 0,
        cicloLetra: '',
        competencia: '',
        descripcion: '',
        equivalencias: [],
        color: '',
        preRequisitos: []
    }

    cursoMallaSelectPreRequisito = signal( this.cursoMallaDefault );

    cursosMalla = signal<Malla[]>(this.mallaDefault);
    cursosMallaPreRequisito = signal<Malla[]>(this.mallaDefault);
    cursosMallaByCiclo = signal<CursoMallaByCiclo[]>(this.cursoMallaByCicloDefault);
    cursosMallaPreRequisitoByCiclo = signal<CursoMallaByCiclo[]>(this.cursoMallaPreRequisitoByCicloDefault);

    loading = signal<boolean>(false);
}