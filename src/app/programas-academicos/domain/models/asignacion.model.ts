export class Asignacion {
    constructor(
        public idFacultad: number,
        public nombreFacultad: string,
        public idDecano: number,
        public nombreDecano: string,
        public programas: AsignacionPrograma[]
    ) {}
}


export interface AsignacionPrograma {
    idPrograma: number,
    nombrePrograma: string,
    idDirector: number,
    nombreDirector: string,
    locales: AsignacionLocal[] 
}

export interface AsignacionLocal {
    idLocal: number,
    nombreLocal: string
}

export interface AsignarNuevoPrograma {
    idDirector: number,
    idDecano: number,
    idPrograma: number,
    idSemestre: number,
    idLocales: number[],
    usuarioId: number
}


export interface AsignacionEliminar {
    idDirector: number,
    idDecano: number,
    idPrograma: number,
    idSemestre: number,
    idLocales: number[],
    usuarioId: number
}

export interface ListarLocalesAsignados {
    locales: AsignacionLocal[];
    programaConLocales:AsignacionLocal[]
}

export type AsignacionRenderizar = 'Obtener' | ''