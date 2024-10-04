import { CursoPlanBase } from "./curso-plan.model";
import { Curso } from "./curso.model";
import { Malla } from "./malla.model";

export interface PreRequisitoInsert {

    idCursoPlan: number,
    idCursoPlanPreRequisito: number,
    userId: number,
    curso: CursoPlanBase

}

export type PreRequisitoDelete = Omit<PreRequisitoInsert, 'curso'>;



export interface CursoPreRequisitoSelected {
    idMalla: number,
    // nombreCurso: string,
}

export interface CursoMallaPreRequisitoInsert {

    idMalla: number,
    idMallaPreRequisito: number,
    userId: number,
    curso: Malla

}

export type CursoMallaPreRequisitoDelete = Omit<CursoMallaPreRequisitoInsert, 'curso'>;



export interface CursoMallaPreRequisitoSelected {
    idMalla: number,
    // nombreCurso: string,
}