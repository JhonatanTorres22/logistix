export interface MallaPorCicloDataArrayDTO {
    data: MallaPorCicloPlanEstudioDTO[]
}

export interface MallaPorCicloPlanEstudioDTO{
    codigoPlanDeEstudio:number,
    resolucion: string,
    inicioVigencia: string,
    finVigencia: string,
    malla:MallaPorCicloDTO[]

}
export interface MallaPorCicloDTO {
    codigoMalla:number,
    codigoInterno: string
    nombre: string,
}