import React, { useState } from 'react';
import { Card, Table, Tag, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { useQuery } from '@/components/hooks/useQuery';
import { getScore, getScoreGroup } from '@/services/ant-design-pro/score';
import VerticalSpace from '@/components/VerticalSpace';

function secondsToTime(seconds: number) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

const colors = ['gold', '#f50', '#2db7f5', 'gray', 'gray', 'gray'];
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
    render: (text: any) => <Tag>{text.team_name}</Tag>,
  },
  {
    title: '时间',
    dataIndex: 'score',
    key: 'score',
    render: (text: any) => <span>{secondsToTime(parseInt(text))}</span>,
  },
  {
    title: '排名',
    dataIndex: 'no',
    key: 'no',
    render: (text: any) => <Tag color={colors[text]}>{text}</Tag>,
  },
];

function Index() {
  const query = useQuery();

  const { data = [] } = useRequest(() =>
    getScoreGroup({ competition_id: query.competition_id, item_key: query.item_key }),
  );

  return (
    <PageContainer title={'成绩列表'}>
      {data.map((it: any, key: number) => (
        <Card key={key}>
          <VerticalSpace>
            <Typography.Title>{it.content_name}</Typography.Title>
            <Table
              dataSource={it.data}
              columns={columns}
              pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
              bordered
            />
          </VerticalSpace>
        </Card>
      ))}
    </PageContainer>
  );
}

export default Index;
