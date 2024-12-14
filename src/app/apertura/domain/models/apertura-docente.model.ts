import { TipoDocumento } from "src/app/usuarios/domain/models/usuario.model";

export class ListarDocentes{
    constructor(
        public idDocente: number,
        public nombreApellido: string,
        public fechaNacimiento: string,
        public tipoDeDocumento: string,
        public numeroDocumento : string,
        public correoPersona: string,
        public correoInstitucional: string,
        public numeroCelular: string,
        public sexo: string,
        public idSemestre: number,
        public nombreSemestre: string,
        public idLocal: number,
        public nombreLocal: string,
        public codigoInterno: string,
        public primerGrado:string,
        public segundoGrado: string,
        public discapacidad: boolean,
    ){}
}

export type AgregarDocente = Pick<ListarDocentes, 'idSemestre' | 'idLocal' | 'codigoInterno' | 'primerGrado' |'segundoGrado' | 'discapacidad'> & {
    idUsuarioRol: number,
    idUsuario: number
}
export type EditarDocente = Pick<ListarDocentes, 'idDocente' | 'codigoInterno' | 'primerGrado' | 'segundoGrado'| 'discapacidad' > & {
    idUsuario: number;
};

export type EliminarDocente = Pick<EditarDocente, 'idDocente' | 'idUsuario'>

export interface DocenteExcel{
    nombres: string,
    apellido_paterno: string,
    apellido_materno: string,
    documento: TipoDocumento,
    n_documento: string,
    sexo: string,
    fecha_nacimiento: string,
    correo_personal:string,
    correo_institucional: string,
    celular: number,
}

export interface ListarCursosDominioDocente {
    idCursoDominio: number,
    idDocente: number,
    idAperturaCurso: number,
    ApNomDocente: string
    nombreCurso:string
} 

export type InsertarCursoDominioDocente = Pick<ListarCursosDominioDocente, 'idDocente'| 'idAperturaCurso'> & {
    idUsuario: number
}

export type EliminarCursoDominioDocente = Pick<ListarCursosDominioDocente, 'idCursoDominio'> & {
    idUsuario: number
}

export interface ListarDisponibilidadDocente {
    idDia: number,
    nombreDia: string,
    idHora: number,
    horaInicio: string,
    horaFin: string,
    idProgramaAcademico: number,
    idLocal: number
}
export type AgregarDisponibilidadDocente = Pick<ListarDisponibilidadDocente , 'idDia' | 'idHora' | 'idProgramaAcademico' |'idLocal'> & {
    idDocente: number,
    idUsuario: number,
}
export type EliminarDisponibilidadDocente = Omit<AgregarDisponibilidadDocente, 'idProgramaAcademico' |'idLocal'>;
export interface CeldaSeleccionada {
    diaId: number,
    horaId: number
}

export interface ListarDocenteNoAsignado{
    idUsuarioRol: number,
    nombreAp: string,
    numeroDocumento: string
}

export interface ListarLocalFiltrado {
    id:number,
    nombre: string
}