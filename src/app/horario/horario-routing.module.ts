import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'validar',
    pathMatch: 'prefix'
  },
  {
    path: 'validar',
    loadComponent: ()  => import('./ui/horario.component').then( c => c.HorarioComponent )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorarioRoutingModule { }
