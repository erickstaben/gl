// import lib
import Loadable from 'react-loadable'
import React from 'react'
// import components
import LoadingComponent from '../../common/loader/index'

export default [
  {
    path: '/articles',
    title: 'Artigos',
    showInMenu: true,
    exact: true,
    auth: true,
    routes: [{
        path: '/articles/create',
        exact: true,
        title: 'Criar novos artigos',
        showInMenu: true,
        authority: 'super',
        auth: true,
        component: Loadable({
          loader: () => import('./pages/add/index'),
          loading: LoadingComponent,
        }),
      },
      {
        path: '/articles/:id/edit',
        exact: true,
        title: 'Editar artigo',
        showInMenu: false,
        auth: true,
        component: Loadable({
          loader: () => import('./pages/edit/index'),
          loading: LoadingComponent,
        }),
      },
      { 
        path: '/articles',
        exact: true,
        title: 'Artigos',
        showInMenu: true,
        auth: true,
        component: Loadable({
          loader: () => import('./pages/list/index'),
          loading: LoadingComponent,
        }),
      }],    
  }, 
  
]