import { IConfig, IPlugin } from 'umi-types';

import defaultSettings from './defaultSettings';
// https://umijs.org/config/
import slash from 'slash2';
import webpackPlugin from './plugin.config';

const { pwa, primaryColor } = defaultSettings;

const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        enable: true,
        default: 'pt-BR',
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false,
      // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];


export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  outputPath: '../../public/dist',
  publicPath: './dist/',
  devtool: 'source-map',
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/MainLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['admin', 'user'],
      routes: [
        {
          path: '/',
          name: 'home',
          icon: 'home',
          component: './Home',
        },{
          path: '/pipes',
          name: 'pipes',
          icon: 'pipe',
          routes: [ 
            {
              path: '/pipes',
              name: 'pipesCenter',
              component: './cards/routes/PipeCenter',
            },          
            {
              path: '/pipes/config',
              name: 'pipeConfig',
              component: './cards/routes/PipeConfig',
            },
            {
              path: '/pipes/:id',
              name: 'pipeBoard',
              hideInMenu: true,
              component: './cards/routes/PipeBoard',
            }, 
          ]
        },
        {
          path: '/customers',
          name: 'customers',
          icon: 'pipe',
          component: './customers/routes/CustomerList',          
        },
        {
          path: '/reports',
          name: 'reports',
          authority: ['super'],
          icon: 'pipe',
          component: './reports/routes/MainReports',          
        },
        {
          path: '/scripts',
          name: 'scripts',
          icon: 'pipe',
          component: './scripts/routes/ScriptsHome',          
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/dist/',
  },
  chainWebpack: webpackPlugin,
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
} as IConfig;
