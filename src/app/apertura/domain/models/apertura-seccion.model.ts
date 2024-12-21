
export class ListarSecciones{
    constructor(
       public idAperturaSeccion: number,
       public nombreSeccion: string,
       public discapacidad: boolean,
       public nVacantes: number,
       public detalleObservacion: string,

       public idAmbienteTipoTeoria : null | number,
       public nombreAmbienteTeoria: string,
       public idFormatoTeoria: null | number,
       public descripcionFormatoTeoria: string,
       public idAmbienteTipoPractica: null | number,
       public nombreAmbientePractica: string,
       public idFormatoPractica : null | number,
       public nombreFormatoPractica: string,
       public numeroGrupos: number,
    //    public ambiente: ListarTipoAmbienteSeccion[]
    ){}
    
}
export interface ListarTipoAmbienteSeccion{
    idTipoAmbiente: number,
    nombreTipoAmbiente: string,
    nombreFormato: string,
    cantidadGrupos: number
}
export interface AgregarSeccion {
    idAperturaCurso: number,
    nombreSeccion: string,
    discapacidad:boolean,
    cantidadVacantes: number,
    detalleObservacion: string,
    idTipoAmbienteTeoria: number,
    idTipoAmbientePractica: number
    cantidadGrupos: number,
    idUsuario: number
}

export type EditarSeccion = Omit <AgregarSeccion, 'idAperturaCurso'> & {
    idAperturaSeccion: number
}
export interface ListarFormato {
    idFormato:number,
    nombreFormato:string,
    descripcionFormato: string,
    
}

export interface ListarTipoAmbiente {
    idTipoAmbiente: number,
    nombreTipoAmbiente: string,
    descripcionTipoAmbiente: string,
    grupo: boolean,
    teoria: boolean,
    practica: boolean
}

export interface EliminarSeccion {
    idAperturaSeccion : number,
    idUsuario: number
}

export interface EliminarTipoAmbiente {
    idAperturaSeccion: number,
    idTipoAmbiente: number
}

export interface AgregarTipoAmbienteASeccion {
    idAperturaSeccion: number,
    idTipoAmbiente: number,
    cantidadGrupos: number
}