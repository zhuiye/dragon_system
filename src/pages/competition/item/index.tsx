// 项目表
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Form, Input, Radio, Row, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  getCompetitionSort,
  getCompetitionItem,
  addCompetitionItem,
  deleteItem,
  addCompetitionSort,
  deleteSortItem,
} from '@/services/ant-design-pro/competition';

import React, { useRef, useState } from 'react';
import CostumeTable from './component/CostumeTable';

function useTableAndForm(api: any): [any, any, () => void] {
  const [form] = Form.useForm();
  const tableRef = useRef<{ refresh: () => void }>();

  const onFinishItem = async () => {
    await api(form.getFieldsValue());
    message.success('添加成功');
    tableRef.current?.refresh();
  };

  return [form, tableRef, onFinishItem];
}

function Index() {
  const [itemForm, itemTableRef, onFinishItem] = useTableAndForm(addCompetitionItem);
  const [itemSortForm, itemSortTableRef, onFinishItemSort] = useTableAndForm(addCompetitionSort);

  const onDel = async (record: any, tableRef: any, delApi: any) => {
    await delApi(record);
    message.success('删除成功');
    tableRef.current?.refresh();
  };

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
      dataIndex: 'item_id',
      render: (item_id) => (
        <Button
          type="link"
          onClick={() => {
            onDel({ item_id }, itemTableRef, deleteItem);
          }}
        >
          删除
        </Button>
      ),
    },
  ];

  const itemSortColumns: ColumnsType<any> = [
    {
      title: '项目子类id',
      dataIndex: 'sort_id',
      key: 'sort_id',
    },
    {
      title: '项目名',
      dataIndex: 'sort_name',
    },
    {
      title: '项目参赛最大人数',
      dataIndex: 'sort_number',
    },
    {
      title: '项目性别要求',
      dataIndex: 'sort_gender',
    },

    {
      title: '操作',
      key: 'action',
      dataIndex: 'sort_id',
      render: (sort_id) => (
        <Button
          type="link"
          onClick={async () => {
            onDel({ sort_id }, itemSortTableRef, deleteSortItem);
          }}
        >
          删除
        </Button>
      ),
    },
  ];

  return (
    <PageContainer title="项目列表配置">
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Form layout="inline" form={itemForm as any}>
          <Form.Item label="项目名" name="item_name">
            <Input placeholder="如:邀请赛,友谊赛 等" />
          </Form.Item>
          <Form.Item>
            <Button type="dashed" htmlType="submit" onClick={onFinishItem}>
              添加
            </Button>
          </Form.Item>
        </Form>
        <CostumeTable columns={columns} api={getCompetitionItem} ref={itemTableRef as any} />

        <Form layout="inline" form={itemSortForm}>
          <Form.Item label="子项目名" name="sort_name">
            <Input placeholder="如:22男女混合100米直道" />
          </Form.Item>

          <Form.Item label="人数" name="sort_number">
            <Input type="number" min={6} placeholder="请输入比赛人数" />
          </Form.Item>
          <Form.Item label="性别" name="sort_gender">
            <Radio.Group>
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
              <Radio value="男女混合">男女混合</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="dashed" htmlType="submit" onClick={onFinishItemSort}>
              添加
            </Button>
          </Form.Item>
        </Form>
        <CostumeTable
          columns={itemSortColumns}
          api={getCompetitionSort}
          ref={itemSortTableRef as any}
        />
      </Space>
    </PageContainer>
  );
}

export default Index;
