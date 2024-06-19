import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../demo/shared/shared.module";
import { ProgramasAcademicosRoutingModule } from "./programas-academicos-routing.module";
import { interceptorProviders } from "../core/interceptors/interceptor";
import { UsuarioRepository } from "../usuarios/domain/repositories/usuario.repository";
import { UsuarioRepositoryImpl } from "../usuarios/infraestructure/repositories/usuario.repository.impl";
import { SemestreAcademicoRepository } from "./domain/repositories/semestre-academico.repository";
import { SemestreAcademicoRepositoryImpl } from "./infraestructure/repositories/semestre-academico.repository.impl";
import { FacultadRepository } from "./domain/repositories/facultad.repository";
import { FacultadRepositoryImpl } from "./infraestructure/repositories/facultad.repository.impl";
import { ProgramaRepository } from "./domain/repositories/programa.repository";
import { ProgramaRepositoryImpl } from "./infraestructure/repositories/programa.repository.impl";
import { LocalRepository } from "./domain/repositories/local.repository";
import { LocalRepositoryImpl } from "./infraestructure/repositories/local.repository.impl";
import { UsuarioRolRepository } from "../usuarios/domain/repositories/usuario-rol.repository";
import { UsuarioRolRepositoryImp } from "../usuarios/infraestructure/repositories/usuario-rol.repository.impl";


@NgModule({
    imports: [ CommonModule, SharedModule, ProgramasAcademicosRoutingModule],
    providers: [
        interceptorProviders, 
        [
            { provide: SemestreAcademicoRepository, useClass: SemestreAcademicoRepositoryImpl },
            { provide: FacultadRepository, useClass: FacultadRepositoryImpl },
            { provide: ProgramaRepository, useClass: ProgramaRepositoryImpl },
            { provide: LocalRepository, useClass: LocalRepositoryImpl },
            // { provide: UsuarioRepository, useClass: UsuarioRepositoryImpl },
            { provide: UsuarioRolRepository, useClass: UsuarioRolRepositoryImp },
            { provide: UsuarioRepository, useClass: UsuarioRepositoryImpl },


        ]
    ]
})

export class ProgramasAcademicosModule {}