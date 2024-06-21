import { NgModule } from "@angular/core";

import { interceptorProviders } from "../core/interceptors/interceptor";
import { UsuarioRepository } from "./domain/repositories/usuario.repository";
import { UsuarioRepositoryImpl } from "./infraestructure/repositories/usuario.repository.impl";
import { UsuariosRoutingModule } from "./usuarios-routing.module";
import { CommonModule } from "@angular/common";
import { UsuarioRolRepository } from "./domain/repositories/usuario-rol.repository";
import { UsuarioRolRepositoryImp } from "./infraestructure/repositories/usuario-rol.repository.impl";
import { RolRepositoryImpl } from "../roles/infraestucture/repositories/rol.repository.imp";
import { RolRepository } from "../roles/domain/repositories/rol.repository";
import { SharedModule } from "src/app/demo/shared/shared.module";


@NgModule({
    declarations: [],
    imports: [CommonModule, UsuariosRoutingModule, SharedModule],
    exports: [],
    providers: [
        interceptorProviders, [
          { provide: UsuarioRepository, useClass: UsuarioRepositoryImpl },
          { provide: UsuarioRolRepository, useClass: UsuarioRolRepositoryImp },
          { provide: RolRepository, useClass: RolRepositoryImpl },
        ]
    ]
})


export class UsuariosModule {}