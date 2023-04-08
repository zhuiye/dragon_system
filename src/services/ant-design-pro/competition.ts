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
    params: options || {},
  }).then((res: any) => res.data);
}
/** 此处后端没有提供注释 GET /api/competition */
export async function getCompetitionsDispatch(options?: { [key: string]: any }) {
  return request<Competition[]>('/dragon-api/competition/dispatch', {
    method: 'GET',
    params: options || {},
  }).then((res: any) => res.data);
}

export async function addCompetition(description: { [key: string]: any }) {
  return request<Competition>('/dragon-api/competition', {
    method: 'POST',
    data: description,
  });
}

export async function delCompetition(description: { [key: string]: any }) {
  return request<Competition>('/dragon-api/competition', {
    method: 'Delete',
    data: description,
  });
}

export async function updateCompetition(description: { [key: string]: any }) {
  return request<Competition>('/dragon-api/competition', {
    method: 'Patch',
    data: description,
  });
}

export interface ItemSort {
  sort_id: number;
  sort_name: string;
  sort_gender: number;
  sort_number: number;
}

/**获取项目子类列表 */
export async function getCompetitionSort(options?: { [key: string]: any }) {
  return request<ItemSort[]>('/dragon-api/item-sort', {
    method: 'GET',
    ...(options || {}),
  }).then((res: any) => res.data);
}

// 添加

export async function addCompetitionSort(options?: { [key: string]: any }) {
  return request<ItemSort[]>('/dragon-api/item-sort', {
    method: 'Post',
    data: options || {},
  }).then((res: any) => res.data);
}

// 删除
export async function deleteSortItem(options?: { [key: string]: any }) {
  return request<Item[]>('/dragon-api/item-sort', {
    method: 'Delete',
    data: options,
  }).then((res: any) => res.data);
}
interface Item {
  item_id: number;
  item_name: string;
}

/** 获取大类项目 */
export async function getCompetitionItem(options?: { [key: string]: any }) {
  return request<Item[]>('/dragon-api/competition-item', {
    method: 'GET',
    ...(options || {}),
  }).then((res: any) => res.data);
}

// 添加大类项目
export async function addCompetitionItem(options?: { [key: string]: any }) {
  return request<Item[]>('/dragon-api/competition-item', {
    method: 'Post',
    data: options || {},
  }).then((res: any) => res.data);
}

// 删除大类项目
export async function deleteItem(options?: { [key: string]: any }) {
  return request<Item[]>('/dragon-api/competition-item', {
    method: 'Delete',
    data: options,
  }).then((res: any) => res.data);
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

// /** 删除规则 DELETE /api/rule */
// export async function removeRule(options?: { [key: string]: any }) {
//   return request<Record<string, any>>('/api/rule', {
//     method: 'DELETE',
//     ...(options || {}),
//   });
// }
