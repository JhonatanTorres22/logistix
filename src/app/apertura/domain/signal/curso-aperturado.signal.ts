import { Injectable, signal, WritableSignal } from "@angular/core";
import { ListarInfoDirector } from "src/app/auth/domain/models/listarInfoDirector.model";
import {  ListaGrupoCursos, ListarCursosAperturados } from "../models/apertura-curso.model";

@Injectable({
    providedIn: 'root'
})

export class CursoAperturadoSignal {

    
    cursosAperturadosListDefault:ListaGrupoCursos[] = []

    cursoAperturadoDefault : ListarCursosAperturados = {
        idAperturaCurso: 0,
        codigoInternoCurso: "",
        nombreCurso: "",
        tipoDeCurso: "",
        tipoDeEstudio: "",
        competencia: "",
        ht: 0,
        hp: 0,
        tHoras: 0,
        tCreditos: 0,
        idCiclo: 0,
        definicionCiclo: "",
        nSecciones: 0,
        denominacionResumen: "",
        idPlanDeEstudio: 0,
        resolucion: ""
    }

    listarCursosAperturadosDefault : ListarCursosAperturados[] = []
    listarCursosAperturados: WritableSignal<ListarCursosAperturados[]> = signal(this.listarCursosAperturadosDefault)
    cursoAperturado : WritableSignal<ListarCursosAperturados> = signal(this.cursoAperturadoDefault)
    listaCursosAperturados: WritableSignal<ListaGrupoCursos[]> = signal(this.cursosAperturadosListDefault)
    selectSemestreLocalDefault: ListarInfoDirector = {
        idProgramaAcademico: 0,
        idSemestre: 0,
        DescripcionLocal: "",
        DescripcionSemestre: "",
        NombreProgramaAcademico: "",
        codigoLocal: 0
    }

    selectSemestreLocal: WritableSignal<ListarInfoDirector> = signal(this.selectSemestreLocalDefault)

    renderizarPor = signal( '' );
    selectProgramaSeleccionado = signal(false)
}