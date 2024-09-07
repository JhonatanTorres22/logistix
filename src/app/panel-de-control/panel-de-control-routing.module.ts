import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/panel-de-control-page.component').then( (c) => c.PanelDeControlPageComponent )
  }
  ,{ 
    path: 'control-interno',
    loadComponent: () => import('./ui/control-interno-page/control-interno-page.component').then( c => c.ControlInternoPageComponent )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelDeControlRoutingModule { }
