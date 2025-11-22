export class Criterio {
    constructor(
        public codigo: number,
        public nombre: string,
        public detalleVerificar: number,
        public obligatorio: boolean,
    ) {}
}

export class Evaluacion {
    constructor(
        public codigo: number,
        public nombre: string,
        public tipo : string,
        public direccion : string,
        public evaluaciones: EvaluacionProveedor[],
    ) {}   
}

export interface EvaluacionProveedor {
    codigoEva: number,
    codigoCrit: number,
    nombre : string,
    detalle : string,
    obligatorio : boolean,
    cumple : boolean,
    observacion : string,
    documento : string
}

export interface EvaluacionCrear {
    codigoProv : number,
    codigoCrit : number,
    cumple : boolean,
    observacion : string,
    documento : string
}