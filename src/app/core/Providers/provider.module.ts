import { NgModule } from "@angular/core";
import { interceptorProviders } from "../interceptors/interceptor";
import { AsignacionRepository } from "src/app/programas-academicos/domain/repositories/asignacion.repository";
import { FacultadRepository } from "src/app/programas-academicos/domain/repositories/facultad.repository";
import { LocalRepository } from "src/app/programas-academicos/domain/repositories/local.repository";
import { ProgramaRepository } from "src/app/programas-academicos/domain/repositories/programa.repository";
import { SemestreAcademicoRepository } from "src/app/programas-academicos/domain/repositories/semestre-academico.repository";
import { AsignacionRepositoryImpl } from "src/app/programas-academicos/infraestructure/repositories/asignacion.repository.impl";
import { FacultadRepositoryImpl } from "src/app/programas-academicos/infraestructure/repositories/facultad.repository.impl";
import { LocalRepositoryImpl } from "src/app/programas-academicos/infraestructure/repositories/local.repository.impl";
import { ProgramaRepositoryImpl } from "src/app/programas-academicos/infraestructure/repositories/programa.repository.impl";
import { SemestreAcademicoRepositoryImpl } from "src/app/programas-academicos/infraestructure/repositories/semestre-academico.repository.impl";
import { UsuarioRolRepository } from "src/app/usuarios/domain/repositories/usuario-rol.repository";
import { UsuarioRepository } from "src/app/usuarios/domain/repositories/usuario.repository";
import { UsuarioRolRepositoryImp } from "src/app/usuarios/infraestructure/repositories/usuario-rol.repository.impl";
import { UsuarioRepositoryImpl } from "src/app/usuarios/infraestructure/repositories/usuario.repository.impl";
import { PlanEstudioRepository } from "src/app/plan-de-estudios/domain/repositories/plan-estudio.repository";
import { PlanEstidoRepositoryImpl } from "src/app/plan-de-estudios/infraestructure/repositories/plan-estudio.repository.impl";
import { CicloRepository } from "src/app/plan-de-estudios/domain/repositories/ciclo.repository";
import { CursoRepository } from "src/app/plan-de-estudios/domain/repositories/curso.repository";
import { CicloRepositoryImpl } from "src/app/plan-de-estudios/infraestructure/repositories/ciclo.repository.impl";
import { CursoRepositoryImpl } from "src/app/plan-de-estudios/infraestructure/repositories/curso.repository.impl";
import { ListarInfoDirectorRepository } from "src/app/auth/domain/repositories/listarInfoDirector.repository";
import { ListarInfoDirectorRepositoryImpl } from "src/app/auth/infraestructure/repositories/listarInfoDirector.impl";


@NgModule({
    exports: [ ],
    imports: [],
    providers: [
        interceptorProviders, 
        [
            { provide: SemestreAcademicoRepository, useClass: SemestreAcademicoRepositoryImpl },
            { provide: FacultadRepository, useClass: FacultadRepositoryImpl },
            { provide: ProgramaRepository, useClass: ProgramaRepositoryImpl },
            { provide: LocalRepository, useClass: LocalRepositoryImpl },
            { provide: UsuarioRolRepository, useClass: UsuarioRolRepositoryImp },
            { provide: UsuarioRepository, useClass: UsuarioRepositoryImpl },
            { provide: AsignacionRepository, useClass: AsignacionRepositoryImpl },
            { provide: PlanEstudioRepository, useClass: PlanEstidoRepositoryImpl },
            { provide: CicloRepository, useClass: CicloRepositoryImpl },
            { provide: CursoRepository, useClass: CursoRepositoryImpl },
            { provide: ListarInfoDirectorRepository, useClass: ListarInfoDirectorRepositoryImpl}

        ]
    ]
})

export class ProvidersModule {}