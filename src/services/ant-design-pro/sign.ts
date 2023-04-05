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

export async function postSignUp(description: { [key: string]: any }) {
  return request('/dragon-api/sign-up', {
    method: 'POST',
    data: description,
  });
}

export async function updatePlayers(description: { [key: string]: any }) {
  return request<Omit<any, 'team_id'>>('/dragon-api/player', {
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
