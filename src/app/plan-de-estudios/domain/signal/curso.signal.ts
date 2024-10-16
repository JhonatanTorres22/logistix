import { Injectable, WritableSignal, signal } from "@angular/core";
import { Curso, CursoByCiclo, CursoCrear, CursoDesfasado, CursoExcel } from "../models/curso.model";
import { Malla } from "../models/malla.model";

@Injectable({
    providedIn: 'root'
})

export class CursoSignal {


    cursoListDefault: Curso[] = [];
    cursoCrearDafault: CursoCrear = {

        codigoCurso: '',
        nombreCurso: '',
        // idCiclo: 0,
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
        // preRequisitos: []
    }

    

    cursoDesfasadoDefault: CursoDesfasado = {
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
    }

    cursoCicloSelectDefault: CursoByCiclo = {

        ciclo: '',
        cicloNumero: 0,
        cursos: [],
        cursosPlan: [],
        idCiclo: 0
        
    }

    cursoByClicloDefault: CursoByCiclo[] = []

    preRequisitoDefault: Curso[] = []

    cursoByCliclosDefault: CursoByCiclo[] = []

    cursosByCiclo = signal( this.cursoByClicloDefault );

    cursoSelect = signal( this.cursoDafault );

    cursoSelectPreRequisito = signal( this.cursoDafault );
    

    cursosList: WritableSignal<Curso[]> = signal( this.cursoListDefault );

    preRequisitos = signal( this.preRequisitoDefault )

    cursoCicloSelect = signal<CursoByCiclo>( this.cursoCicloSelectDefault );

    openCursoPreRequisito = signal( false );

    cursoOption = signal( this.cursoDafault );

    cursoDesfasadoSelected = signal( this.cursoDesfasadoDefault );

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

    cursosImportExcelDefault: CursoExcel[] = [];
    cursosImportExcel = signal( this.cursosImportExcelDefault );

}