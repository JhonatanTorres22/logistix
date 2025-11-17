export interface RolDto {
  nombreRol: string;
}

export interface ModuloDto {
  nombreModulo: string;
  roles: RolDto[];
}

export interface RolUsuarioDto {
  modulos: ModuloDto[];
}


export interface UsuarioResponseDto {
  data: RolUsuarioDto[];
  isSuccess: boolean;
  message: string;
  errors: any;
}

export interface AuthenticarDTO {
  nombreUsuario : string,
  contrasenia : string,
  rol : string
}
