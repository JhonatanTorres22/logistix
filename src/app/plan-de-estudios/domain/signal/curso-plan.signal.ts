import { Injectable, signal } from "@angular/core";
import { CursoPlanBase, CursoPlanByCiclo, CursoPlanEquivalencia, CursoPlanListar, CursoPlanPreRequisito, EquivalenciaValidar } from "../models/curso-plan.model";

@Injectable({
    providedIn: 'root'
})

export class CursoPlanSignal {

    cursoPlanEquivalenciaDefault: CursoPlanBase = {
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
        cicloNumero: 0,
        cicloLetra: '',
        equivalencias: [],
        color: '',
        estado: '',

        competencia: '',
        descripcion: '',
        preRequisitos: []
    }

    cursoPlanPreRequisitoDefault: CursoPlanBase[] = [];

    cursoPlanDefault: CursoPlanListar[] = [];
    preRequisitoCursoPlanDefault: CursoPlanBase[] = [];

    cursoPlanByClicloDefault: CursoPlanByCiclo[] = [];

    cursosPlanByCiclo = signal( this.cursoPlanByClicloDefault );
    cursosPlanPreRequisitoByCiclo = signal( this.cursoPlanByClicloDefault );


    cursosPlan = signal( this.cursoPlanDefault );
    cursosPlanPreRequisito = signal( this.preRequisitoCursoPlanDefault )
    

    
    cursoPlanEquivalenciaSelected = signal<CursoPlanEquivalencia>(this.cursoPlanEquivalenciaDefault);
    cursoPlanEquivalenciaUltimo = signal<CursoPlanEquivalencia>(this.cursoPlanEquivalenciaDefault);
    
    
    
    cursoPlanEquivalenciaValidarDefault: EquivalenciaValidar = {
        pendientes: 0,
        totalPendientes: 0,
        equivalenciaTerminada: false,
        cursosActualPendientes: [],
        cursosUltimoPendientes: []
    }
    
    cursoPlanEquivalenciaValidarAutomatico = signal<EquivalenciaValidar>( this.cursoPlanEquivalenciaValidarDefault);
    cursoPlanEquivalenciaValidarManual = signal<EquivalenciaValidar>( this.cursoPlanEquivalenciaValidarDefault);
    
    // cursosPlanPreRequisito = signal( this.cursoPlanPreRequisitoDefault );
}