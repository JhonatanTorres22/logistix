// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./default/default.component').then((c) => c.DefaultComponent)

    // children: [
    //   {
    //     path: 'default',
    //     loadComponent: () => import('./default/default.component').then((c) => c.DefaultComponent)
    //   },
    //   {
    //     path: 'analytics',
    //     loadComponent: () => import('./analytics/analytics.component').then((c) => c.AnalyticsComponent)
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
