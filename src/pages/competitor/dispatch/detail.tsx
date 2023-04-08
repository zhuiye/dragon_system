import React from 'react';
import { Button, List, Modal, Space, Table, Tag, Typography, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { generateTimeLineAssign } from '@/services/ant-design-pro/timeline';
import { useQuery } from '@/components/hooks/useQuery';
import { randomAssign } from './matchAi';
const columns: any = [
  {
    title: '时间',
    dataIndex: 'format_date',
    key: 'format_date',
    onCell: (_: any, index: any) => {
      if (index % _.race_track_number === 0) {
        return { rowSpan: _.race_track_number };
      }

      return { rowSpan: 0 };
    },
  },
  {
    title: '组次',
    dataIndex: 'group_number',
    key: 'group_number',
    onCell: (_: any, index: any) => {
      if (index % _.race_track_number === 0) {
        return { rowSpan: 4 };
      }

      return { rowSpan: 0 };
    },
  },
  {
    title: '赛道',
    dataIndex: 'path',
    key: 'path',
    render: (initVal: any) => <Tag color="green">{initVal}</Tag>,
  },
  {
    title: '队名',
    dataIndex: 'team_name',
    key: 'team_name',
  },
];

function Index() {
  const query = useQuery();

  const { data = [] } = useRequest(() =>
    generateTimeLineAssign({
      item_key: query.item_key,
    }),
  );

  const assignPreliminaries = () => {
    // randomAssign([],2,2)
  };
  const assign = (item: any) => {};

  return (
    <PageContainer title="整体赛事时间安排" content={<div>此页面用于每轮比赛的赛道分配编排</div>}>
      {data.map((item: any, index: any) => (
        <Card key={index}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography.Title>{item.title}</Typography.Title>
            <Button
              type="primary"
              onClick={() => {
                assign(item);
              }}
            >
              分配
            </Button>
          </div>

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
