import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PathGuard } from "../core/guards/path.guard";

const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./ui/programas-academicos-page.component').then( c => c.ProgramasAcademicosComponent),
        // children: [
        //     {
        //         path: 'semestre-academico',
        //         loadChildren: () => import('./ui/semestre-academico-page/semestre-academico.module').then( m => m.SemestreAcademicoModule)
        //     }
        // ]
    }
]

@NgModule({
    imports: [RouterModule.forChild( routes )],
    exports: [ RouterModule ]
})

export class ProgramasAcademicosRoutingModule {
    
}