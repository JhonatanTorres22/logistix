import { Navigation } from "src/app/@theme/types/navigation";

export class Auth {
    constructor (
        public id: number,
        public userName: string,
        public password: string,
        public token: string,
    ) {}
}


export type AuthLogin = Omit< Auth, 'id' | 'token'>


export interface AccessToken {
    accessToken: string;
}

export interface AccessTokenData {
    data: AccessToken
}

export interface Authenticated {
    unique_name: string,
    ApellidosyNombres: string,
    TipoDocumento: string,
    NumeroDocumento: string,
    Sexo: string,
    Edad: string,
    CorreoPersonal: string,
    CorreoInstitucional: string,
    Celular: string,
    ImagenPerfil: string,
    Roles: string,
    nbf: number,
    exp: number,
    iat: number,
    iss: string,
    aud: string,
    serviceToken: string
}


export interface Rol {
    id: string,
    rol: string,
    menus: Navigation[]
}

export interface Menu {
    id: string,
    title: string,
    type: string,
    icon: string,
    url: string,
    children: Navigation[]
}

export interface SubMenu {
    id: string,
    title: string,
    type: string,
    icon: string,
    url: string,
}

