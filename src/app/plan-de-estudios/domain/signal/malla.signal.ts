import { Injectable, signal } from "@angular/core";
import { CursoMallaByCiclo, CursoMallaDesfasado, CursoMallaRenovado, Malla } from "../models/malla.model";

@Injectable({
    providedIn: 'root'
})

export class MallaSignal {
    mallaDefault: Malla[] = []
    cursosMallaByCicloDefault: CursoMallaByCiclo[] = [];
    cursoMallaPreRequisitoByCicloDefault: CursoMallaByCiclo[] = [];

    cursoMallaDefault: Malla = {
        orden: 0,
        idMalla: 0,
        idCiclo: 0,
        idCurso: 0,
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

    cursoMallaByCicloDefault: CursoMallaByCiclo = {
        idCiclo: 0,
        cicloNumero: 0,
        ciclo: '',
        cursosMalla: []
    }

    cursoMallaRenovadoDefault: CursoMallaRenovado = {
        idMallaRenovada: 0,
        idCursoRenovado: 0,
        codigoCursoRenovado: "",
        nombreCursoRenovado: "",
        cicloRomanoRenovado: "",
        idMalla: 0,
        idCurso: 0,
        codigoCurso: "",
        nombreCurso: "",
        cicloRomano: ""
    }

    cursoMallaDesfasadoDefault: CursoMallaDesfasado = {
        idMalla: 0,
        idCurso: 0,
        codigoCurso: "",
        nombreCurso: "",
        cicloRomano: ""
    }

    cursoMallaSelectPreRequisito = signal( this.cursoMallaDefault );

    cursosMalla = signal<Malla[]>(this.mallaDefault);
    cursosMallaPreRequisito = signal<Malla[]>(this.mallaDefault);
    cursosMallaByCiclo = signal<CursoMallaByCiclo[]>(this.cursosMallaByCicloDefault);
    cursosMallaPreRequisitoByCiclo = signal<CursoMallaByCiclo[]>(this.cursoMallaPreRequisitoByCicloDefault);

    loading = signal<boolean>(false);

    cursoMallaOption = signal( this.cursoMallaDefault );

    cursoMallaCicloSelect = signal( this.cursoMallaByCicloDefault );

    cursoMallaRenovadoSelected = signal( this.cursoMallaRenovadoDefault )

    cursoMallaDesfasadoSelected = signal( this.cursoMallaDesfasadoDefault );


}