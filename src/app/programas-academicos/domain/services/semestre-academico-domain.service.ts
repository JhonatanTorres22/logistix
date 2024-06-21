import { Injectable, signal } from "@angular/core";
import { SemestreAcademico } from "../models/semestre-academico.model";



@Injectable({
    providedIn: 'root'
})

export class SemestreAcademicoDomainService {

    semestres: SemestreAcademico[] = [];
    semestre: SemestreAcademico = {
        codigo: '',
        // estado: '',
        // fechaFin: '',
        // fechaInicio: '',
        id: 0,
        nombre: '',
        condicion: '',
        usuarioId: 0
    };
    public semestresAcademicos = signal(this.semestres);
    public semestreAcademicoAperturado = signal( this.semestre);
    public semestreAcademicoEditado = signal (this.semestre)
    constructor() {}

    /* SIGNAL */
    public setSemestresAcademicos = ( senestres: SemestreAcademico[]) => {
        this.semestresAcademicos.set( senestres );        
    }

    public setSemestreAcademicoDefault = () => {
        this.semestresAcademicos.set( this.semestres )
    }

    public setSemestreAcademicoAperturado = ( semestreAcademico: SemestreAcademico ) => {
        this.semestreAcademicoAperturado.set( semestreAcademico );
    }

    public setSemestreAcademicoAperturadoDefault = () => {
        this.semestreAcademicoAperturado.set( this.semestre );
    } 

    public setSemestreEditado = (semestreEditado:SemestreAcademico) => {
        this.semestreAcademicoEditado.set(semestreEditado);
    }
    
    public setSemestreEditadoDefault = () => {
        this.semestreAcademicoEditado.set(this.semestre)
    }

}