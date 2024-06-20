import { Navigation } from 'src/app/@theme/types/navigation';

export const menus: Navigation[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: '#custom-status-up',
        url: '/dashboard',
        children: [],
        breadcrumbs: false
      },
      {
        id: 'mensajeria',
        title: 'Mensajería',
        type: 'item',
        url: '/mensajeria',
        icon: '#custom-direct-inbox',
        children: [],
        breadcrumbs: false
      },
      {
        id: 'programas-academicos',
        title: 'Programas Académicos',
        type: 'item',
        url: '/programas-academicos',
        icon: '#custom-layer',
        children: []
      },
      {
        id: 'plan-de-estudios',
        title: 'Plan de Estudios',
        type: 'item',
        url: '/plan-de-estudios',
        icon: '#custom-row-vertical',
        children: []
      },
      {
        id: 'configuracion',
        title: 'Configuración',
        type: 'collapse',
        url: '/configuracion',
        icon: '#custom-setting-2',
        children: [
          {
            id: 'usuarios',
            title: 'Usuarios',
            type: 'item',
            url: '/configuracion/usuarios',
            icon: '#custom-user-square',
          }
        ]
      },
      {
        id: 'cerrar-sesion',
        title: 'Cerrar Sesión',
        type: 'item',
        url: '/auth/logout',
        icon: '#custom-logout',
      },
    ]
  },

];
