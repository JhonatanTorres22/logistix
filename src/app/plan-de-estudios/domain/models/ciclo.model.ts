export class Ciclo {
    constructor(
        public id: number,
        public cicloNumero: string,
        public cicloLetra: string,
        public definicion: string,
        public usuarioId: number
       
    ) {

    }
}

export type CicloCrear = Omit<Ciclo, 'id'>
export type CicloEliminar = Pick<Ciclo, 'id' | 'usuarioId' >