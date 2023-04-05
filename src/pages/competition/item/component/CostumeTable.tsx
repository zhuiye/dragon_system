import { Button, Card, Form, Input, Radio, Row, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState, FC, useImperativeHandle, forwardRef } from 'react';
import { useRequest } from 'ahooks';

interface CostumeTableProps {
  columns: ColumnsType<any>;
  api: () => any;
}
const CostumeTable = forwardRef<{ refresh: () => void }, CostumeTableProps>(
  ({ columns, api }, ref) => {
    const { data = [], error, loading, run } = useRequest(api);
    useImperativeHandle(ref, () => ({
      refresh: run,
    }));

    return (
      <Table
        dataSource={data}
        loading={loading}
        columns={columns}
        pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
      />
    );
  },
);

export default CostumeTable;
