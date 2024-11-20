// angular import
import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withViewTransitions } from '@angular/router';

// project import
import { AdminComponent } from './demo/layout/admin';
import { EmptyComponent } from './demo/layout/empty/empty.component';
import { GuestComponent } from './demo/layout/front/guest.component';
import { AuthGuard } from './@theme/helpers/auth.guard';
import { PathGuard } from './core/guards/path.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    // canActivateChild: [ PathGuard ],
    children: [
      {
        path: '',
        loadChildren: () => import('./demo/pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/pages/dashboard/dashboard.module').then((m) => m.DashboardModule),

      },
      {
        path: 'configuracion',
        loadChildren: () => import('./usuarios/usuarios.module').then( (m) => m.UsuariosModule),
        canActivate: [ PathGuard ],

      },
      {
        path: 'programas-academicos',
        loadChildren: () => import('./programas-academicos/programas-academicos.module').then( (m) => m.ProgramasAcademicosModule),
        canActivate: [ PathGuard ],

      },{
        path: 'plan-de-estudios',
        loadChildren: () => import('./plan-de-estudios/plan-de-estudios.module').then( (m) => m.PlanDeEstudiosModule),
        canActivate: [ PathGuard ],
       
      },
      {
        path: 'cursos',
        loadChildren: () => import('./plan-de-estudios/ui/curso-page/curso.module').then( (m) => m.CursoModule )
      },
      {
        path: 'mensajeria',
        loadChildren: () => import('./mensajeria/mensajeria.module').then( (m) => m.MensajeriaModule),
        canActivate: [ PathGuard ],

      }, {
        path: 'panel-de-control',
        loadChildren: () => import('./panel-de-control/panel-de-control.module').then( (m) => m.PanelDeControlModule )
      },
      {
        path: 'apertura',
        loadChildren: () => import('./apertura/apertura.module').then( (m) => m.AperturaModule ),
        
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
  exports: [RouterModule],
  // providers: [provideRouter( routes, withViewTransitions() )]
})
export class AppRoutingModule {}
