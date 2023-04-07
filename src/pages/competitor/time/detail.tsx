import React, { useState } from 'react';
import { Button, Card, List, Modal, Space, Table, Tag, Typography, Form, Input, Radio } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';

import { useQuery } from '@/components/hooks/useQuery';
import { generateTimeLineSort, getTimeline } from '@/services/ant-design-pro/timeline';

const columns = [
  {
    title: '赛事名',
    dataIndex: 'content_name',
    key: 'content_name',
  },
  {
    title: '龙舟赛道数',
    dataIndex: 'race_track_number',
    key: 'race_track_number',
  },
  {
    title: '比赛开始时间',
    dataIndex: 'time',
    key: 'time',
    render: (time: any) => <Tag color="green">{time}</Tag>,
  },
];

function Index() {
  const query = useQuery();
  const { data = [] } = useRequest(() =>
    generateTimeLineSort({ competition_id: query.competition_id }),
  );
  return (
    <PageContainer>
      {data.map((item: any, index: any) => (
        <Card key={index}>
          <Typography.Title>{item.title}</Typography.Title>
          <Table
            dataSource={item.data}
            columns={columns}
            pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
            bordered
          />
        </Card>
      ))}
    </PageContainer>
  );
}

export default Index;
