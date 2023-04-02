import React from 'react';
import { Button, Card, List, Modal, Space, Table, Tag } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';
import { Label } from 'bizcharts';
import VerticalSpace from '@/components/VerticalSpace';

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
    time: '18:05',

    groupName: '男子组(12人龙舟)',
    content: '预赛第 2 组',
    teamNumber: 6,
    remark: '三轮之和，积分高者名列前次，若积分相等，以最好两轮成绩判定',
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
  {
    item: '100米直道',

    groupName: '男子组(22人龙舟)',
    content: '预赛第 2 组',
    teamNumber: 4,
    remark: '三轮之和，积分高者名列前次，若积分相等，以最好两轮成绩判定',
    time: '18:05',
  },
  {
    item: '100米直道',

    groupName: '男子组(12人龙舟)',
    content: '半决赛  1 组',
    teamNumber: 5,
    remark: '三轮之和，积分高者名列前次，若积分相等，以最好两轮成绩判定',
    time: '18:05',
  },
  {
    item: '100米直道',

    groupName: '女子组(22人龙舟)',
    content: '轮次赛第二轮',
    teamNumber: 5,
    remark: '三轮之和，积分高者名列前次，若积分相等，以最好两轮成绩判定',
    time: '18:05',
  },
  {
    item: '100米直道',

    groupName: '男子组(22人龙舟)',
    content: '半决赛 1 组',
    teamNumber: 5,
    remark: '可以编辑',
    time: '18:05',
  },
  {
    item: '100米直道',

    groupName: '男子组(12人龙舟)',
    content: '决赛 1 组',
    teamNumber: 6,
    remark: '可以编辑',
    time: '18:05',
  },

  {
    item: '100米直道',

    groupName: '女子组(22人龙舟)',
    content: '轮次赛 第三轮',
    teamNumber: 5,
    remark: '可以编辑',
    time: '18:05',
  },

  {
    item: '100米直道',

    groupName: '男子组(22人龙舟)',
    content: '小决赛 1 组',
    teamNumber: 2,
    remark: '可以编辑',
    time: '18:05',
  },
  {
    item: '100米直道',
    groupName: '男子组(22人龙舟)',
    content: '决赛 1 组',
    teamNumber: 6,
    remark: '可以编辑',
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
    title: '竞赛内容',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  },
];

function Index() {
  return (
    <PageContainer title="整体赛事时间安排">
      <Card>
        <VerticalSpace>
          <Button
            type="primary"
            onClick={() => {
              history.push('/competitor/create');
            }}
          >
            开始编排
          </Button>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
            bordered
            title={() => '2022 9-3 上午竞赛日程安排'}
            footer={() => (
              <div>
                <span>颁奖仪式</span>
              </div>
            )}
          />
        </VerticalSpace>
      </Card>
    </PageContainer>
  );
}

export default Index;
