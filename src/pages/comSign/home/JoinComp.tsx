import React, { useRef, useState } from 'react';
import { Button, message, Space, Table, Tag } from 'antd';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';

import moment from 'moment';

const data = [
  {
    name: '七月开源龙舟大赛',
    content: '为了举办',
    sign_up_start_time: 1672568666,
    sign_up_end_time: 1672568666,
    start_time: 1672568666,
    end_time: 1672568666,
    status: true,
  },
  {
    name: '八月五谷丰登龙舟祭',
    content: '为了举办',
    sign_up_start_time: 1672568666,
    sign_up_end_time: 1672568666,
    start_time: 1672568666,
    end_time: 1672568666,
    status: 0,
  },
  {
    name: 'xxx活动赛事1',
    content: '为了举办',
    sign_up_start_time: 1672568666,
    sign_up_end_time: 1672568666,
    start_time: 1672568666,
    end_time: 1672568666,
    status: 1,
  },
];
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
    render: (status, _) => (
      <Button
        type="primary"
        disabled={status === 0}
        onClick={() => {
          history.push('/comSign/matchTeam');
        }}
      >
        报名
      </Button>
    ),
  },
];

function JoinComp() {
  return (
    <Table
      rowKey="key"
      // request={getCompetitions}
      columns={columns}
      dataSource={data}
    />
  );
}

export default JoinComp;
