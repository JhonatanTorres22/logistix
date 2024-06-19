export class Programa {
    constructor(
        public id: number,
        public idFacultad: number,
        public nombre: string,
        public definicion: string,
        public usuarioId: number 
    ) {

    }
}

export type ProgramaCrear = Omit<Programa, 'id'>

export type ProgramaEliminar = Pick<Programa, 'id' | 'usuarioId'>

export type ProgramaFacultad = Omit<Programa, 'idFacultad'>

export type ProgramaEditar = Omit<Programa, 'idFacultad'>