export interface ListarAmbientesDTO{
    codigoAmbiente:number,
    nombre: string,
    pabellon: string,
    nivel: number,
    aforo: number,
    discapacidad: boolean,
    local: string,
    tipoAmbiente: string
}

export interface AmbienteArrayDTO{
    data: ListarAmbientesDTO[]
}

export type InsertarAmbienteDTO = Omit<ListarAmbientesDTO, 'codigoAmbiente' | 'tipoAmbiente' | 'local'> & {
    codigoSemestre: number,
    codigoLocal: number,
    codigoTipoAmbiente: number,
    usuario: number
};

export type EditarAmbienteDTO = Omit<ListarAmbientesDTO, 'local' | 'tipoAmbiente'> & {
    usuario:number
}


export interface EliminarAmbienteDTO {
    codigoAmbiente : number,
    usuario:number
}