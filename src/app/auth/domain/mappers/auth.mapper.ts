import { Auth, AuthLogin, Menu, Rol, SubMenu } from "../models/auth.model";
import { AuthDTO, AuthLoginDTO, MenuDTO, RolDTO, SubMenuDTO } from "../../infraestructure/dto/auth.dto";
import { Navigation } from "src/app/@theme/types/navigation";

export class AuthMapper {
    static formApiToDomain( param: AuthDTO ): Auth {
        return {
            id: param.id,
            userName: param.nombreUsuario,
            password: param.clave!,
            token: param.serviceToken!
        }
    }

    static fromDomainToApi( param: Auth ): AuthLoginDTO {
        return {
            nombreUsuario: param.userName,
            clave: param.password,
        }
    }

    

    static fromApiToDomainMenu( param: MenuDTO): Navigation {
        // console.log(param);
        const subMenu = param.Sms.map( AuthMapper.fromApiToDomainSubMenu )
        return {
            id: param.Identificador,
            title: param.TituloMenu,
            type: param.Tipo,
            icon: param.Icono,
            url: param.UrlMenu,
            children: subMenu
        }
    }

    static fromApiToDomainRol( param: RolDTO): Rol {
        // console.log(param);
        
        const menu = param.Ms.map( AuthMapper.fromApiToDomainMenu )
        // console.log( menu );
        
        return {
            id: param.Codigo,
            rol: param.Nombre,
            menus: menu
        }
    }


    static fromApiToDomainSubMenu( param: SubMenuDTO): Navigation {
        return {
            id: param.Identificador,
            title: param.TituloMenu,
            type: param.Tipo,
            icon: param.Icono,
            url: param.UrlMenu,
        }
    }

    static fromDomainToTemplateMenu( param: Navigation[]): Navigation {
        // console.log(param);
        
        const menu = param.map( param => {
            if (param.title == 'Mensajería' || param.title == 'Dashboard' ) {
                return {
                    ...param,
                    breadcrumbs: false,
                    // url: param.url?.substring(1)

                }
            }

            return param
        } )
        // console.log( menu );
        
        return {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: menu
            
        }
    }
}