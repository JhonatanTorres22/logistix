export interface ObservacionDTO {
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


export type ObservacionInsertDTO = Pick<ObservacionDTO, 'codigoMensajeria' | 'codigoObservacionSubCategoria' | 'detalleObservacion' | 'usuarioObservacion' >;


export type ObservacionListarDTO = Omit<ObservacionDTO, 'codigoObservacionSubCategoria' | 'usuarioObservacion'>


export interface ObservacionListarDataArrayDTO {
    data: ObservacionListarDTO[]
}