// Models internos de la app

export interface Permiso {
  descripcion: string;
}

export interface SubMenu {
  titulo: string;
  url: string;
  icono: string;
  permisos: Permiso[];
}

export interface Menu {
  titulo: string;
  url: string;
  icono: string;
  subMenus: SubMenu[];
}

export interface RolMenu {
  nombreRol: string;
  menus: Menu[];
}
