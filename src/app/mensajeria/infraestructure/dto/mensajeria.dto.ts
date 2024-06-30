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
    codigoTipoMensajeria: number,
    tipoMensaje: TipoMensaje,
    asunto: string,
    contenido: string,
    rol: string,
    emisor: string,
    receptor: string,
    fechaCreacion: string,
    leido: boolean
}



export type MensajeriaEnviadosDTO = Omit<MensajeriaRecibidosDTO, 'leido'>;
export type MensajeriaArchivadosDTO = Omit<MensajeriaRecibidosDTO, 'rol'> & {
    rolEmisor: string,
    rolReceptor: string,
    archivo: string,

};

export type MensajeriaHistorialMensajesDTO = MensajeriaRecibidosDTO & {
    archivo: string,
    rolReceptor: string,
    rolEmisor: string,
    informacionAdicional: string,
    codigoEmisorRol: number,
    codigoReceptorRol: number
}

export interface MensajeriaResponderDTO {
    codigoMensajeria: number,
    codigoEmisorRol: number,
    codigoReceptorRol: number,
    contenido: string,
    informacionAdicional: string
}

export type MensajeriaCerrarArchivarDTO = Pick< MensajeriaDTO, 'codigoMensajeria'>

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