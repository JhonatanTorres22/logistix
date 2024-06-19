export interface UsuarioRolDTO {
    codigo: number,
    apellidosyNombres: string,
    nombre: string,
    estadoAlta: string,
    condicion: string
}

export interface UsuarioRolDataArrayDTO {
    data: UsuarioRolDTO[]
}

export interface UsuarioRolDataDTO {
    data: UsuarioRolDTO
}

export interface UsuarioRolAgregarDTO  {
    codigoUsuario: number,
    codigoRol: number,
    usuario: number
}

export interface UsuarioRolSuspenderDTO {
    codigo: number,
    usuario: number
}

export interface UsuarioRolEliminarDTO {
    codigo: number,
    usuario: number
}

export interface UsuarioRolAltaDTO {
    codigo: number,
    usuario: number
}