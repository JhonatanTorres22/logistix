import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        // loadComponent: () => import('./ui/auth-page.component').then( c => c.AuthComponent ),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./ui/auth-page.component').then( c => c.AuthComponent ),
            },
            // {
            //     path: 'select-rol',
            //     loadComponent: () => import('./ui/select-rol/select-rol.component').then( c => c.SelectRolComponent ),
            // },
            // {
            //     path: 'logout',
            //     loadComponent: () => import('./ui/logout/logout.component').then( c => c.LogoutComponent )
            // },
        ]
    },
    
]

@NgModule({
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})

export class AuthRoutingModule {}