import React, { useState } from 'react';
import { Button, Card, List, Modal, Space, Table, Tag, Typography, Form, Input, Radio } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { history } from 'umi';
import { getSignUp } from '@/services/ant-design-pro/sign';

const statusArr = ['未审核', '已通过', '未通过'];
const statusColor = ['gray', 'green', 'red'];

const columns = [
  {
    title: '赛事名',
    dataIndex: 'competitions',
    key: 'competitions',
    render: (competitions: any) => {
      return <Typography.Text>{competitions?.name}</Typography.Text>;
    },
  },
  {
    title: '申请队伍',
    dataIndex: 'teams',
    key: 'teams',
    render: (items: any) => {
      return <Tag>{items?.team_name}</Tag>;
    },
  },
  {
    title: '内容',
    dataIndex: 'item_relation',
    key: 'item_relation',
    render: (data: any) =>
      data.map((it: any) => (
        <Tag>
          {it.item_name} {it.sort_name}
        </Tag>
      )),
  },
  {
    title: '审核状态',
    dataIndex: 'status',
    key: 'status',
    render: (data: any) => <Tag color={statusColor[data]}>{statusArr[data]}</Tag>,
  },

  {
    title: '操作',
    dataIndex: 'status',
    key: 'status',
    render: (a: any, record: any) => {
      const query = {
        sign_up_id: record.sign_up_id,
        item_relation: JSON.stringify(record.item_relation),
        reason: record.reason,
      };
      return (
        <Space>
          <Button
            disabled={record.status !== 0}
            type="primary"
            onClick={() => {
              history.push({
                pathname: '/review/home/detail',
                query,
              });
            }}
          >
            审核
          </Button>
          <Button
            type="primary"
            onClick={() => {
              history.push({
                pathname: '/review/home/detail',
                query: {
                  ...query,
                  isDetail: '1',
                },
              });
            }}
          >
            详情
          </Button>
        </Space>
      );
    },
  },
];

function Index() {
  const { data = [] } = useRequest(getSignUp);
  return (
    <PageContainer>
      <Card>
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
          bordered
        />
      </Card>
    </PageContainer>
  );
}

export default Index;
