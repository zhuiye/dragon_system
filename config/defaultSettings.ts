import { Settings as LayoutSettings } from '@ant-design/pro-layout';
// import logo from './logo.png';
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#D84F47',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '龙舟赛事管理系统',
  pwa: false,
  logo: 'https://s2.loli.net/2023/04/15/362grZpsQdGbS5I.png',
  iconfontUrl: '',
};

export default Settings;
