import { EditableProTable, ProColumns } from '@ant-design/pro-table';
import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { delPlayer, getPlayers, updatePlayers } from '@/services/ant-design-pro/player';
import { useQuery } from '@/components/hooks/useQuery';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { getTimeline, updateTimeLine } from '@/services/ant-design-pro/timeline';
import moment from 'moment';
type DataSourceType = {
  timeline_id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  format_date: string;
  children?: DataSourceType[];
};

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const query = useQuery();

  const { data = [], run } = useRequest(async () =>
    getTimeline({ competition_id: query.competition_id }),
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '比赛内容',
      dataIndex: 'content_name',
      key: 'content_name',
      editable: false,
    },
    {
      title: '比赛时间',
      dataIndex: 'format_date',
      key: 'format_date',
      formItemProps: () => ({
        tooltip: '时间格式:xxxx-xx-xx 12:00',
      }),
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.timeline_id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  return (
    <>
      <PageContainer>
        <Card>
          <EditableProTable<DataSourceType>
            rowKey="timeline_id"
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
              onSave: async (rowKey, data: any, row) => {
                await updateTimeLine({
                  timeline_id: data.timeline_id,
                  date: Date.parse(data.format_date) / 1000,
                });

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
