import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./semestre-academico-page.component').then( c => c.SemestreAcademicoPageComponent)
    }
]

@NgModule({
    imports: [ RouterModule.forChild( routes )],
    exports: [ RouterModule ]
})

export class SemestreAcademicoRoutingModule {}