
export interface AuthDTO {
    // usuario: string,
    // contraseña: string
    id: number;
    nombreUsuario: string;
    clave?: string;
    serviceToken?: string;
}

export type AuthLoginDTO = Omit< AuthDTO, 'id' | 'serviceToken'>


export interface AuthenticatedDTO {

}


export interface RolDTO {
    Codigo: string,
    Nombre: string,
    Ms: MenuDTO[]
}

export interface MenuDTO {
    Identificador: string,
    TituloMenu: string,
    Tipo: 'item' | 'collapse' | 'group',
    Icono: string,
    UrlMenu: string,
    Sms: SubMenuDTO[]
}

export interface SubMenuDTO {
    Identificador: string,
    TituloMenu: string,
    Tipo: 'item' | 'collapse' | 'group',
    Icono: string,
    UrlMenu: string,
}