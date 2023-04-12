import { request } from 'umi';

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface UserRegisterParams {
  account: string;
  password: string;
  role_id: string;
}

export async function register(params: UserRegisterParams) {
  return request('/dragon-api/user', {
    method: 'POST',
    data: params,
  });
}
