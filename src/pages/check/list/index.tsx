import React from 'react';
import { Table } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const dataSource = [
  {
    gNo: '1',
    name: '龙舟1',
    enterNumber: 32,
    start: '9:00',
    end: '结束时间',
    checkStatus: '未检录',
  },
];

const columns = [
  {
    title: '队伍编号',
    dataIndex: 'gNo',
    key: 'gNo',
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
  {
    title: '检录时间',
    dataIndex: 'start',
    key: 'start',
  },
  {
    title: '检录结束时间',
    dataIndex: 'end',
    key: 'end',
  },
  {
    title: '检录状态',
    dataIndex: 'checkStatus',
    key: 'checkStatus',
  },
  {
    title: '操作',
    dataIndex: 'checkStatus',
    key: 'checkStatus',
    render: (text: any) => <a>检录xxx</a>,
  },
];

function Index() {
  return (
    <PageContainer title="运动员比赛检录" content={<div>声明减员功能，删除哪位成员，哪位</div>}>
      <Table dataSource={dataSource} columns={columns} />;
    </PageContainer>
  );
}

export default Index;
