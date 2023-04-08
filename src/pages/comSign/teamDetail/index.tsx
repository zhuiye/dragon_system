import { EditableProTable, ProColumns } from '@ant-design/pro-table';
import { nationsArray, postArray } from './nation';
import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { delPlayer, getPlayers, updatePlayers } from '@/services/ant-design-pro/player';
import { useQuery } from '@/components/hooks/useQuery';
import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Card, Tag } from 'antd';

type DataSourceType = {
  player_id: React.Key;
  state?: string;
  children?: DataSourceType[];
};
const colors = ['gold', '#f50', 'lime', 'green', 'blue', 'gray'];
const post_arr = ['领队', '教练', '鼓手', '舵手', '划手', '替补'];
export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const query = useQuery();

  const { data = [], run } = useRequest(async () => getPlayers({ team_id: query.team_id }));

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '姓名',
      dataIndex: 'player_name',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
    },
    {
      title: '头像',
      dataIndex: 'image_url',
      key: 'image_url',
      editable: false,
      render: (text: any) => {
        return <Avatar src={`http://localhost:3000${text}`}></Avatar>;
      },
    },

    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '性别',
      key: 'gender',
      dataIndex: 'gender',
      valueType: 'select',
      request: async () => [
        { label: '男', value: '男' },
        { label: '女', value: '女' },
      ],
    },
    {
      title: '民族',
      key: 'nationality',
      dataIndex: 'nationality',
      valueType: 'select',
      request: async () => nationsArray,
    },
    {
      title: '职位',
      key: 'post_id',
      dataIndex: 'post_id',
      valueType: 'select',
      render: (text: any, record: any) => (
        <Tag color={colors[record.post_id]}>
          {post_arr[text]}
          {text}
        </Tag>
      ),
      request: async () => postArray,
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

    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.player_id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={async () => {
            await delPlayer({ player_id: record.player_id });
            run();
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <PageContainer>
        <Card>
          <EditableProTable<DataSourceType>
            rowKey="player_id"
            headerTitle="我的队员"
            maxLength={5}
            scroll={{
              x: 960,
            }}
            recordCreatorProps={{
              position: 'top',
              record: () => ({ player_id: (Math.random() * 1000000).toFixed(0) }),
            }}
            loading={false}
            columns={columns}
            request={async () => ({
              data: data,
              total: data.length,
              success: true,
            })}
            value={data}
            onChange={setDataSource}
            editable={{
              type: 'multiple',
              editableKeys,
              onSave: async (rowKey, data, row) => {
                console.log(rowKey, data, row);

                delete data.index;
                await updatePlayers(data);

                run();
              },
              onChange: setEditableRowKeys,
            }}
          />
        </Card>
      </PageContainer>
    </>
  );
};
