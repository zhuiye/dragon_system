import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/competition */
export async function getScore(options?: { [key: string]: any }) {
  return request<any[]>('/dragon-api/score', {
    method: 'GET',
    params: options ?? {},
  }).then((res: any) => res.data);
}

export async function getPreScore(options?: { [key: string]: any }) {
  return request<any[]>('/dragon-api/score/semifinal', {
    method: 'GET',
    params: options ?? {},
  }).then((res: any) => res.data);
}

export async function addScore(description: { [key: string]: any }) {
  return request('/dragon-api/score', {
    method: 'POST',
    data: description,
  });
}
// 更新状态
export async function updateScore(description: { [key: string]: any }) {
  return request<Omit<any, 'team_id'>>('/dragon-api/score', {
    method: 'PATCH',
    data: description,
  });
}
