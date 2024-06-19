import { Navigation } from 'src/app/@theme/types/navigation';

export const menus: Navigation[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Dashboard',
        title: 'Dashboard',
        type: 'collapse',
        icon: '#custom-status-up',
        children: [
          {
            id: 'default',
            title: 'Default',
            type: 'item',
            url: '/dashboard/default'
          },
          {
            id: 'analytics',
            title: 'Analytics',
            type: 'item',
            url: '/dashboard/analytics'
          }
        ]
      },
      {
        id: 'component',
        title: 'Components',
        type: 'item',
        classes: 'nav-item',
        url: '/components/input/button',
        icon: '#custom-box-1',
        target: true,
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'widget',
    title: 'Widget',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'statistics',
        title: 'Statistics',
        type: 'item',
        classes: 'nav-item',
        url: '/widget/statistics',
        icon: '#custom-story'
      },
      {
        id: 'data',
        title: 'Data',
        type: 'item',
        classes: 'nav-item',
        url: '/widget/data',
        icon: '#custom-fatrows'
      },
      {
        id: 'chart',
        title: 'Chart',
        type: 'item',
        classes: 'nav-item',
        url: '/widget/chart',
        icon: '#custom-presentation-chart'
      }
    ]
  },
  {
    id: 'application',
    title: 'Application',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'calender',
        title: 'Calender',
        type: 'item',
        classes: 'nav-item',
        url: '/application/calender',
        icon: '#custom-calendar-1'
      },
      {
        id: 'kanban',
        title: 'Kanban',
        type: 'item',
        classes: 'nav-item',
        url: '/application/kanban',
        icon: '#custom-kanban'
      },
      {
        id: 'customer',
        title: 'Customer',
        type: 'item',
        classes: 'nav-item',
        url: '/application/customer',
        icon: '#custom-notification-status'
      },
      {
        id: 'file-manager',
        title: 'File Manager',
        type: 'item',
        classes: 'nav-item',
        url: '/application/file-manager',
        icon: '#custom-document-filter'
      },
      {
        id: 'mail',
        title: 'Mail',
        type: 'item',
        classes: 'nav-item',
        url: '/application/email',
        icon: '#custom-direct-inbox',
        breadcrumbs: false
      },
      {
        id: 'profile',
        title: 'Profile',
        type: 'collapse',
        icon: '#custom-user-square',
        children: [
          {
            id: 'account',
            title: 'Account Profile',
            type: 'item',
            url: '/application/profile/account'
          },
          {
            id: 'social',
            title: 'Social Profile',
            type: 'item',
            url: '/application/profile/social'
          },
          {
            id: 'user',
            title: 'User Profile',
            type: 'item',
            url: '/application/profile/user'
          }
        ]
      },
      {
        id: 'e-commerce',
        title: 'E-commerce',
        type: 'collapse',
        icon: '#custom-shopping-bag',
        children: [
          {
            id: 'product',
            title: 'Product',
            type: 'item',
            url: '/application/e-commerce/product'
          },
          {
            id: 'product-details',
            title: 'Product Details',
            type: 'item',
            url: '/application/e-commerce/product-details/1'
          },
          {
            id: 'product-list',
            title: 'Product List',
            type: 'item',
            url: '/application/e-commerce/product-list'
          },
          {
            id: 'new-product',
            title: 'Add New Product',
            type: 'item',
            url: '/application/e-commerce/new-product'
          },
          {
            id: 'checkout',
            title: 'Checkout',
            type: 'item',
            url: '/application/e-commerce/checkout'
          }
        ]
      }
    ]
  },
  {
    id: 'forms',
    title: 'Forms',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'wizard',
        title: 'Form Wizard',
        type: 'item',
        classes: 'nav-item',
        url: '/forms/wizard',
        icon: '#custom-play'
      },
      {
        id: 'validation',
        title: 'Form Validation',
        type: 'item',
        classes: 'nav-item',
        url: '/forms/validation',
        icon: '#custom-password-check'
      },
      {
        id: 'layouts',
        title: 'Layouts',
        type: 'collapse',
        icon: '#custom-row-vertical',
        children: [
          {
            id: 'basic',
            title: 'Basic',
            type: 'item',
            url: '/forms/layout/basic-layout'
          },
          {
            id: 'multi-column',
            title: 'Multi Column',
            type: 'item',
            url: '/forms/layout/multi-layout'
          },
          {
            id: 'action-bar',
            title: 'Action Bar',
            type: 'item',
            url: '/forms/layout/action-bar'
          },
          {
            id: 'Sticky Bar',
            title: 'Sticky Action Bar',
            type: 'item',
            url: '/forms/layout/sticky-bar'
          }
        ]
      },
      {
        id: 'plugins',
        title: 'Plugins',
        type: 'collapse',
        icon: '#custom-cpu-charge',
        children: [
          {
            id: 'mask',
            title: 'Mask',
            type: 'item',
            url: '/forms/plugins/mask'
          },
          {
            id: 'reCaptcha',
            title: 'reCaptcha',
            type: 'item',
            url: '/forms/plugins/reCaptcha'
          },
          {
            id: 'clip-board',
            title: 'Clipboard',
            type: 'item',
            url: '/forms/plugins/clip-board'
          },
          {
            id: 'editor',
            title: 'Editor',
            type: 'item',
            url: '/forms/plugins/editor'
          },
          {
            id: 'drop-zone',
            title: 'Drop Zone',
            type: 'item',
            url: '/forms/plugins/drop-zone'
          }
        ]
      }
    ]
  },
  {
    id: 'table',
    title: 'Table',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'material table',
        title: 'Material Table',
        type: 'item',
        classes: 'nav-item',
        url: '/material-table',
        icon: '#custom-text-align-justify-center'
      }
    ]
  },
  {
    id: 'chart',
    title: 'Charts',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'apex-charts',
        title: 'Apex Chart',
        type: 'item',
        classes: 'nav-item',
        url: '/apex-chart',
        icon: '#custom-graph'
      }
    ]
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'authentication',
        title: 'Authentication',
        type: 'collapse',
        icon: '#custom-shield',
        children: [
          {
            id: 'authentication-1',
            title: 'Authentication 1',
            type: 'collapse',
            children: [
              {
                id: 'login',
                title: 'Login',
                type: 'item',
                url: '/authentication-1/login',
                target: true,
                breadcrumbs: false
              },
              {
                id: 'register',
                title: 'Register',
                type: 'item',
                url: '/authentication-1/register',
                target: true,
                breadcrumbs: false
              },
              {
                id: 'forgot',
                title: 'Forgot Password',
                type: 'item',
                url: '/authentication-1/forgot-password',
                target: true,
                breadcrumbs: false
              },
              {
                id: 'reset',
                title: 'Reset Password',
                type: 'item',
                url: '/authentication-1/reset-password',
                target: true,
                breadcrumbs: false
              },
              {
                id: 'check-mail',
                title: 'Check Mail',
                type: 'item',
                url: '/authentication-1/check-mail',
                target: true,
                breadcrumbs: false
              },
              {
                id: 'code-verify',
                title: 'Code Verification',
                type: 'item',
                url: '/authentication-1/code-verify',
                target: true,
                breadcrumbs: false
              }
            ]
          },
          {
            id: 'authentication-2',
            title: 'Authentication 2',
            type: 'collapse',
            children: [
              {
                id: 'login',
                title: 'Login',
                type: 'item',
                url: '/authentication-2/login',
                target: true,
                breadcrumbs: false
              },
              {
                id: 'register',
                title: 'Register',
                type: 'item',
                url: '/authentication-2/register',
                target: true,
                breadcrumbs: false
              },
              {
                id: 'forgot',
                title: 'Forgot Password',
                type: 'item',
                url: '/authentication-2/forgot-password',
                target: true,
                breadcrumbs: false
              },
              {
                id: 'reset',
                title: 'Reset Password',
                type: 'item',
                url: '/authentication-2/reset-password',
                target: true,
                breadcrumbs: false
              },
              {
                id: 'check-mail',
                title: 'Check Mail',
                type: 'item',
                url: '/authentication-2/check-mail',
                target: true,
                breadcrumbs: false
              },
              {
                id: 'code-verify',
                title: 'Code Verification',
                type: 'item',
                url: '/authentication-2/code-verify',
                target: true,
                breadcrumbs: false
              }
            ]
          },
          {
            id: 'authentication-3',
            title: 'Authentication 3',
            type: 'item',
            classes: 'nav-item',
            url: '/authentication-3',
            target: true,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'maintenance',
        title: 'Maintenance',
        type: 'collapse',
        icon: '#custom-flag',
        children: [
          {
            id: 'error',
            title: 'Error 404',
            type: 'item',
            url: '/maintenance/error-404',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'error-500',
            title: 'Error 500',
            type: 'item',
            url: '/maintenance/error-500',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'under-constructor',
            title: 'Under Construction',
            type: 'item',
            url: '/maintenance/under-constructor',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'coming-soon',
            title: 'Coming Soon',
            type: 'item',
            url: '/maintenance/coming-soon',
            target: true,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'contact-us',
        title: 'Contact Us',
        type: 'item',
        classes: 'nav-item',
        url: '/contact-us',
        icon: '#custom-24-support',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'price',
        title: 'Price',
        type: 'collapse',
        icon: '#custom-dollar-square',
        children: [
          {
            id: 'price-1',
            title: 'Price 1',
            type: 'item',
            url: '/price/price-1'
          },
          {
            id: 'price-2',
            title: 'Price 2',
            type: 'item',
            url: '/price/price-2'
          }
        ]
      },
      {
        id: 'landing',
        title: 'Landing',
        type: 'item',
        classes: 'nav-item',
        url: '/landing',
        icon: '#custom-airplane',
        target: true,
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'menu-levels',
        title: 'Menu levels',
        type: 'collapse',
        icon: '#custom-level',
        children: [
          {
            id: 'level-2-1',
            title: 'Level 2.1',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'menu-level-2.2',
            title: 'Menu Level 2.2',
            type: 'collapse',
            classes: 'edge',
            children: [
              {
                id: 'menu-level-3.1',
                title: 'Menu Level 3.1',
                type: 'item',
                url: 'javascript:',
                external: true
              },
              {
                id: 'menu-level-3.2',
                title: 'Menu Level 3.2',
                type: 'item',
                url: 'javascript:',
                external: true
              },
              {
                id: 'menu-level-3.3',
                title: 'Menu Level 3.3',
                type: 'collapse',
                classes: 'edge',
                children: [
                  {
                    id: 'menu-level-4.1',
                    title: 'Menu Level 4.1',
                    type: 'item',
                    url: 'javascript:',
                    external: true
                  },
                  {
                    id: 'menu-level-4.2',
                    title: 'Menu Level 4.2',
                    type: 'item',
                    url: 'javascript:',
                    external: true
                  }
                ]
              }
            ]
          },
          {
            id: 'menu-level-2.3',
            title: 'Menu Level 2.3',
            type: 'collapse',
            classes: 'edge',
            children: [
              {
                id: 'menu-level-3.1',
                title: 'Menu Level 3.1',
                type: 'item',
                url: 'javascript:',
                external: true
              },
              {
                id: 'menu-level-3.2',
                title: 'Menu Level 3.2',
                type: 'item',
                url: 'javascript:',
                external: true
              },
              {
                id: 'menu-level-3.3',
                title: 'Menu Level 3.3',
                type: 'collapse',
                classes: 'edge',
                children: [
                  {
                    id: 'menu-level-4.1',
                    title: 'Menu Level 4.1',
                    type: 'item',
                    url: 'javascript:',
                    external: true
                  },
                  {
                    id: 'menu-level-4.2',
                    title: 'Menu Level 4.2',
                    type: 'item',
                    url: 'javascript:',
                    external: true
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        classes: 'nav-item',
        url: '/sample-page',
        icon: '#custom-notification-status'
      },
      {
        id: 'document',
        title: 'Document',
        type: 'item',
        classes: 'nav-item',
        url: 'https://phoenixcoded.gitbook.io/able-pro/v/angular',
        icon: '#custom-gitBook',
        target: true,
        external: true
      }
    ]
  }
];
