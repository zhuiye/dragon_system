import { Button, Card, Form, Input, Radio, Row, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState, FC, useImperativeHandle, forwardRef } from 'react';
import { getCompetitionSort, ItemSort } from '@/services/ant-design-pro/competition';
import { useRequest } from 'ahooks';

const ItemSortTable = forwardRef<{ refresh: () => void }>((props, ref) => {
  const { data = [], error, loading, run } = useRequest(getCompetitionSort);

  useImperativeHandle(ref, () => ({
    refresh: run,
  }));

  // 重新加载应该怎么做的?

  const columns: ColumnsType<ItemSort> = [
    {
      title: '项目子类id',
      dataIndex: 'item_sort_id',
      key: 'item_sort_id',
    },
    {
      title: '项目名',
      dataIndex: 'item_sort',
    },
    {
      title: '项目参赛最大人数',
      dataIndex: 'player_number',
    },
    {
      title: '项目性别要求',
      dataIndex: 'gender',
    },

    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          danger
          type="primary"
          onClick={() => {
            run();
          }}
        >
          删除
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={data}
      loading={loading}
      columns={columns}
      pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
    />
  );
});

export default ItemSortTable;
