import { Injectable, signal, WritableSignal } from "@angular/core";
import { PlanEstudio, PlanEstudioEditCU } from "../models/plan-estudio.model";


@Injectable({
    providedIn: 'root'
})

export class PlanEstudioSignal {


    planEstudioDefault: PlanEstudio = {
        id: 0,
        archivo: '',
        descripcionGrado: '',
        descripcionTitulo: '',
        detallePerfil: '',
        estadoCaducidad: '',
        estadoMatricula: '',
        idProgramaAcademico: 0,
        finVigencia: '',
        inicioVigencia: '',
        nombre: '',
        resolucion: ''
     }

     planEstudioPorAprobarDefault: PlanEstudioEditCU = {

    
        descripcionGrado: '',
        descripcionTitulo: '',
        detallePerfil: '',
  

        nombre: '',
        resolucion: '',
        finVigencia: '',
        id: 0,
        inicioVigencia: '',
        archivo:  '',
        usuarioId: 0
     }

    planesDeEstudio: WritableSignal<PlanEstudio[]> = signal([]);

    planEstudioEdit: WritableSignal<PlanEstudio> = signal( this.planEstudioDefault );
    planEstudioSinResolucion: WritableSignal<PlanEstudio> = signal( this.planEstudioDefault );
    planEstudioPorAprobar: WritableSignal<PlanEstudioEditCU> = signal( this.planEstudioPorAprobarDefault );
    planEstudioSelect: WritableSignal<PlanEstudio> = signal( this.planEstudioDefault );

    planEstudio: WritableSignal<PlanEstudio> = signal( this.planEstudioDefault );

    programaId = signal(0);

    isModal = signal( false );

    openMallaCursos = signal ( false );

    renderizarPor = signal( '' );
}

