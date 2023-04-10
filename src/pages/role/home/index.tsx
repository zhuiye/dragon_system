import React, { useState } from 'react';
import { Button, Card, List, Modal, Space, Table, Tag, Typography, Form, Input, Radio } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { useQuery } from '@/components/hooks/useQuery';
import { getCheckList } from '@/services/ant-design-pro/check';
import { history } from 'umi';
const checkStatus = ['未检录', '检录完成'];

function Index() {
  const query = useQuery();

  const { data = [] } = useRequest(() => getCheckList({ competition_id: query.competition_id }));
  const columns = [
    {
      title: '队伍名',
      dataIndex: 'team_name',
      key: 'team_name',
      render: (text: any) => <Tag>{text}</Tag>,
    },
    {
      title: '参赛队伍人数',
      dataIndex: 'team_count',
      key: 'team_count',
    },
    {
      title: '检录状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: any) => <Tag>{checkStatus[text]}</Tag>,
    },
    {
      title: '操作',
      dataIndex: 'team_count',
      key: 'team_count',
      render: (_: any, record: any) => {
        return (
          <Space>
            <Button
              disabled={record.status}
              type="primary"
              onClick={() => {
                history.push({
                  pathname: '/check/user/detail',
                  query: {
                    ...query,
                    team_id: record.team_id,
                    check_id: record.check_id,
                  },
                });
              }}
            >
              检录
            </Button>
            <Button
              disabled={!record.status}
              onClick={() => {
                history.push({
                  pathname: '/check/user/show',
                  query: {
                    down: record.down,
                    players: record.players,
                  },
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
  return (
    <PageContainer title={'检录列表'}>
      {}
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
