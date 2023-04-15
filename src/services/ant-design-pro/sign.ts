import { request } from 'umi';

export interface SignUp {
  competition_id: number;
  team_id: number;
  player_ids: string;
  item_relation: string;
  submit_time: number;
  status: number;
}
/** 此处后端没有提供注释 GET /api/competition */
export async function getSignUp(options?: { [key: string]: any }) {
  return request<any[]>('/dragon-api/sign-up', {
    method: 'GET',
    params: options ?? {},
  }).then((res: any) => res.data);
}

export async function getSignUpCount(options?: { [key: string]: any }) {
  return request<any[]>('/dragon-api/sign-up/count', {
    method: 'GET',
    params: options ?? {},
  }).then((res: any) => res.data);
}

export async function getSignUpTeams(options?: { [key: string]: any }) {
  return request<any[]>('/dragon-api/sign-up/team', {
    method: 'GET',
    params: options ?? {},
  }).then((res: any) => res.data);
}

export async function postSignUp(description: { [key: string]: any }) {
  return request('/dragon-api/sign-up', {
    method: 'POST',
    data: description,
  });
}
// 更新状态
export async function updateSignUp(description: { [key: string]: any }) {
  return request<any>('/dragon-api/sign-up', {
    method: 'PATCH',
    data: description,
  });
}

export async function delPlayer(description: { [key: string]: any }) {
  return request<any>('/dragon-api/player', {
    method: 'Delete',
    data: description,
  });
}
