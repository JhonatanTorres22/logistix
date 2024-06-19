import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./facultad-page.component').then( c => c.FacultadPageComponent)
    }
]

@NgModule({
    imports: [ RouterModule.forChild( routes )],
    exports: [ RouterModule ]
})

export class FacultadRoutingModule {}