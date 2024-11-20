export interface AperturaSeccionArrayDTO{
    data: ListarSeccionesDTO[]
}

export interface ListarSeccionesDTO{
    codigoAperturaSeccion: number,
    seccion: string,
    discapacidad: boolean,
    vacantes: number,
    observacion: string,
    ambiente: ListarAmbienteSeccionDTO[]
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
    codigoAmbienteTipo: number,
    nGrupos: number
}

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
    grupo:boolean 
}

export interface EditarSeccionDTO {
    codigoAperturaSeccion: number,
    discapacidad: boolean,
    vacantes: number,
    observacion: string,
    usuario: number
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