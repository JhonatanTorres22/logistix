export class Facultad {
    constructor(
        public id: number,
        public definicion: string,
        public nombre: string,
        public usuarioId: number
    ) {}
}

export type FacultadCrear = Omit<Facultad, 'id'>
// export type FacultadEditar = Omit<Facultad, 'id'>

// export class FacultadAsignadaAlSemestre extends Facultad {
//     constructor(
//         public idSemestre: number,
//         override id: number,
//         override codigo: string,
//         override nombre: string,
//     ) {
//         super( id, codigo, nombre,  )
//     }
// }


export type FacultadEliminar = Pick< Facultad, 'id' | 'usuarioId'>