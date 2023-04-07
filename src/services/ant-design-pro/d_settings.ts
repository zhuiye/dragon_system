import { request } from 'umi';

export async function getDSetting(options?: { [key: string]: any }) {
  return request<any[]>('/dragon-api/d-g-setting', {
    method: 'GET',
    params: options ?? {},
  }).then((res: any) => res.data);
}
