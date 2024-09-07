export interface Observacion {
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

export type ObservacionInsert = Pick<Observacion, 'mensajeId' | 'subCategoriaId' | 'mensaje' | 'userId'>;

export type ObservacionListar = Omit<Observacion, 'subCategoriaId' | 'userId'>