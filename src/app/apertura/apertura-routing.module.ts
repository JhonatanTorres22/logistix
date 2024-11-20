import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cursos',
    pathMatch: 'prefix'
  },
  {
    path: 'cursos',
    loadComponent: ()  => import('./ui/apertura.component').then( c => c.AperturaComponent )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AperturaRoutingModule { }
