import { TipoMensaje } from "../../domain/models/mensajeria.model";

export interface MensajeriaInsertarDTO {
    codigoTipoMensaje: number,
    asunto: string,
    codigoEmisorRol: number,
    codigoReceptorRol: number,
    textoMensaje: string,
    leido: boolean,
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
}



export type MensajeriaEnviadosDTO = MensajeriaRecibidosDTO;
export type MensajeriaArchivadosDTO = MensajeriaRecibidosDTO;

export interface MensajeriaRecibidosDataArrayDTO {
    data: MensajeriaRecibidosDTO[];
}

export interface MensajeriaEnviadosDataArrayDTO {
    data: MensajeriaEnviadosDTO[];
}