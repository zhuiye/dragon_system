import React from 'react';
import { Button, Checkbox, Table } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const dataSource = [
  {
    pathNo: '1',
    name: '龙舟1',
    enterNumber: 32,
  },
  {
    pathNo: '2',
    name: '龙舟2',
    enterNumber: 32,
  },
  {
    pathNo: '3',
    name: '龙舟2',
    enterNumber: 32,
  },
  {
    pathNo: '4',
    name: '龙舟2',
    enterNumber: 32,
  },
  {
    pathNo: '5',
    name: '龙舟2',
    enterNumber: 32,
  },
  {
    pathNo: '6',
    name: '龙舟2',
    enterNumber: 32,
  },
];

const columns = [
  {
    title: '赛道',
    dataIndex: 'pathNo',
    key: 'pathNo',
  },

  {
    title: '参赛队伍名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '参赛队伍人数',
    dataIndex: 'enterNumber',
    key: 'enterNumber',
  },
];

function Index() {
  return (
    <PageContainer
      title="分配-检录完成列表"
      content={
        <div>
          <Button title="分配">分配</Button>
          <p>点击分配按钮，随机赋予赛道</p>
        </div>
      }
    >
      <Table dataSource={dataSource} columns={columns} />;
    </PageContainer>
  );
}

export default Index;
