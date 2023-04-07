import React, { useState } from 'react';
import { Button, Card, List, Modal, Space, Table, Tag, Typography, Form, Input, Radio } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { getCompetitions } from '@/services/ant-design-pro/competition';
import { history } from 'umi';
import { useQuery } from '@/components/hooks/useQuery';
import { getScore } from '@/services/ant-design-pro/score';

function secondsToTime(seconds: number) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
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
    title: '分数',
    dataIndex: 'score',
    key: 'score',
    render: (text: any) => <Tag color="red">{secondsToTime(parseInt(text))}</Tag>,
  },
];

function Index() {
  const query = useQuery();

  const { data = [] } = useRequest(() => getScore({ competition_id: query.competition_id }));

  return (
    <PageContainer title={query.name + '成绩列表'}>
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
