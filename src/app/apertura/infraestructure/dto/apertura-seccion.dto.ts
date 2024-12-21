export interface AperturaSeccionArrayDTO{
    data: ListarSeccionesDTO[]
}

export interface ListarSeccionesDTO{
    codigoAperturaSeccion: number,
    seccion: string,
    discapacidad: boolean,
    vacantes: number,
    observacion: string,
    codigoAmbienteTipoTeoria: number,
    nombreAmbienteTipoTeoria: string,
    codigoFormatoTeoria: number,
    nombreFormatoTeoria: string,
    codigoAmbienteTipoPractica: number,
    nombreAmbienteTipoPractica: string,
     codigoFormatoPractica: number,
    nombreFormatoPractica: string,
    nGrupos: number
    // ambiente: ListarAmbienteSeccionDTO[]
}

export interface ListarAmbienteSeccionDTO{
    codigoAmbienteTipo: 1,
    nombreAmbienteTipo: string,
    nombreFormato: string,
    nGrupos: number
}

export interface AgregarSeccionDTO{
    codigoAperturaCurso: number,
    seccion: string,
    discapacidad: boolean,
    vacantes: number,
    observacion: string,
    codigoAmbienteTipoTeoria: number,
    codigoAmbienteTipoPractica: number,
    nGrupos: number,
    usuario: number
}

export type EditarSeccionDTO = Omit<AgregarSeccionDTO, 'codigoAperturaCurso'> & {
    codigoAperturaSeccion: number;
};

export interface ListarFormatoArrayDTO{
    data: ListarFormatoDTO[]
}
export interface ListarFormatoDTO {
    codigoFormato:number,
    nombre:string,
    descripcion: string
}


export interface ListarTipoAmbienteArrayDTO {
    data: ListarTipoAmbienteDTO[]
}
export interface ListarTipoAmbienteDTO {
    codigoAmbienteTipo: number,
    nombre: string,
    descripcion: string,
    grupo:boolean,
    seDictaTeoria:boolean,
    seDictaPractica: boolean
}



export interface EliminarSeccionDTO {
    codigoAperturaSeccion :number,
    usuario: number
}

export interface EliminarTipoAmbienteDTO{
    codigoAperturaSeccion: number,
    codigoAmbienteTipo: number
}
export type AgregarTipoAmbienteASeccionDTO = EliminarTipoAmbienteDTO & {
    nGrupos: number
}