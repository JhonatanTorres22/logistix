// DTOs para consumir la API de menú

export interface PermisoDTO {
  descripcionPermiso: string;
}

export interface SubMenuDTO {
  tituloSubMenu: string;
  urlSubMenu: string;
  iconoSubMenu: string;
  permisos: PermisoDTO[];
}

export interface MenuDTO {
  tituloMenu: string;
  urlMenu: string;
  iconoMenu: string;
  subMenus: SubMenuDTO[];
}

export interface RolMenuDTO {
  nombreRol: string;
  menus: MenuDTO[];
}

export interface MenuResponseDTO {
  data: RolMenuDTO[];
  isSuccess: boolean;
  message: string;
  errors: any;
}
