import React, { useState } from 'react';
import { Button, Card, List, Modal, Space, Table, Tag, Typography, Form, Input, Radio } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { useQuery } from '@/components/hooks/useQuery';
import { generateTimeLineSort } from '@/services/ant-design-pro/timeline';
import { history } from 'umi';
import { checkDate } from '../ultis';
import { addCheck, getCheckList } from '@/services/ant-design-pro/check';

const statusText = ['未开始', '进行中', '已结束'];
const statusColors = ['gray', 'red', 'green'];
function Index() {
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
    {
      title: '检录状态',
      dataIndex: 'date',
      key: 'date',
      render: (date: any) => (
        <Tag color={statusColors[checkDate(parseInt(date) * 1000)]}>
          {statusText[checkDate(parseInt(date) * 1000)]}
        </Tag>
      ),
    },
    {
      title: '检录状态',
      dataIndex: 'date',
      key: 'date',
      render: (date: any, record: any) => {
        const queryP = {
          competition_id: query.competition_id,
          item_key: record.item_key,
          round_type: record.round_type,
          group_number: record.group_number,
        };
        return (
          <Button
            type="primary"
            disabled={checkDate(parseInt(date) * 1000) !== 1}
            onClick={async () => {
              const data = await getCheckList(queryP);
              if (data.length === 0) {
                await generateCheckList(record);
              }
              history.push({
                pathname: '/check/user',
                query: queryP,
              });
            }}
          >
            开始检录
          </Button>
        );
      },
    },
  ];
  const query = useQuery();
  const { data = [] } = useRequest(() =>
    generateTimeLineSort({ competition_id: query.competition_id, item_key: query.item_key }),
  );

  const generateCheckList = async (record: any) => {
    const assignList = record.assign_list;

    const mapData = assignList.map((item: any) => ({
      ...item,
      competition_id: query.competition_id,
      item_key: query.item_key,
      round_type: record.round_type,
      group_number: record.group_number,
      status: 0,
      down: null,
    }));
    await addCheck({ data: mapData });
  };

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
