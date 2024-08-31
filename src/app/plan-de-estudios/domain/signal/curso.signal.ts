import { Injectable, WritableSignal, signal } from "@angular/core";
import { Curso, CursoByCiclo, CursoCrear } from "../models/curso.model";
import { Ciclo } from "../models/ciclo.model";



@Injectable({
    providedIn: 'root'
})

export class CursoSingal {


    cursoListDefault: Curso[] = [];
    cursoCrearDafault: CursoCrear = {

        codigoCurso: '',
        nombreCurso: '',
        idCiclo: 0,
        competencia: '',
        descripcion: '',
        idPrograma: 0,
        tipoCurso: '',
        tipoEstudio: '',
        horasTeoricas: 0,
        horasPracticas: 0,
        totalHoras: 0,
        totalCreditos: 0,
        usuarioId: 0,
    }
    cursoDafault: Curso = {
        id: 0,
        idPrograma: 0,
        descripcion: '',
        idCiclo: 0,
        definicionCiclo: '',
        codigoCurso: '',
        nombreCurso: '',
        tipoEstudio: '',
        tipoCurso: '',
        competencia: '',
        horasTeoricas: 0,
        horasPracticas: 0,
        totalHoras: 0,
        totalCreditos: 0,
        preRequisitos: []
    }
    cursoCicloSelectDefault: CursoByCiclo = {

        ciclo: '',
        cursos: [],
        idCiclo: 0
        
    }
    cursoByClicloDefault: CursoByCiclo = {
        ciclo: '',
        idCiclo: 0,
        cursos: []
    }

    preRequisitoDefault: Curso[] = []

    cursoByCliclosDefault: CursoByCiclo[] = []

    cursosByCiclo = signal( this.cursoByClicloDefault );
    cursosByCiclos = signal( this.cursoByCliclosDefault );
    cursosPlanByCiclos = signal( this.cursoByCliclosDefault );

    cursoSelect = signal( this.cursoDafault );
    cursoSelectPreRequisito = signal( this.cursoDafault );

    cursosList: WritableSignal<Curso[]> = signal( this.cursoListDefault );
    preRequisitos = signal( this.preRequisitoDefault )

    cursoCicloSelect = signal<CursoByCiclo>( this.cursoCicloSelectDefault );

    openCursoPreRequisito = signal( false );

    setCursos( cursoList: Curso[]) {
        this.cursosList.set( cursoList )
    }

    setCursoSelectDefault() {
        this.cursoSelect.set( this.cursoDafault );
    }

    setCursoCicloSelectDefault() {
        this.cursoCicloSelect.set( this.cursoCicloSelectDefault );
    }

    renderizarCursos = signal( '' );

}