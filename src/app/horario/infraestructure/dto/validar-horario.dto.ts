export interface ValidarHorarioDTO{
    codigoAperturaCurso: number,
    programaAcademico: string,
    nombreCurso: string,
    seccion: string,
    posibleDocente: string
}

export interface ValidacionHorarioArrayDTO{
    data: ValidarHorarioDTO[]
}