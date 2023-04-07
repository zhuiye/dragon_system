import React, { useState } from 'react';
import { Button, Card, List, Modal, Space, Table, Tag, Typography, Form, Input, Radio } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { getCompetitions } from '@/services/ant-design-pro/competition';
import { history } from 'umi';
import { useQuery } from '@/components/hooks/useQuery';

const columns = [
  {
    title: '赛事名',
    dataIndex: 'name',
    key: 'item',
  },
  {
    title: '内容',
    dataIndex: 'item_sort_link',
    key: 'item_sort_link',
    render: (data: any) =>
      data.map((it: any) => (
        <Tag color="red">
          {it.item_name} {it.sort_name}
        </Tag>
      )),
  },

  {
    title: '设置赛制',
    dataIndex: 'remark',
    key: 'remark',
    render: (a: any, record: any) => {
      const query = {
        name: record.name,
        competition_id: record.id,
        item_sort_link: JSON.stringify(record.item_sort_link),
      };
      return (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              history.push({
                pathname: '/score/home/score',
                query,
              });
            }}
          >
            录入成绩
          </Button>
          <Button
            type="primary"
            onClick={() => {
              history.push({
                pathname: '/score/home/detail',
                query,
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
  const { data = [] } = useRequest(getCompetitions);
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
