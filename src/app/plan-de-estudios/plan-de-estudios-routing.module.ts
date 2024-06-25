import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/plan-de-estudios-page.component').then( c => c.PlanDeEstudiosPageComponent),
  },{
    path: 'malla-curricular',
    loadComponent: () => import('./ui/malla-curricular-page/malla-curricular-page.component').then( c => c.MallaCurricularPageComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanDeEstudiosRoutingModule { }
