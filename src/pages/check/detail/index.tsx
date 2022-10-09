import React from 'react';
import { Checkbox, Table } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const dataSource = [
  {
    gNo: '1',
    registerNo: '202212223',
    name: '王玉',
    sex: '男',
    work: '队员',
    position: '鼓手',
  },
];
// 序号，注册号，姓名，性别，职务，位置，

const columns = [
  {
    title: '序号',
    dataIndex: 'gNo',
    key: 'gNo',
  },
  {
    title: '注册号',
    dataIndex: 'registerNo',
    key: 'registerNo',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
  },
  {
    title: '职务',
    dataIndex: 'work',
    key: 'work',
  },
  {
    title: '位置',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: '操作',
    dataIndex: 'checkStatus',
    key: 'checkStatus',
    render: (text: any) => <Checkbox checked />,
  },
];

function Index() {
  return (
    <PageContainer content="检录xxx队伍">
      <Table dataSource={dataSource} columns={columns} />;
    </PageContainer>
  );
}

export default Index;
