import { MenuDTO, MenuResponseDTO, PermisoDTO, RolMenuDTO, SubMenuDTO } from "../../infraestructure/dto/menu.dto";
import { RolMenu } from "../models/menu.model";

export class MenuMapper {

static fromDTO(dto: RolMenuDTO): RolMenu {
  return {
    nombreRol: dto.nombreRol,
    menus: dto.menus.map(menu => ({
      titulo: menu.tituloMenu,
      url: menu.urlMenu,
      icono: menu.iconoMenu,
      subMenus: menu.subMenus.map(sub => ({
        titulo: sub.tituloSubMenu,
        url: sub.urlSubMenu,
        icono: sub.iconoSubMenu,
        permisos: sub.permisos.map(perm => ({
          descripcion: perm.descripcionPermiso
        }))
      }))
    }))
  };
}

}