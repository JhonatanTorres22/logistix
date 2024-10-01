import { CursoPlanBase } from "./curso-plan.model";

export interface PreRequisitoInsert {

    idCursoPlan: number,
    idCursoPlanPreRequisito: number,
    userId: number,
    curso: CursoPlanBase

}

export type PreRequisitoDelete = Omit<PreRequisitoInsert, 'curso'>;



export interface CursoPreRequisitoSelected {
    idCursoPlan: number,
    // nombreCurso: string,
}