import React, { useRef, useState } from 'react';
import { Button, message, Space, Table, Tag } from 'antd';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';
import { useRequest } from 'ahooks';
import { getSignUp } from '@/services/ant-design-pro/sign';

const columns: any = [
  {
    title: '赛事活动',
    dataIndex: 'competition_id',
    key: 'name',
  },

  {
    title: '内容说明',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: '审核状态',
    dataIndex: 'status',
    key: 'status',
    render: (status, entity) => (
      <Tag color={status ? 'green' : 'gray'}>{status ? '审核通过' : '未审核'}</Tag>
    ),
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
  const { data = [] } = useRequest(getSignUp);
  return <Table rowKey="key" columns={columns} dataSource={data} />;
}

export default ReviewTable;
