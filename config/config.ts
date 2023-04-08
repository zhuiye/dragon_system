// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './user/Login',
        },
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          component: '404',
        },
      ],
    },
    {
      path: '/competition',
      name: '赛事管理',
      icon: 'dashboard',
      routes: [
        {
          path: '/competition',
          redirect: '/competition/home',
        },
        {
          name: '比赛项目分类表',
          path: '/competition/item',
          component: './competition/item',
        },
        {
          name: '赛事列表',
          path: '/competition/home',
          component: './competition/home',
        },
      ],
    },
    // {
    //   path: '/check',
    //   name: '比赛检录',
    //   icon: 'dashboard',
    //   routes: [
    //     {
    //       path: '/check',
    //       redirect: '/check/list',
    //     },
    //     {
    //       name: '管理页',
    //       path: '/check/list',
    //       component: './check/list',
    //     },
    //     {
    //       name: '详情页',
    //       path: '/check/detail',
    //       component: './check/detail',
    //     },
    //   ],
    // },
    {
      path: '/review',
      name: '报名审核',
      icon: 'dashboard',
      routes: [
        {
          name: '审核',
          path: '/review/home',
          component: './review/home',
        },
        {
          path: '/review/home/detail',
          component: './review/detail',
        },
        {
          name: '统计',
          path: '/review/statistic',
          component: './review/statistic',
        },
      ],
    },
    {
      path: '/comSign',
      name: '报名',
      icon: 'dashboard',
      routes: [
        {
          name: '我的队伍',
          path: '/comSign',
          component: './comSign/home',
        },
        {
          path: '/comSign/teamDetail',
          component: './comSign/teamDetail',
        },
        {
          path: '/comSign/matchTeam',
          component: './comSign/MatchTeam',
        },
        // {
        //   path: '/comSign/review',
        //   component: './comSign/review',
        // },
        {
          path: '/comSign/review/detail',
          component: './comSign/review/detail',
        },
        // {
        //   name: '详情页',
        //   path: '/check/detail',
        //   component: './check/detail',
        // },
      ],
    },
    {
      path: '/score',
      name: '竞赛成绩管理',
      icon: 'dashboard',
      routes: [
        {
          name: '首页',
          path: '/score/home',
          component: './score/home',
        },
        {
          path: '/score/home/detail',
          component: './score/detail',
        },
        {
          path: '/score/home/input',
          component: './score/input',
        },
      ],
    },
    // {
    //   path: '/assign',
    //   name: '赛道分配',
    //   icon: 'dashboard',
    //   routes: [
    //     {
    //       name: '分配界面',
    //       path: '/assign/detail',
    //       component: './assign/detail',
    //     },
    //     // {
    //     //   name: '详情页',
    //     //   path: '/check/detail',
    //     //   component: './check/detail',
    //     // },
    //   ],
    // },
    {
      path: '/competitor',
      name: '编排管理',
      icon: 'dashboard',
      routes: [
        {
          name: '赛制设置',
          path: '/competitor/round',
          component: './competitor/round',
        },
        {
          path: '/competitor/round/detail',
          component: './competitor/round/detail',
        },
        {
          name: '时间编排',
          path: '/competitor/time',
          component: './competitor/time',
        },
        {
          path: '/competitor/time/detail',
          component: './competitor/time/detail',
        },
        {
          path: '/competitor/time/assign',
          component: './competitor/time/assign',
        },
        {
          path: '/competitor/create',
          component: './competitor/create',
        },
        {
          name: '赛道编排页面',
          path: '/competitor/dispatch',
          component: './competitor/dispatch',
        },
        {
          path: '/competitor/dispatch/detail',
          component: './competitor/dispatch/detail',
        },
        {
          name: '赛道编排',
          path: '/competitor/show',
          component: './competitor/show',
        },

        // {
        //   name: '详情页',
        //   path: '/check/detail',
        //   component: './check/detail',
        // },
      ],
    },
    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   icon: 'dashboard',
    //   routes: [
    //     {
    //       path: '/dashboard',
    //       redirect: '/dashboard/analysis',
    //     },
    //     {
    //       name: 'analysis',
    //       icon: 'smile',
    //       path: '/dashboard/analysis',
    //       component: './dashboard/analysis',
    //     },
    //     {
    //       name: 'monitor',
    //       icon: 'smile',
    //       path: '/dashboard/monitor',
    //       component: './dashboard/monitor',
    //     },
    //     {
    //       name: 'workplace',
    //       icon: 'smile',
    //       path: '/dashboard/workplace',
    //       component: './dashboard/workplace',
    //     },
    //   ],
    // },
    // {
    //   path: '/form',
    //   icon: 'form',
    //   name: 'form',
    //   routes: [
    //     {
    //       path: '/form',
    //       redirect: '/form/basic-form',
    //     },
    //     {
    //       name: 'basic-form',
    //       icon: 'smile',
    //       path: '/form/basic-form',
    //       component: './form/basic-form',
    //     },
    //     {
    //       name: 'step-form',
    //       icon: 'smile',
    //       path: '/form/step-form',
    //       component: './form/step-form',
    //     },
    //     {
    //       name: 'advanced-form',
    //       icon: 'smile',
    //       path: '/form/advanced-form',
    //       component: './form/advanced-form',
    //     },
    //   ],
    // },
    // {
    //   path: '/list',
    //   icon: 'table',
    //   name: 'list',
    //   routes: [
    //     {
    //       path: '/list/search',
    //       name: 'search-list',
    //       component: './list/search',
    //       routes: [
    //         {
    //           path: '/list/search',
    //           redirect: '/list/search/articles',
    //         },
    //         {
    //           name: 'articles',
    //           icon: 'smile',
    //           path: '/list/search/articles',
    //           component: './list/search/articles',
    //         },
    //         {
    //           name: 'projects',
    //           icon: 'smile',
    //           path: '/list/search/projects',
    //           component: './list/search/projects',
    //         },
    //         {
    //           name: 'applications',
    //           icon: 'smile',
    //           path: '/list/search/applications',
    //           component: './list/search/applications',
    //         },
    //       ],
    //     },
    //     {
    //       path: '/list',
    //       redirect: '/list/table-list',
    //     },
    //     {
    //       name: 'table-list',
    //       icon: 'smile',
    //       path: '/list/table-list',
    //       component: './list/table-list',
    //     },
    //     {
    //       name: 'basic-list',
    //       icon: 'smile',
    //       path: '/list/basic-list',
    //       component: './list/basic-list',
    //     },
    //     {
    //       name: 'card-list',
    //       icon: 'smile',
    //       path: '/list/card-list',
    //       component: './list/card-list',
    //     },
    //   ],
    // },
    // {
    //   path: '/profile',
    //   name: 'profile',
    //   icon: 'profile',
    //   routes: [
    //     {
    //       path: '/profile',
    //       redirect: '/profile/basic',
    //     },
    //     {
    //       name: 'basic',
    //       icon: 'smile',
    //       path: '/profile/basic',
    //       component: './profile/basic',
    //     },
    //     {
    //       name: 'advanced',
    //       icon: 'smile',
    //       path: '/profile/advanced',
    //       component: './profile/advanced',
    //     },
    //   ],
    // },
    // {
    //   name: 'result',
    //   icon: 'CheckCircleOutlined',
    //   path: '/result',
    //   routes: [
    //     {
    //       path: '/result',
    //       redirect: '/result/success',
    //     },
    //     {
    //       name: 'success',
    //       icon: 'smile',
    //       path: '/result/success',
    //       component: './result/success',
    //     },
    //     {
    //       name: 'fail',
    //       icon: 'smile',
    //       path: '/result/fail',
    //       component: './result/fail',
    //     },
    //   ],
    // },
    // {
    //   name: 'exception',
    //   icon: 'warning',
    //   path: '/exception',
    //   routes: [
    //     {
    //       path: '/exception',
    //       redirect: '/exception/403',
    //     },
    //     {
    //       name: '403',
    //       icon: 'smile',
    //       path: '/exception/403',
    //       component: './exception/403',
    //     },
    //     {
    //       name: '404',
    //       icon: 'smile',
    //       path: '/exception/404',
    //       component: './exception/404',
    //     },
    //     {
    //       name: '500',
    //       icon: 'smile',
    //       path: '/exception/500',
    //       component: './exception/500',
    //     },
    //   ],
    // },
    // {
    //   name: 'account',
    //   icon: 'user',
    //   path: '/account',
    //   routes: [
    //     {
    //       path: '/account',
    //       redirect: '/account/center',
    //     },
    //     {
    //       name: 'center',
    //       icon: 'smile',
    //       path: '/account/center',
    //       component: './account/center',
    //     },
    //     {
    //       name: 'settings',
    //       icon: 'smile',
    //       path: '/account/settings',
    //       component: './account/settings',
    //     },
    //   ],
    // },
    // {
    //   name: 'editor',
    //   icon: 'highlight',
    //   path: '/editor',
    //   routes: [
    //     {
    //       path: '/editor',
    //       redirect: '/editor/flow',
    //     },
    //     {
    //       name: 'flow',
    //       icon: 'smile',
    //       path: '/editor/flow',
    //       component: './editor/flow',
    //     },
    //     {
    //       name: 'mind',
    //       icon: 'smile',
    //       path: '/editor/mind',
    //       component: './editor/mind',
    //     },
    //     {
    //       name: 'koni',
    //       icon: 'smile',
    //       path: '/editor/koni',
    //       component: './editor/koni',
    //     },
    //   ],
    // },
    {
      path: '/',
      redirect: '/dashboard/analysis',
    },
    {
      component: '404',
    },
  ],
  access: {},
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
