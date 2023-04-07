import React, { useState } from 'react';
import { Button, Card, List, Modal, Space, Table, Tag, Typography, Form, Input, Radio } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { getCompetitions } from '@/services/ant-design-pro/competition';
import { history } from 'umi';

const columns = [
  {
    title: '赛事名',
    dataIndex: 'name',
    key: 'item',
  },
  {
    title: '内容',
    dataIndex: 'desc',
    key: 'desc',
  },

  {
    title: '设置赛制',
    dataIndex: 'remark',
    key: 'remark',
    render: (a: any, record: any) => (
      <Button
        type="primary"
        onClick={() => {
          history.push({
            pathname: '/competitor/round/detail',
            query: { competition_id: record.id, item_sort_link: record.item_sort_link },
          });
        }}
      >
        设置赛制
      </Button>
    ),
  },
];

function Index() {
  const { data = [] } = useRequest(getCompetitions);

  return (
    <PageContainer
      title="赛制设置"
      content={<div>设置赛制 说明: 从报名表中得到 报名队伍数，然后选择相应的赛制</div>}
    >
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
