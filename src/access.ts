/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(
  initialState: { currentUser?: API.CurrentUser; hasRoutes: any[] } | undefined,
) {
  const { currentUser } = initialState ?? {};

  const routes = currentUser?.routes ?? [
    '赛事管理',
    '比赛检录',
    '报名审核',
    '报名',
    '竞赛成绩管理',
    '编排管理',
  ];

  return {
    // canAdmin: currentUser && currentUser.access === 'admin',
    normalRouteFilter: (route: any) => routes.includes(route.name),
  };
}
