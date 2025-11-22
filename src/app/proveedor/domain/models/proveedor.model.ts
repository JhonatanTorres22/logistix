export interface DataProveedor {
    data: Proveedor[]
    isSuccess: boolean
    message: string
    errors: string | null
}

export class Proveedor {
    constructor(
        public codigo: number,
        public tipo: string,
        public nombreRs: string,
        public ruc: string,
        public direccionFiscal: string,
        public evaluacion: boolean
    ) {}
}
export type ProveedorEditar = Omit<Proveedor, 'evaluacion'>
export type ProveedorCrear = Omit<ProveedorEditar, 'codigo'>
export type ProveedorEliminar = Pick<Proveedor, 'codigo' >