export interface ListarDocentesDTO {
    codigoDocente: number,
    nombreyApellido:string,
    fechaDeNacimiento :string,
    tipoDocumento: string,
    nDocumento: string,
    cPersonal: string,
    cInstitucional: string,
    celular: string,
    sexo: string,
    codigoSemestre: number,
    semestre: string,
    codigoLocal: number,
    local: string,
    codigoInterno: string,
    grado1: string,
    grado2: string,
    discapacidad: boolean,
}

export interface DocenteArrayDTO{
    data: ListarDocentesDTO[]
}

export type AgregarDocenteDTO = Pick<ListarDocentesDTO, 'codigoSemestre' | 'codigoLocal' | 'codigoInterno' | 'grado1' | 'grado2' | 'discapacidad'> & {
    codigoUsuarioRol: number,
    usuario: number
}

export type EditarDocenteDTO = Pick<ListarDocentesDTO, 'codigoDocente' | 'codigoInterno' | 'grado1' | 'grado2'| 'discapacidad' > & {
    usuario: number;
};

export type EliminarDocenteDTO = Pick<EditarDocenteDTO, 'codigoDocente' | 'usuario'>

export interface CursosDominioDocenteAray {
    data: ListarCursosDominioDocenteDTO[]
}
export interface ListarCursosDominioDocenteDTO{
    codigoCursoDominio: number,
    codigoDocente: number,
    apelidosyNombresDocente: string,
    codigoAperturaCurso: number,
    nombreCurso: string
} 

export type InsertarCursoDominioDocenteDTO = Pick<ListarCursosDominioDocenteDTO, 'codigoDocente'| 'codigoAperturaCurso'> & {
    usuario: number
}

export type EliminarCursoDominioDocenteDTO = Pick<ListarCursosDominioDocenteDTO, 'codigoCursoDominio'> & {
    usuario: number
}

/* DISPONIBILIDAD HORARIA */
export interface DisponibilidadDocenteArray {
    data: ListarDisponibilidadDocenteDTO[]
}
export interface ListarDisponibilidadDocenteDTO{
    codigoDia: number,
    dia: string,
    codigoTiempo: number,
    tiempoInicio: string,
    tiempoFin: string,
    codigoProgramaAcademico: number,
    codigoLocal: number
}

export type AgregarDisponibilidadDocenteDTO = Pick<ListarDisponibilidadDocenteDTO , 'codigoDia' | 'codigoTiempo' | 'codigoProgramaAcademico' | 'codigoLocal'> & {
    codigoDocente: number,
    usuario: number
}
export type EliminarDisponibilidadDocenteDTO = Omit<AgregarDisponibilidadDocenteDTO, 'codigoProgramaAcademico'| 'codigoLocal'>

export interface DocenteNoAsignadoArray{
    data: ListarDocenteNoAsignadoDTO[]
}
export interface ListarDocenteNoAsignadoDTO{
    codigoUsuarioRol: number,
    nombreyApellido: string,
    nDocumento: string
}

