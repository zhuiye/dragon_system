// 项目表
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Form, Input, Radio, Row, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import React, { useRef, useState } from 'react';
import ItemSortTable from './component/ItemSortTable';

const data: any[] = [
  {
    item_id: '1',
    item_name: '100米直道',
  },
];
const columns: ColumnsType<any> = [
  {
    title: '项目id',
    dataIndex: 'item_id',
    key: 'item_id',
  },
  {
    title: '项目名',
    dataIndex: 'item_name',
  },

  {
    title: '操作',
    key: 'action',
    render: (_, record) => <Button type="primary">删除</Button>,
  },
];

function Index() {
  const [form] = Form.useForm();

  const onFinishItem = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailedItem = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinishItemSort = () => {};

  const onFinishFailedItemSort = () => {};

  const itemSortTableRef = useRef<{ refresh: () => void }>();

  return (
    <PageContainer title="项目列表配置">
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Form
          layout="inline"
          form={form}
          onFinish={onFinishItem}
          onFinishFailed={onFinishFailedItem}
        >
          <Form.Item label="项目名">
            <Input name="item_name" placeholder="如:邀请赛,友谊赛 等" />
          </Form.Item>
          <Form.Item>
            <Button type="dashed" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </Form>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
        />

        <Form
          layout="inline"
          form={form}
          onFinish={onFinishItemSort}
          onFinishFailed={onFinishFailedItemSort}
        >
          <Form.Item label="子项目名">
            <Input name="sort_name" placeholder="如:22男女混合100米直道" />
          </Form.Item>

          <Form.Item label="人数">
            <Input name="count" type="number" min={6} placeholder="请输入比赛人数" />
          </Form.Item>
          <Form.Item label="性别">
            <Radio.Group name="gender" defaultValue={1}>
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
              <Radio value={2}>混合</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="dashed" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </Form>
        <ItemSortTable ref={itemSortTableRef as any} />
      </Space>
    </PageContainer>
  );
}

export default Index;
