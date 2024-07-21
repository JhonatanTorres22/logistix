import { Injectable, signal } from "@angular/core";
import { SemestreAcademico } from "../models/semestre-academico.model";


@Injectable({
    providedIn: 'root'
})

export class SemestreSignal {

    semestre: SemestreAcademico = {
        id: 0,
        codigo: '',
        condicion: '',
        nombre: '',
        usuarioId: 0
    }

    semestreSelect = signal( this.semestre);


    setSelectSemestre = ( semestre: SemestreAcademico) => {
        this.semestreSelect.set( semestre );
        
    }

    setSelectSemestreDefault(){
        this.semestreSelect.set(this.semestre)
    }

    

}