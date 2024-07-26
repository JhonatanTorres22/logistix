export interface ListarInfoDirectorDTO{
    CodigoSemestre: number,
    DescripcionSemestre: string,
    codigoLocal: number,
    DescripcionLocal: string,
    CodigoProgramaAcademico: number,
    NombreProgramaAcademico: string,
}

export interface ListarInfoDirectorArrayDTO {
    data: ListarInfoDirectorDTO[]
}