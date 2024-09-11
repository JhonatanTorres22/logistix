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


export type ObservacionDTO = Omit<ObservacionModelDTO, 'codigoObservacionSubCategoria' | 'usuarioObservacion'> & {
    nombreRol: string,
    nombreUsuario: string,
    estado: string,
}
export type ObservacionPendienteDTO = ObservacionDTO & {
    nombreRol: string,
    nombreUsuario: string,
}


export interface ObservacionListarDataArrayDTO {
    data: ObservacionDTO[]
}

export interface ObservacionListarPendientesDataArrayDTO {
    data: ObservacionPendienteDTO[]
}