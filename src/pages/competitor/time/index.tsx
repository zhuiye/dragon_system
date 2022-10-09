import React from 'react';
import { Button, Table } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const dataSource = [
  {
    competitorNo: '1',
    competitorName: '中华深圳8月龙舟',
    competitorRanger: '2022-7-8~2022-11-2',
  },
  {
    competitorNo: '2',
    competitorName: '中华深圳9月龙舟',
    competitorRanger: '2022-7-8~2022-11-2',
  },
  {
    competitorNo: '3',
    competitorName: '中华深圳10月龙舟',
    competitorRanger: '2022-7-8~2022-11-2',
  },
];

const columns = [
  {
    title: '赛事编号',
    dataIndex: 'competitorNo',
    key: 'competitorNo',
  },
  {
    title: '比赛名称',
    dataIndex: 'competitorName',
    key: 'competitorName',
  },
  {
    title: '比赛时间范围',
    dataIndex: 'competitorRanger',
    key: 'competitorRanger',
  },

  {
    title: '新增',
    dataIndex: 'checkStatus',
    key: 'checkStatus',
    render: (text: any) => (
      <div>
        <Button>查看详情</Button>
        <Button>编辑</Button>
      </div>
    ),
  },
];

function Index() {
  return (
    <PageContainer
      title="整体赛事时间安排"
      content={<div>此页面用于安排整体的赛事时间，用于因对突发的情况</div>}
    >
      <pre>
        功能设想: 时间:2 月 8 号 上午: 9:00-11:00 500男子米 <br />
        3:00-4:00 500环型比赛男子米 时间:2 月 9<br />
        号 上午: 9:00-11:00 10000男子米 3:00-4:00 500环型比赛女子米
        <br />
        <br />
        <b>
          功能设想，改变比赛时间的安排，已经进行过的比赛，不可以再调整时间了。功能设置，拖拽排序
          检录时间：等于
        </b>
      </pre>
      <Table dataSource={dataSource} columns={columns} />
      <div>//秩序册</div>
    </PageContainer>
  );
}

export default Index;
