import React from 'react';
import { Button, List, Modal, Space, Table, Tag, Typography, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const fakeData = [
  {
    title: '女子组(12人龙舟),200米直赛道,预赛7队，共2组',
    data: [
      { time: '20:00', groupNumber: 1, pathNo: '', teamName: '', score: '', rank: '', remark: '' },
      { time: '20:00', groupNumber: 1, pathNo: '', teamName: '', score: '', rank: '', remark: '' },
      { time: '20:00', groupNumber: 1, pathNo: '', teamName: '', score: '', rank: '', remark: '' },
      { time: '20:00', groupNumber: 1, pathNo: '', teamName: '', score: '', rank: '', remark: '' },
      { time: '20:05', groupNumber: 2, pathNo: '', teamName: '', score: '', rank: '', remark: '' },
      { time: '20:05', groupNumber: 2, pathNo: '', teamName: '', score: '', rank: '', remark: '' },
      { time: '20:05', groupNumber: 2, pathNo: '', teamName: '', score: '', rank: '', remark: '' },
      { time: '20:05', groupNumber: 2, pathNo: '', teamName: '', score: '', rank: '', remark: '' },
    ],
  },
  {
    title: '女子组(12人龙舟),200米直赛道,半决赛，共1组',
    data: [
      { time: '20:00', groupNumber: 1, pathNo: '', teamName: '', score: '', rank: '1', remark: '' },
      { time: '20:00', groupNumber: 1, pathNo: '', teamName: '', score: '', rank: '2', remark: '' },
      { time: '20:00', groupNumber: 1, pathNo: '', teamName: '', score: '', rank: '3', remark: '' },
      { time: '20:00', groupNumber: 1, pathNo: '', teamName: '', score: '', rank: '4', remark: '' },
    ],
  },
  {
    title: '女子组(12人龙舟),200米直赛道,决赛，共1组',
    data: [
      { time: '20:00', groupNumber: 1, pathNo: '', teamName: '', score: '', rank: '', remark: '' },
      { time: '20:00', groupNumber: 1, pathNo: '', teamName: '', score: '', rank: '', remark: '' },
      { time: '20:00', groupNumber: 1, pathNo: '', teamName: '', score: '', rank: '', remark: '' },
      { time: '20:00', groupNumber: 1, pathNo: '', teamName: '', score: '', rank: '', remark: '' },
    ],
  },
];

const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    onCell: (_: any, index: any) => {
      if (index % 4 === 0) {
        return { rowSpan: 4 };
      }

      return { rowSpan: 0 };
    },
  },
  {
    title: '组次',
    dataIndex: 'groupNumber',
    key: 'groupNumber',
    onCell: (_: any, index: any) => {
      if (index % 4 === 0) {
        return { rowSpan: 4 };
      }

      return { rowSpan: 0 };
    },
  },
  {
    title: '赛道',
    dataIndex: 'pathNo',
    key: 'pathNo',
    render: (initVal: any) => <Tag color="green">{initVal}</Tag>,
  },
  {
    title: '队名',
    dataIndex: 'teamName',
    key: 'teamName',
  },
  {
    title: '成绩',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '名次',
    dataIndex: 'rank',
    key: 'rank',
  },
];

function Index() {
  /*
        先把数据结构组合出来，
        1.  首先，先把本次比赛的所有的组合先排列出来，依次列在下方,那么
    */

  return (
    <PageContainer title="整体赛事时间安排" content={<div>此页面用于每轮比赛的赛道分配编排</div>}>
      {fakeData.map((item, index) => (
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
