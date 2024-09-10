export interface ObservacionModel {
    id: number,
    mensajeId: number,
    ticket: string,
    categoriaNombre: string,
    subCategoriaNombre: string,
    subCategoriaId: number,
    mensaje: string,
    fechaObservacion: string,
    userId: number 

    
}

export type ObservacionInsert = Pick<ObservacionModel, 'mensajeId' | 'subCategoriaId' | 'mensaje' | 'userId'>;

export type Observacion = Omit<ObservacionModel, 'subCategoriaId' | 'userId'>

export type Ticket = Pick<ObservacionModel, 'id' | 'mensajeId' | 'ticket' | 'fechaObservacion'> & {
    usuario: string,
    rol: string,
    estado: string
}