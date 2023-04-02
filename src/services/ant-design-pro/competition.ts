import { request } from 'umi';

export interface Competition {
  name: string;

  content: string;

  sign_up_start_time: number;

  sign_up_end_time: number;

  start_time: number;

  end_time: number;
}
/** 此处后端没有提供注释 GET /api/competition */
export async function getCompetitions(options?: { [key: string]: any }) {
  return request<Competition[]>('/dragon-api/competition', {
    method: 'GET',
    ...(options || {}),
  });
}

export interface ItemSort {
  item_sort_id: number;
  item_sort_name: string;
  gender: number;
  player_number: number;
}

/**获取项目子类列表 */
export async function getCompetitionSort(options?: { [key: string]: any }) {
  return request<ItemSort[]>('/dragon-api/competition', {
    method: 'GET',
    ...(options || {}),
  });
}

// /** 获取规则列表 GET /api/rule */
// export async function rule(
//   params: {
//     // query
//     /** 当前的页码 */
//     current?: number;
//     /** 页面的容量 */
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<API.RuleList>('/api/rule', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }

// /** 新建规则 PUT /api/rule */
// export async function updateRule(options?: { [key: string]: any }) {
//   return request<API.RuleListItem>('/api/rule', {
//     method: 'PUT',
//     ...(options || {}),
//   });
// }

/** 新建规则 POST /api/rule */
export async function addCompetition(description: { [key: string]: any }) {
  return request<Competition>('/dragon-api/competition', {
    method: 'POST',
    data: description,
  });
}

// /** 删除规则 DELETE /api/rule */
// export async function removeRule(options?: { [key: string]: any }) {
//   return request<Record<string, any>>('/api/rule', {
//     method: 'DELETE',
//     ...(options || {}),
//   });
// }
