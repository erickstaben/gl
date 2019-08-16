// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../common/loader/index'

const routes = [
  {
    path: '/',
    exact: true,
    showInMenu: true,
    title: 'Página inicial',
    component: Loadable({
      loader: () => import('./pages/home/index'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/blog',
    exact: true,
    showInMenu: true,
    authority: 'super',
    title: 'Artigos publicados',
    component: Loadable({
      loader: () => import('./pages/blog/list/index'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/blog/:slug',
    exact: true,
    showInMenu: false,
    component: Loadable({
      loader: () => import('./pages/blog/details/index'),
      loading: LoadingComponent,
    }),
  },
]

export default routes
