export class ListarCursosAperturados{
    constructor(
        public idAperturaCurso:number,
        public codigoInternoCurso:string,
        public nombreCurso: string,
        public tipoDeCurso: string,
        public tipoDeEstudio: string,
        public competencia: string,
        public ht: number,
        public hp: number,
        public tHoras: number,
        public tCreditos: number,
        public idCiclo: number,
        public definicionCiclo: string,
        public denominacionResumen: string,
        public nSecciones: number,
        public idPlanDeEstudio: number,
        public resolucion: string
    ){}
}

export interface AgregarCursoApertura{
    idMalla: number,
    idLocal: number,
    idSemestre: number,
    idUsuario: number
}

export interface EliminarCursoAperturado {
    idAperturaCurso: number,
    idUsuario: number
}

export interface ListaGrupoCursos {
    denominacionResumen: string;
    cursos: ListarCursosAperturados[];
  }