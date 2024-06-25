import { Injectable, WritableSignal, signal } from "@angular/core";
import { Curso, CursoCrear } from "../models/curso.model";



@Injectable({
    providedIn: 'root'
})

export class CursoSingal {


    cursoListDefault: Curso[] = [];
    cursoCrearDafault: CursoCrear = {
        programa:'',
        ciclo: '',
        codigoCurso: '',
        nombreCurso: '',
        tipoEstudio: '',
        tipoCurso: '',
        competencia: '',
        horasTeoricas: 0,
        horasPracticas: 0,
        totalHoras: 0,
        totalCreditos: 0,
        preRequisito: []
    }
    cursoDafault: Curso = {
        id: 0,
        programa:'',
        ciclo: '',
        codigoCurso: '',
        nombreCurso: '',
        tipoEstudio: '',
        tipoCurso: '',
        competencia: '',
        horasTeoricas: 0,
        horasPracticas: 0,
        totalHoras: 0,
        totalCreditos: 0,
        preRequisito: []
    }

    cursoList: WritableSignal<Curso[]> = signal( this.cursoListDefault );

    setCursos( cursoList: Curso[]) {
        this.cursoList.set( cursoList )
    }

}