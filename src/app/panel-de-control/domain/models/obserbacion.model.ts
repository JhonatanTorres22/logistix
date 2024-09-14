export interface ObservacionModel {
    id: number,
    mensajeId: number,
    ticket: string,
    categoriaNombre: string,
    subCategoriaNombre: string,
    subCategoriaId: number,
    mensaje: string,
    fechaObservacion: string,
    userId: number,
    mensajeResuelto: string,
    fechaResuelto: string,

    
}

export type ObservacionInsert = Pick<ObservacionModel, 'mensajeId' | 'subCategoriaId' | 'mensaje' | 'userId'>;

export type Observacion = Omit<ObservacionModel, 'subCategoriaId' | 'userId'> & {
    rol: string,
    usuario: string,
    estado: string,
}

export interface ObservacionBase {
    id: number,
    mensajeId: number,
    ticket: string,
    categoriaNombre: string,
    subCategoriaNombre: string,
    historial: HistorialMensaje[],
    mensaje: string,
    rol: string,
    usuario: string,
    estado: string,
    mensajeResuelto: string,
    fechaResuelto: string,
    fechaObservacion: string,
    fechaConforme: string,
}

export interface ObservacionPendiente extends ObservacionBase {}

export interface ObservacionConforme extends ObservacionBase  {}

export type ObservacionResolver = Pick<Observacion, 'id' > & {
    mensajeRespuesta: string,
    historial: HistorialMensaje[],
    userId: number
}

export type ObservacionConfirmar = Omit<ObservacionResolver, 'historial'> & {
    puntuacion: number
}

export type Ticket = Pick<ObservacionModel, 'id' | 'mensajeId' | 'ticket' | 'fechaObservacion'> & {
    usuario: string,
    rol: string,
    estado: string
}


// export interface ObservacionMensajeHistorial {
//     historial: HistorialMensaje[],
//     mensaje: string
// }

export interface HistorialMensaje {
    mensaje: string,
    fecha: string,
}