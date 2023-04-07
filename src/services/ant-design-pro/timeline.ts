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
export async function getTimeline(options?: { [key: string]: any }) {
  return request<any[]>('/dragon-api/timeline', {
    method: 'GET',
    params: options ?? {},
  }).then((res: any) => res.data);
}

export async function generateTimeLine(description: { [key: string]: any }) {
  return request('/dragon-api/timeline/generate', {
    method: 'POST',
    data: description,
  });
}

export async function generateTimeLineSort(options?: { [key: string]: any }) {
  return request<any[]>('/dragon-api/timeline/sort', {
    method: 'GET',
    params: options ?? {},
  }).then((res: any) => res.data);
}

export async function updateTimeLine(description: { [key: string]: any }) {
  return request<any>('/dragon-api/timeline', {
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
