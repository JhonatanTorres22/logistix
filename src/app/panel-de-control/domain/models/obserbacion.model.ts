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

export type ObservacionPendiente = Observacion & {
    rol: string,
    usuario: string,
    estado: string,
}

export type ObservacionResolver = Pick<Observacion, 'id' > & {
    mensajeRespuesta: string,
    userId: number
}

export type ObservacionConfirmar = ObservacionResolver & {
    puntuacion: number
}

export type Ticket = Pick<ObservacionModel, 'id' | 'mensajeId' | 'ticket' | 'fechaObservacion'> & {
    usuario: string,
    rol: string,
    estado: string
}