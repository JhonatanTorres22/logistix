import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
      path: 'usuarios',
      loadComponent: () => import('./ui/usuarios-page.component').then((c) => c.UsuariosPageComponent)
  },
  {
    path: 'roles',
    loadChildren: () => import('./ui/roles-page/roles-routing.module').then(m => m.RolesRoutingModule)
  }
]

@NgModule({
  imports: [ RouterModule.forChild( routes )],
  exports: [ RouterModule ]  
})

export class UsuariosRoutingModule {}