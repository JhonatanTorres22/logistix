export class Local {
    constructor(
        public id: number,
        public nombre: string,
        public definicion: string,
        public latitud: number,
        public longitud: number,
        public usuarioId: number
    ) {}
}

export type LocalCrear = Omit<Local, 'id'>

export type LocalEliminar = Pick< Local, 'id' | 'usuarioId'>