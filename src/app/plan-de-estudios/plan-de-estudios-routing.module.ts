import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gestionar-planes',
    pathMatch: 'prefix'
  },
  {
    path: 'gestionar-planes',
    loadComponent: () => import('./ui/plan-de-estudios-page.component').then( c => c.PlanDeEstudiosPageComponent),
  },{
    path: 'malla-curricular',
    loadComponent: () => import('./ui/malla-curricular-page/malla-curricular-page.component').then( c => c.MallaCurricularPageComponent)
  },
  {
    path: 'disenar',
    loadComponent: () => import('./ui/plan-estudio-wizard/plan-estudio-wizard.component').then( c => c.PlanEstudioWizardComponent)

  }, {
    path: 'analisis-de-equivalencias',
    loadComponent: () => import('./ui/analisis-equivalencia-page/analisis-equivalencia-page.component').then( c => c.AnalisisEquivalenciaPageComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanDeEstudiosRoutingModule { }
