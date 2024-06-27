export interface MensajeriaInsertarDTO {
    codigoTipoMensaje: number,
    asunto: string,
    codigoEmisorRol: number,
    codigoReceptorRol: number,
    textoMensaje: string,
    leido: boolean,
    usuario: number
}