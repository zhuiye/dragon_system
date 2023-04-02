import React from 'react';
import { Button, List, Modal, Space, Table, Tag, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';

const dataSource = [
  {
    item: '100米直道',
    groupName: '女子组(12人龙舟)',
    content: '轮次赛第一轮',
    teamNumber: 6,
    remark: '三轮之和，积分高者名列前次，若积分相等，以最好两轮成绩判定',
    time: '18:05',
  },
  {
    item: '100米直道',
    groupName: '男子组(12人龙舟)',
    content: '预赛第1 组',
    teamNumber: 4,
    remark: '可以编辑修改的 ',
    time: '18:05',
  },

  {
    item: '100米直道',

    groupName: '女子组(22人龙舟)',
    content: '轮次赛第一轮',
    teamNumber: 6,
    remark: '三轮之和，积分高者名列前次，若积分相等，以最好两轮成绩判定',
    time: '18:05',
  },
  {
    item: '100米直道',

    groupName: '男子组(22人龙舟)',
    content: '预赛第1 组',
    teamNumber: 4,
    remark: '三轮之和，积分高者名列前次，若积分相等，以最好两轮成绩判定',
    time: '18:05',
  },
];

const columns = [
  {
    title: '项目',
    dataIndex: 'item',
    key: 'item',
  },
  {
    title: '组别',
    dataIndex: 'groupName',
    key: 'groupName',
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    render: (initVal: any) => <Tag color="green">{initVal}</Tag>,
  },

  {
    title: '详情',
    dataIndex: 'remark',
    key: 'remark',
    render: () => (
      <Button
        type="primary"
        onClick={() => {
          history.push('/competitor/dispatch/detail');
        }}
      >
        详情
      </Button>
    ),
  },
];

function Index() {
  return (
    <PageContainer title="整体赛事时间安排" content={<div>此页面用于每轮比赛的赛道分配编排</div>}>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
        bordered
      />
    </PageContainer>
  );
}

export default Index;
