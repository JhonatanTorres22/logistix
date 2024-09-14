export interface ObservacionModelDTO {
    codigoObservacion: number,
    codigoMensajeria: number,
    denominacionCategoria: string,
    denominacionSubCategoria: string,
    numeroTicket: string,
    fechaObservacion: string,
    codigoObservacionSubCategoria: number,
    detalleObservacion: string,
    usuarioObservacion: number,
    detalleResuelto: string,
    fechaResuelto: string,
    fechaConforme: string,
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

export type ObservacionConformeDTO = ObservacionPendienteDTO & {
    fechaConforme: string,

}

export interface ObservacionListarDataArrayDTO {
    data: ObservacionDTO[]
}

export type ObservacionResolverDTO = Pick<ObservacionDTO, 'codigoObservacion' > & {
    descripcion: string,
    usuario: number
}

export type ObservacionConfirmarDTO = ObservacionResolverDTO & {
    puntuacion: number
}

export interface ObservacionListarPendientesDataArrayDTO {
    data: ObservacionPendienteDTO[]
}

export interface ObservacionListarConformesDataArrayDTO {
    data: ObservacionConformeDTO[]
}