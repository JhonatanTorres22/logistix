import { TipoDocumento } from "../../domain/models/usuario.model"

export interface UsuarioDTO {
    nombres: string,
    apPaterno: string,
    apMaterno: string,
    documento: TipoDocumento,
    nDocumento: string,
    sexo: string,
    fechaDeNac: string,
    correoPersonal: string,
    correoInstitucional: string,
    nCelular: number,
    foto: string,
    codigo: number,
    usuario: number
}

export interface UsuarioDatasDTO {
    data: UsuarioDTO[]
}

export interface UsuarioDataDTO {
    data: UsuarioDTO
}

export type UsuarioCrearDTO  = Omit<UsuarioDTO, 'codigo'>

export type UsuarioCrearMaivoDTO = Omit<UsuarioDTO, 'codigo' | 'nCelular'> & {
    codigoRol: number,
    nCelular:string
}