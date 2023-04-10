import React, { useState } from 'react';
import { Button, Card, List, Modal, Space, Table, Tag, Typography, Form, Input, Radio } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { getCompetitions, getCompetitionsDispatch } from '@/services/ant-design-pro/competition';
import { history } from 'umi';

const columns = [
  {
    title: '赛事名',
    dataIndex: 'name',
    key: 'name',
    onCell: (_: any, index: any) => {
      if (index % _.rowSpan === 0) {
        return { rowSpan: _.rowSpan };
      }

      return { rowSpan: 0 };
    },
  },
  {
    title: '内容',
    dataIndex: 'item_sort_link',
    key: 'item_sort_link',
    render: (data: any, record: any) => (
      <Tag color="green">
        {data.item_name} {data.sort_name}
      </Tag>
    ),
  },
  {
    title: '操作',
    dataIndex: 'a',
    key: 'a',
    render: (a: any, record: any) => (
      <Button
        type="primary"
        onClick={() => {
          history.push({
            pathname: '/check/list/detail',
            query: {
              item_key: record.item_key,
              competition_id: record.id,
            },
          });
        }}
      >
        检录
      </Button>
    ),
  },
];

function Index() {
  const { data = [] } = useRequest(getCompetitionsDispatch);
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
