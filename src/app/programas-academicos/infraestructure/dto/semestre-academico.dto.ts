

export interface SemestreAcademicoDTO {
    codigo: number,
    nombre: string,
    definicion: string,
    // fechaDeInicio: string,
    // fechaDeFin: string,
    // estado: string,
    condicion: string,
    usuario: number
}


export interface SemestreAcademicoDataArrayDTO {
    data: SemestreAcademicoDTO[]
}

export interface SemestreAcademicoDataDTO {
    data: SemestreAcademicoDTO
}

export type SemestreAcademicoCrearDTO  = Omit<SemestreAcademicoDTO, 'codigo' | 'condicion'>

export type SemestreAcademicoEliminarDTO = Pick<SemestreAcademicoDTO, 'codigo' | 'usuario'>

export type SemestreAcademicoAperturarDTO = Pick<SemestreAcademicoDTO, 'codigo' | 'usuario'>

export type SemestreAcademicoCerrarDTO = Pick<SemestreAcademicoDTO, 'codigo' | 'usuario'>

