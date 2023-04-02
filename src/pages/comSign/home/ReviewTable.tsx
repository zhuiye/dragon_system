import React, { useRef, useState } from 'react';
import { Button, message, Space, Table, Tag } from 'antd';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';

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
    status: true,
  },
  {
    name: 'xxx活动赛事1',
    content: '为了举办',
    sign_up_start_time: 1672568666,
    sign_up_end_time: 1672568666,
    start_time: 1672568666,
    end_time: 1672568666,
    status: true,
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
    title: '审核状态',
    dataIndex: 'status',
    key: 'status',
    render: (_time, entity) => <Tag color="green">审核通过</Tag>,
  },
  {
    title: '操作',
    dataIndex: 'status',
    key: 'status',
    render: () => (
      <Space>
        <Button
          type="primary"
          onClick={() => {
            history.push('/comSign/review');
          }}
        >
          详情
        </Button>
        <Button
          type="primary"
          title="注：编辑后，审核状态将重新变更为未审核"
          onClick={() => {
            history.push('/comSign/matchTeam');
          }}
        >
          编辑
        </Button>
      </Space>
    ),
  },
];

function ReviewTable() {
  return <Table rowKey="key" columns={columns} dataSource={data} />;
}

export default ReviewTable;
