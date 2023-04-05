import React, { useRef, useState } from 'react';
import { Button, message, Space, Table, Tag } from 'antd';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';

import moment from 'moment';
import { useRequest } from 'ahooks';
import { getCompetitions } from '@/services/ant-design-pro/competition';

const columns: any = [
  {
    title: '赛事活动',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '内容说明',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '比赛报名时间',
    dataIndex: 'sign_up_start_time',
    key: 'sign_up_start_time',
    render: (_time, entity) => (
      <Tag color="green">{moment(parseInt(_time as any)).format('YYYY-MM-DD HH:mm:ss')}</Tag>
    ),
  },
  {
    title: '比赛报名截至时间',
    dataIndex: 'sign_up_end_time',
    key: 'sign_up_end_time',
    render: (_time, entity) => (
      <Tag color="red">{moment(parseInt(_time as any)).format('YYYY-MM-DD HH:mm:ss')}</Tag>
    ),
  },

  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status, _) => (
      <Tag color={status === 0 ? 'gray' : 'green'}>{status === 0 ? '不可报名' : '可报名'}</Tag>
    ),
  },

  {
    title: '操作',
    dataIndex: 'status',
    key: 'status',
    render: (status, record: any) => (
      <Button
        type="primary"
        disabled={status === 0}
        onClick={() => {
          history.push({
            pathname: '/comSign/matchTeam',
            query: {
              item_sort_link: record.item_sort_link,
              competition_id: record.id,
            },
          });
        }}
      >
        报名
      </Button>
    ),
  },
];

function JoinComp() {
  const { data = [] } = useRequest(getCompetitions);
  return <Table rowKey="key" columns={columns} dataSource={data} />;
}

export default JoinComp;
