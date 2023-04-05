import { request } from 'umi';

export interface Player {
  team_id: number;
  team_name: number;

  desc: string;

  last_score: number;

  user_id: number;

  is_seed: number;
}
/** 此处后端没有提供注释 GET /api/competition */
export async function getPlayers(options?: { [key: string]: any }) {
  return request<any[]>('/dragon-api/player', {
    method: 'GET',
    params: options ?? {},
  }).then((res: any) => res.data);
}

export async function importPlayers(description: { [key: string]: any }) {
  return request('/dragon-api/player/import', {
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
