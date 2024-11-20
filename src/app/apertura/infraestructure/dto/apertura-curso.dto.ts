import { ListarCursosAperturados } from "../../domain/models/apertura-curso.model";

export interface AperturaCursosArrayDTO{
    data: ListarCursosAperturadosDTO[]
}
export interface ListarCursosAperturadosDTO{
    codigoAperturaCurso:number,
    codigoInterno: string,
    nombre: string,
    tipoDeCurso: string,
    tipoDeEstudio: string,
    competencia: string,
    ht: number,
    hp: number,
    tHoras: number,
    tCreditos: number,
    codigoCiclo: number,
    definicion: string,
    denominacionResumen: string,
    cantidadSecciones: number,
    codigoPlanDeEstudio: number,
    resolucionPlanDeEstudio:string

}

export interface AgregarCursoAperturaDTO{
    codigoMalla: number,
    codigoLocal: number,
    codigoSemestre:number,
    usuario: number
}

export interface EliminarCursoAperturadoDTO{
    codigoAperturaCurso:number,
    usuario: number,
}

