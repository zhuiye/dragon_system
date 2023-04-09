import { request } from 'umi';

export async function getFoulList(options?: { [key: string]: any }) {
  return request<any[]>('/dragon-api/foul', {
    method: 'GET',
    params: options ?? {},
  }).then((res: any) => res.data);
}

export async function addFoul(description: { [key: string]: any }) {
  return request('/dragon-api/foul', {
    method: 'POST',
    data: description,
  });
}
