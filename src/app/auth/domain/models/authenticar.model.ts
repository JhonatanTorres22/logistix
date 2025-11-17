export class Rol {
  constructor(
    public nombre: string
  ) {}
}

export class Modulo {
  constructor(
    public nombre: string,
    public roles: Rol[]
  ) {}
}

export class RolUsuario {
  constructor(
    public modulos: Modulo[]
  ) {}
}

export interface UsuarioResponse {
  data: RolUsuario[];
  isSuccess: boolean;
  message: string;
  errors: any;
}

export class Authenticar {
  constructor(
    public username : string,
    public password : string,
    public role : string
  ){}
}


export interface AccessToken {
    accessToken: string;
}

export interface AccessTokenData {
    data: AccessToken
}

export interface Authenticated {
    IdUsuario: string,
    ApellidosyNombres: string,
    Correo: string,
    Rol:string
    permission : string
    jti : string
    rt : string
    nbf: number,
    exp: number,
    iat: number,
    iss: string,
    aud: string,
}