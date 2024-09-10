export interface ObservacionModelDTO {
    codigoObservacion: number,
    codigoMensajeria: number,
    denominacionCategoria: string,
    denominacionSubCategoria: string,
    numeroTicket: string,
    fechaObservacion: string,
    codigoObservacionSubCategoria: number,
    detalleObservacion: string,
    usuarioObservacion: number
}


export type ObservacionInsertDTO = Pick<ObservacionModelDTO, 'codigoMensajeria' | 'codigoObservacionSubCategoria' | 'detalleObservacion' | 'usuarioObservacion' >;


export type ObservacionDTO = Omit<ObservacionModelDTO, 'codigoObservacionSubCategoria' | 'usuarioObservacion'>


export interface ObservacionListarDataArrayDTO {
    data: ObservacionDTO[]
}