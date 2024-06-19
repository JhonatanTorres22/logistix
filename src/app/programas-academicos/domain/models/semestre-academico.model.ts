export class SemestreAcademico {
    constructor(
        public id: number,
        public codigo: string,
        public nombre: string,
        // public fechaInicio: string,
        // public fechaFin: string,
        // public estado: string,
        public condicion: string,
        public usuarioId: number,
    ) {}
}

export type SemestreAcademicoCrear = Omit<SemestreAcademico, 'id' | 'condicion'>

export type SemestreAcademicoEliminar = Pick<SemestreAcademico, 'id' | 'usuarioId'>

export type SemestreAcademicoAperturar = Pick<SemestreAcademico, 'id' | 'usuarioId'>

export type SemestreAcademicoCerrar = Pick<SemestreAcademico, 'id' | 'usuarioId'>
