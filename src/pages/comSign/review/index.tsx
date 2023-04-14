import React, { useState } from 'react';
import { Button, Card, List, Modal, Space, Table, Tag, Typography, Form, Input, Radio } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { history } from 'umi';
import { getSignUp } from '@/services/ant-design-pro/sign';

const statusArr = ['未审核', '已通过', '未通过'];

const colors = ['gray', 'green', 'red'];

const columns = [
  {
    title: '赛事名',
    dataIndex: 'competitions',
    key: 'competitions',
    render: (competitions: any) => {
      return <Typography.Text>{competitions.name}</Typography.Text>;
    },
  },
  {
    title: '内容',
    dataIndex: 'item_relation',
    key: 'item_relation',
    render: (data: any) =>
      data.map((it: any) => (
        <Tag color="red">
          {it.item_name} {it.sort_name}
        </Tag>
      )),
  },
  {
    title: '审核状态',
    dataIndex: 'status',
    key: 'status',
    render: (status: any) => <Tag color={colors[status]}>{statusArr[status]}</Tag>,
  },

  {
    title: '操作',
    dataIndex: 'remark',
    key: 'remark',
    render: (a: any, record: any) => {
      const query = {
        sign_up_id: record.sign_up_id,
        item_relation: JSON.stringify(record.item_relation),
      };
      return (
        <Space>
          <Button
            disabled={record.status === 1}
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
        </Space>
      );
    },
  },
];

function Index() {
  const { data = [] } = useRequest(getSignUp);
  return (
    <PageContainer>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
        bordered
      />
    </PageContainer>
  );
}

export default Index;
