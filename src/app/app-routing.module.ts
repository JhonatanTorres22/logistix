// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// project import
import { AdminComponent } from './demo/layout/admin';
import { EmptyComponent } from './demo/layout/empty/empty.component';
import { GuestComponent } from './demo/layout/front/guest.component';
import { AuthGuard } from './@theme/helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./demo/pages/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/pages/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'configuracion',
        loadChildren: () => import('./usuarios/usuarios.module').then( (m) => m.UsuariosModule)
      },
      {
        path: 'programas-academicos',
        loadChildren: () => import('./programas-academicos/programas-academicos.module').then( (m) => m.ProgramasAcademicosModule)
      },
      {
        path: 'mensajeria',
        loadChildren: () => import('./mensajeria/mensajeria.module').then( (m) => m.MensajeriaModule)
      }
    ]
  },
  {
    path: '',
    component: EmptyComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
      },

    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
