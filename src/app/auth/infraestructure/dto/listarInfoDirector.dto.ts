export interface ListarInfoDirectorDTO{
    CodigoSemestre: number,
    DescripcionSemestre: string,
    CodigoLocal: number,
    DescripcionLocal: string,
    CodigoProgramaAcademico: number,
    NombreProgramaAcademico: string,
}

export interface ListarInfoDirectorArrayDTO {
    data: ListarInfoDirectorDTO[]
}