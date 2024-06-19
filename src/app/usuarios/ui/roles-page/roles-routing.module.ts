import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./roles-page.component').then( c => c.RolesPageComponent)
    }
]

@NgModule({
    imports: [ RouterModule.forChild( routes )],
    exports: [ RouterModule ]
})

export class RolesRoutingModule {

}