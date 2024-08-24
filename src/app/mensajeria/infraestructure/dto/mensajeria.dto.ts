import { TipoMensaje } from "../../domain/models/mensajeria.model";

export interface MensajeriaDTO {
    codigoMensajeria: number
}

export interface MensajeriaInsertarDTO {
    codigoTipoMensaje: number,
    asunto: string,
    codigoEmisorRol: number,
    codigoReceptorRol: number,
    textoMensaje: string,
    leido: boolean,
    informacionAdicional: string,
    usuario: number
}

export interface MensajeriaRecibidosDTO {
    codigoMensajeria: number,
    nombreTipoMensajeGrupo: string,
    nombreTipoMensaje: string,
    // codigoTipoMensajeria: number,
    // tipoMensaje: TipoMensaje,
    asunto: string,
    contenido: string,
    rol: string,
    emisor: string,
    receptor: string,
    fechaCreacion: string,
    leido: boolean
}



export type MensajeriaEnviadosDTO = Omit<MensajeriaRecibidosDTO, 'leido'>;
export type MensajeriaArchivadosDTO = MensajeriaRecibidosDTO & {
    usuarioCierre: string,
    fechaCierre: string,
}

export type MensajeriaHistorialMensajesDTO = Omit<MensajeriaRecibidosDTO, 'nombreTipoMensajeGrupo' | 'nombreTipoMensaje' | 'rol' | 'leido'> & {
    archivo: string,
    rolReceptor: string,
    rolEmisor: string,
    informacionAdicional: string,
    // codigoEmisorRol: number,
    // codigoReceptorRol: number
}

export interface MensajeriaResponderDTO {
    codigoMensajeria: number,
    codigoEmisorRol: number,
    codigoReceptorRol: number,
    contenido: string,
    informacionAdicional: string
}

export type MensajeriaCerrarArchivarDTO = Pick< MensajeriaDTO, 'codigoMensajeria'> & {
    usuario: number
}

export interface MensajeriaLeerMensajeDTO {
    codigoMensajeria: number
}

export interface MensajeriaRecibidosDataArrayDTO {
    data: MensajeriaRecibidosDTO[];
}

export interface MensajeriaEnviadosDataArrayDTO {
    data: MensajeriaEnviadosDTO[];
}

export interface MensajeriaArchivadosDataArrayDTO {
    data: MensajeriaArchivadosDTO[];
}

export interface MensajeriaHistorialMensajesDataArrayDTO {
    data: MensajeriaHistorialMensajesDTO[];
}

export interface MensajeriaNuevoMensajeListDTO {
    codigoTipoMensajeRol: number,
    codigoUsuarioRol: number,
    flujoNavegacion: string,
    apellidosyNombres: string,
    descripcion: string,
    temporalidad: number,
    iniciaProceso: boolean,
    cierraProceso: boolean
}

export interface MensajeriaNuevoMensajeListDataArrayDTO {
    data: MensajeriaNuevoMensajeListDTO[]
}

export interface MensajeriaTipoGrupoDTO {
    codigoTipoMensajeGrupo: number,
    nombre: string
}

export interface MensajeriaTipoDTO {
    codigoTipoMensaje: number,
    nombre: string
}

export interface MensajeriaTipoGrupoDataArrayDTO {
    data: MensajeriaTipoGrupoDTO[]
}

export interface MensajeriaTipoDataArrayDTO {
    data: MensajeriaTipoDTO[]
}


export interface MensajeriaEnviarNuevoMensajeDTO {
    codigoTipoMensajeRol: number,
    flujoNavegacion: string,
    asunto: string,
    codigoEmisorRol: number,
    codigoReceptorRol: number,
    textoMensaje: string,
    informacionAdicional: string,
    usuario: number
}

export type MensajeriaResponderAListDTO = MensajeriaNuevoMensajeListDTO & {
    codigoMensajeria: number,
}

export interface MensajeriaResponderAListDataArrayDTO {
    data: MensajeriaResponderAListDTO[]
}


export type MensajeriaResponderAltaDTO = Pick<MensajeriaResponderAListDTO, 'codigoMensajeria' | 'codigoTipoMensajeRol'> & {
    codigoEmisorRol: number,
    codigoReceptorRol: number,
    contenido: string,
    informacionAdicional: string,
    Archivo: File
}


export type MensajeriaForzarCierreDTO = MensajeriaCerrarArchivarDTO
