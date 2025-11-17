import { AuthenticarDTO, RolUsuarioDto, UsuarioResponseDto } from "../../infraestructure/dto/authenticar.dto";
import { Authenticar, Modulo, Rol, RolUsuario, UsuarioResponse } from "../models/authenticar.model";

export class AuthenticarMapper {

  static fromDto(dto: RolUsuarioDto): RolUsuario {
    const modulos = dto.modulos.map(m =>
      new Modulo(
        m.nombreModulo,
        m.roles.map(r => new Rol(r.nombreRol))
      )
    );

    return new RolUsuario(modulos);
  }

  static fromDtoData(dto: UsuarioResponseDto): UsuarioResponse {
    return {
      data: dto.data.map(AuthenticarMapper.fromDto), // mapea cada RolUsuarioDto
      isSuccess: dto.isSuccess,
      message: dto.message,
      errors: dto.errors
    };
  }

static fromDomainToApiLogin(param: Authenticar): AuthenticarDTO {
  return {
    nombreUsuario: param.username,
    contrasenia: param.password,
    rol: param.role
  };
}
}