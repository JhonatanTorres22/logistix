export class ListarAmbientes{
    constructor(
        public idAmbiente: number,
        public nombreAmbiente:string,
        public nombrePabellon: string,
        public nivelAmbiente: number,
        public aforo: number,
        public discapacidad: boolean,
        public local:string,
        public tipoDeAmbiente: string,
    ){}
}
export type InsertarAmbiente = Omit<ListarAmbientes, 'idAmbiente' | 'tipoDeAmbiente' | 'local'> & {
    idSemestre: number;
    idLocal: number;
    idTipoAmbiente: number;
    idUsuario: number;
};

export type EditarAmbiente = Omit<ListarAmbientes, 'local' | 'tipoDeAmbiente'> & {
    idUsuario: number
}
export interface EliminarAmbiente {
    idAmbiente: number,
    idUsuario: number
}


// export type AmbienteExcel = Omit<ListarAmbientes, 'idAperturaAmbiente'>;