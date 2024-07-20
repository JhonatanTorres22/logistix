import { Injectable, signal, WritableSignal } from "@angular/core";
import { PlanEstudio } from "../models/plan-estudio.model";


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
        nombre: '',
        resolucion: ''
     }

    planesDeEstudio: WritableSignal<PlanEstudio[]> = signal([]);

    planEstudioEdit: WritableSignal<PlanEstudio> = signal( this.planEstudioDefault );
    planEstudioSelect: WritableSignal<PlanEstudio> = signal( this.planEstudioDefault );

    planEstudio: WritableSignal<PlanEstudio> = signal( this.planEstudioDefault );

    isModal = signal( false );
}

