export interface PreRequisitoInsertDTO {
    codigoCursoPlan: number,
    codigoCursoPlanPreRequisito: number,
    usuario: number
}


export type PreRequisitoDeleteDTO = PreRequisitoInsertDTO;

export interface CursoMallaPreRequisitoInsertDTO {
    codigoMalla: number,
    codigoMallaPreRequisito: number,
    usuario: number
}


export type CursoMallaPreRequisitoDeleteDTO = CursoMallaPreRequisitoInsertDTO;

