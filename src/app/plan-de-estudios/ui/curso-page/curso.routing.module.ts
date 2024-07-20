import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: '', loadComponent: () => import ('./curso-page.component').then( c => c.CursoPageComponent )}
]

@NgModule({
    imports: [ RouterModule.forChild( routes )],
    exports: [ RouterModule ],
    providers: []
})


export class CursoRoutingModule {
    
}