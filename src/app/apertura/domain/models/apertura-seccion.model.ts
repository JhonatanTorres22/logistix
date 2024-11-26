export class ListarSecciones{
    constructor(
       public idAperturaSeccion: number,
       public nombreSeccion: string,
       public discapacidad: boolean,
       public nVacantes: number,
       public detalleObservacion: string,
       public ambiente: ListarTipoAmbienteSeccion[]
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
    nVacantes: number,
    detalleObservacion: string,
    idTipoAmbiente: number,
    nGrupos: number

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
    grupo: boolean 
}

export interface EditarSeccion {
    idAperturaSeccion: number,
    discapacidad: boolean,
    nVacantes: number,
    detalleObservacion: string,
    idUsuario: number
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