import React, { useState } from 'react';
import { Button, Card, List, Modal, Space, Table, Tag, Typography, Form, Input, Radio } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { useQuery } from '@/components/hooks/useQuery';
import { getFoulList } from '@/services/ant-design-pro/foul';
const colors = ['yellow', 'red'];
const brand = ['黄牌', '红牌'];
const columns = [
  {
    title: '比赛内容',
    dataIndex: 'content_name',
    key: 'content_name',
  },
  {
    title: '队伍名',
    dataIndex: 'team',
    key: 'team',
    render: (text: any) => <Tag>{text?.team_name}</Tag>,
  },
  {
    title: '赛道编号',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: '犯规类型',
    dataIndex: 'foul_type',
    key: 'foul_type',
    render: (text: any) => <Tag color={colors[text]}>{brand[text]}</Tag>,
  },
  {
    title: '违规备注',
    dataIndex: 'desc',
    key: 'desc',
  },
];

function Index() {
  const query = useQuery();

  const { data = [] } = useRequest(() => getFoulList({ competition_id: query.competition_id }));

  return (
    <PageContainer title={'违规记录表'}>
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
