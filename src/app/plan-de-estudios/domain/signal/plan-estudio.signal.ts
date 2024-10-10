import { Injectable, signal, WritableSignal } from "@angular/core";
import { PlanEstudio, PlanEstudioEditCU } from "../models/plan-estudio.model";
import { UiSelect } from "src/app/core/components/ui-select/ui-select.interface";
import { CursoMallaEquivalenciaSimulacion } from "../models/equivalencia.model";


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
    planEstudioStepper: WritableSignal<PlanEstudio> = signal( this.planEstudioDefault );
    planEstudioUltimoConResolucion: WritableSignal<PlanEstudio> = signal( this.planEstudioDefault );
    planEstudio: WritableSignal<PlanEstudio> = signal( this.planEstudioDefault );

    programaId = signal(0);

    isModal = signal( false );
    isModalOfItself = signal( false );

    openMallaCursos = signal ( false );

    renderizarPor = signal( '' );

    planEstudioOrigenOptionsSelect: WritableSignal<UiSelect[]> = signal( [] );
    planEstudioDestinoOptionsSelect: WritableSignal<UiSelect[]> = signal( [] );
    planEstudioOrigenSelect: WritableSignal<UiSelect> = signal( { value: '', text: '', disabled: false } );
    planEstudioDestinoSelect: WritableSignal<UiSelect> = signal( { value: '', text: '', disabled: false } );
    
    convalidacionDefault: CursoMallaEquivalenciaSimulacion[] = [];
    convalidacion = signal( this.convalidacionDefault );
    modoResumen = signal( false );
}

