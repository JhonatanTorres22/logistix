export class MallaPorCicloPlanEstudio {
    constructor(
       public idPlanDeEstudio:number,
       public resolucionPlanDeEstudio:string,
       public fechaInicio: string,
       public fechaFin : string,
       public cursos: MallaPorCiclo[]
        
    ){}
}

export interface MallaPorCiclo {
    idMalla:number,
    codigoInterno: string
    nombreCurso: string,
}