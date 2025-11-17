import { Injectable, signal } from "@angular/core";
import { Navigation } from "src/app/@theme/types/navigation";

@Injectable({
    providedIn: 'root'
})

export class MenuSignal {

    menusDefault: Navigation[] = [
        {
    id: '1',
    title: 'Configuración',
    type: 'group',
    icon: 'settings',
    children: [
      {
        id: '1',
        title: 'Usuarios',
        type: 'item',
        url: '/usuarios'
      },
      {
        id: '2',
        title: 'Roles',
        type: 'item',
        url: '/roles'
      }
    ]
  }
    ];
    
        public currentMenu = signal(this.menusDefault)
}
