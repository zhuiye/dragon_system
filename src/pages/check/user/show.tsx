import React, { useState } from 'react';
import { Avatar, Button, Card, List, Modal, Space, Table, Tag, Typography, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { history } from 'umi';
import VerticalSpace from '@/components/VerticalSpace';
import { getPlayerList, updateCheckStatus } from '@/services/ant-design-pro/check';
import { useQuery } from '@/components/hooks/useQuery';
const colors = ['gold', '#f50', 'lime', 'green', 'blue', 'gray'];
const post_arr = ['领队', '教练', '鼓手', '舵手', '划手', '替补'];
const columns = [
  {
    title: '姓名',
    dataIndex: 'player_name',
    key: 'player_name',
  },
  {
    title: '头像',
    dataIndex: 'image_url',
    key: 'image_url',
    render: (text: any) => <Avatar src={`http://localhost:3000${text}`} />,
  },

  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '性别',
    key: 'gender',
    dataIndex: 'gender',
  },
  {
    title: '民族',
    key: 'nationality',
    dataIndex: 'nationality',
  },
  {
    title: '职位',
    key: 'post_id',
    dataIndex: 'post_id',
    render: (text: any, record: any) => (
      <Tag color={colors[record.post_id]}>
        {post_arr[text]}
        {text}
      </Tag>
    ),
  },

  {
    title: '图像地址',
    dataIndex: 'image_url',
    key: 'image_url',
  },
  {
    title: '手机号码',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: '身份证号码',
    dataIndex: 'identify_number',
    key: 'identify_number',
  },
];

function Index() {
  const query = useQuery();
  const { down, players } = query;
  return (
    <PageContainer>
      <Card>
        <VerticalSpace>
          <Typography.Title> 已检录完成人员</Typography.Title>
          <Table
            rowKey="player_id"
            dataSource={JSON.parse(players)}
            columns={columns}
            pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
            bordered
          />
        </VerticalSpace>
      </Card>

      <Card>
        <VerticalSpace>
          <Typography.Title> 声明减员列表</Typography.Title>
          <Table
            rowKey="player_id"
            dataSource={JSON.parse(down)}
            columns={columns}
            pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
            bordered
          />
        </VerticalSpace>
      </Card>
    </PageContainer>
  );
}

export default Index;
