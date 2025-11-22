export interface CriterioDto {
    codigoCriterio: number,
    nombreCriterio: string,
    detalleVerificar: number,
    obligatorio: boolean,
}

export interface DataCriterioDto {
    data: CriterioDto[]
    isSuccess: boolean
    message: string
    errors: string | null
}

export interface EvaluacionDto {
    codigoProveedor: number,
    nombreLegal: string,
    tipo: string,
    direccion: string,
    evaluaciones: EvaluacionProveedorDTO[],
}

export interface EvaluacionProveedorDTO {
    codigoEvaluacion: number,
    codigoCriterio: number,
    nombreCriterio: string,
    detalleCriterio: string,
    obligatorioCriterio: boolean,
    cumple: boolean,
    observacion: string,
    documento: string
}

export interface DataEvaluacionDto {
    data: EvaluacionDto[]
    isSuccess: boolean
    message: string
    errors: string | null
}