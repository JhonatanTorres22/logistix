// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathGuard } from 'src/app/core/guards/path.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./default/default.component').then((c) => c.DefaultComponent),
    // canMatch: [ PathGuard]

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
