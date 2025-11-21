export interface ProveedorDTO {
    codigoProveedor: number,
    tipoProveedor: string,
    nombreRs: string,
    ruc: string,
    direccionFiscal: string,
    evaluacion: boolean
}

export type ProveedorEditarDTO = Omit<ProveedorDTO, 'evaluacion'>
export type ProveedorCrearDTO = Omit<ProveedorEditarDTO, 'codigoProveedor'>
export type ProveedorEliminarDTO = Pick<ProveedorDTO, 'codigoProveedor' >

export interface ProveedorDataArrayDTO {
    data: ProveedorDTO[]
}