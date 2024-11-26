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
    codigoLocal: 7,
    local: string,
    codigoInterno: string,
    grado1: string,
    grado2: string,
    discapacidad: boolean,
}

export interface DocenteArrayDTO{
    data: ListarDocentesDTO[]
}