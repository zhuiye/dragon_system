import { request } from 'umi';

export async function updateCheckStatus(description: { [key: string]: any }) {
  return request<any>('/dragon-api/check-list', {
    method: 'PATCH',
    data: description,
  });
}

/** 获取检录列表*/
export async function getCheckList(options?: { [key: string]: any }) {
  return request<any[]>('/dragon-api/check-list', {
    method: 'GET',
    params: options ?? {},
  }).then((res: any) => res.data);
}
//添加检录
export async function addCheck(description: { [key: string]: any }) {
  return request('/dragon-api/check-list', {
    method: 'POST',
    data: description,
  });
}

//添加检录
export async function getPlayerList(options: { [key: string]: any }) {
  return request('/dragon-api/sign-up/players', {
    method: 'GET',
    params: options ?? {},
  }).then((res: any) => res.data);
}
