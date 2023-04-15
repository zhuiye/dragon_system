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
      return <Typography.Text>{competitions?.name}</Typography.Text>;
    },
  },
  {
    title: '内容',
    dataIndex: 'item_relation',
    key: 'item_relation',
    render: (data: any) =>
      data.map((it: any) => (
        <Tag color="gray">
          {it.item_name} {it.sort_name}
        </Tag>
      )),
  },
  {
    title: '报名队伍',
    dataIndex: 'teams',
    key: 'teams',
    render: (data: any) => <span>{data?.team_name}</span>,
  },
  {
    title: '审核状态',
    dataIndex: 'status',
    key: 'status',
    render: (status: any) => <Tag color={colors[status]}>{statusArr[status]}</Tag>,
  },

  {
    title: '操作',
    dataIndex: 'status',
    key: 'status',
    render: (status: any, record: any) => {
      const query = {
        sign_up_id: record.sign_up_id,
        item_sort_link: JSON.stringify(record.item_relation),
        team_id: record.team_id,
        reason: record.reason,
      };
      return (
        <Space>
          <Button
            type="link"
            onClick={() => {
              history.push({
                pathname: '/comSign/review/detail',
                query: {
                  ...query,
                  detail: '1',
                },
              });
            }}
          >
            详情
          </Button>
          {status === 2 && (
            <Button
              type="link"
              onClick={() => {
                history.push({
                  pathname: '/comSign/review/update',
                  query: {
                    // item_sort_link:record.i
                    ...query,
                    detail: '1',
                  },
                });
              }}
            >
              修改
            </Button>
          )}
        </Space>
      );
    },
  },
];

function Index() {
  const { data = [] } = useRequest(getSignUp);
  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
      bordered
    />
  );
}

export default Index;
