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
    dataIndex: 'desc',
    key: 'desc',
  },
];

function Index() {
  const { data = [] } = useRequest(getCompetitions);
  const queryData = useQuery();

  return (
    <PageContainer title={queryData.name + '成绩列表'}>
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
