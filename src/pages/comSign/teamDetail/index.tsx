import { EditableProTable, ProColumns } from '@ant-design/pro-table';
import { nationsArray } from './nation';
import React, { useState } from 'react';
import { useLocation, useParams } from 'umi';
import { useRequest } from 'ahooks';
import { delPlayer, getPlayers, updatePlayers } from '@/services/ant-design-pro/player';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  player_id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '活动名称一',
    readonly: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '1590486176000',
    update_at: '1590486176000',
  },
  {
    id: 624691229,
    title: '活动名称二',
    readonly: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: '1590481162000',
    update_at: '1590481162000',
  },
];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const location = useLocation<any>();

  const { team_id } = location.query;

  const { data = [], run } = useRequest(async () => getPlayers({ team_id }));

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '姓名',
      dataIndex: 'player_name',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
      width: '15%',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: '15%',
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
      editable: true,
    },

    {
      title: '操作',
      valueType: 'option',
      width: 200,
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
      <EditableProTable<DataSourceType>
        rowKey="player_id"
        headerTitle="我的队员"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={false}
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
            // 更新表哥
            // await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};
