import { Navigation, NavigationItem } from "src/app/@theme/types/navigation";
import { MenuDTO, MenuResponseDTO, PermisoDTO, RolMenuDTO, SubMenuDTO } from "../../infraestructure/dto/menu.dto";
import { Menu, RolMenu } from "../models/menu.model";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root',
})
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

static mapMenuToNavigation(menus: Menu[]): Navigation[] {
  return menus.map((menu, indexMenu) => {

    return {
      id: `${indexMenu + 1}`,
      title: ' ',                                // 👈 título mínimo para que AblePro renderice
      type: 'group',
      classes: 'pc-item',                        // 👈 AblePro lo pide para estilos
      icon: '#custom-folder',                    // 👈 icono válido

      children: menu.subMenus?.map((sub, indexSub) => {

        const icon =
          !sub.icono || sub.icono === 'none'
            ? '#custom-story'
            : `#${sub.icono.replace('#', '')}`;

        const url =
          !sub.url || sub.url === 'none'
            ? `/${sub.titulo.replace(/\s+/g, '-').toLowerCase()}`
            : sub.url;

        return {
          id: `${indexMenu + 1}`,
          title: sub.titulo,
          type: 'item',
          icon,
          url,
          classes: 'nav-item',                   // 👈 necesario
          breadcrumbs: true,
          layout: 'vertical'
        };
      })
    };
  });
}



}