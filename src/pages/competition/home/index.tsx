import React, { useCallback, useRef, useState } from 'react';
import { Button, message, Select, Space, Table } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

import {
  getCompetitions,
  addCompetition,
  Competition,
  getCompetitionItem,
  getCompetitionSort,
  delCompetition,
} from '@/services/ant-design-pro/competition';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import useRequest from '@ahooksjs/use-request';

function getName(propName: string, returnPropName: string, id: any, data: any[]) {
  for (let item of data) {
    if (item[propName] == id) {
      return item[returnPropName];
    }
  }
  return '';
}
function Index() {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const { data: itemList = [] } = useRequest(getCompetitionItem);
  const { data: sortList = [] } = useRequest(getCompetitionSort);

  const [itemId, setItemId] = useState();
  const [sortId, setSortId] = useState();

  const [selectList, setList] = useState<any[]>([]);

  const del = (id: any) => {
    setList(selectList.filter((_, idx) => id === idx));
  };

  const columns: ProColumns<Competition>[] = [
    {
      title: '赛事活动',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '内容说明',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '举行项',
      dataIndex: 'item_sort_link',
      key: 'item_sort_link',
      render: (text: any) => {
        const obj = JSON.parse(text);

        console.log(obj);
        return obj.map((item: any, index: number) => {
          return <div key={index}> {item.item_name + '-----' + item.sort_name}</div>;
        });
      },
    },
    {
      title: '比赛报名时间',
      dataIndex: 'sign_up_start_time',
      key: 'sign_up_start_time',
      render: (_time, entity) => moment(parseInt(_time as any)).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '比赛报名截至时间',
      dataIndex: 'sign_up_end_time',
      key: 'sign_up_end_time',
      render: (_time, entity) => moment(parseInt(_time as any)).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '比赛开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
      render: (_time, entity) => moment(parseInt(_time as any)).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '比赛结束时间',
      dataIndex: 'end_time',
      key: 'end_time',
      render: (_time, entity) => moment(parseInt(_time as any)).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (id, entity) => {
        return (
          <Button
            onClick={async () => {
              await delCompetition({ id });
              message.success('添加成功');
              actionRef.current?.reload();
            }}
          >
            删除
          </Button>
        );
      },
    },
  ];

  const handleAdd = async (fields: any) => {
    const hide = message.loading('正在添加');

    const { competition_time, sign_up_time, ...rest } = fields;

    const sign_up_start_time = moment(sign_up_time[0]).valueOf();
    const sign_up_end_time = moment(sign_up_time[1]).valueOf();
    const start_time = moment(competition_time[0]).valueOf();
    const end_time = moment(competition_time[1]).valueOf();

    try {
      await addCompetition({
        ...rest,
        sign_up_start_time,
        sign_up_end_time,
        start_time,
        end_time,
        item_sort_link: JSON.stringify(selectList),
      });
      hide();
      message.success('Added successfully');
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
  };

  const add = useCallback(() => {
    setList([
      ...selectList,
      {
        item_id: itemId,
        item_name: getName('item_id', 'item_name', itemId, itemList),
        sort_name: getName('sort_id', 'sort_name', sortId, sortList),
        sort_id: sortId,
      },
    ]);
  }, [selectList, sortList, itemList, itemId, sortId]);
  return (
    <PageContainer>
      <ProTable<Competition, API.PageParams>
        rowKey="key"
        actionRef={actionRef}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 添加
          </Button>,
        ]}
        search={{
          labelWidth: 120,
        }}
        request={getCompetitions}
        columns={columns}
      />
      <ModalForm
        title={'添加组织赛事活动'}
        width="600px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: ' name is required',
            },
          ]}
          width="xl"
          name="name"
          label="赛事组织名"
          tooltip="最长50个字符"
          placeholder="请输入名称"
        />
        <Space size={24}>
          <Select
            style={{ width: '150px' }}
            onChange={(val: any) => {
              setItemId(val);
            }}
            placeholder="项目"
            value={itemId}
            options={itemList.map((item: any) => ({ label: item.item_name, value: item.item_id }))}
          />
          <Select
            style={{ width: '150px' }}
            onChange={(val: any) => {
              setSortId(val);
            }}
            value={sortId}
            placeholder="子项目"
            options={sortList.map((item: any) => ({ label: item.sort_name, value: item.sort_id }))}
          />
          <Button onClick={add} type="ghost">
            绑定项目(可多次添加)
          </Button>
        </Space>
        <div>
          {selectList.map((item: any, index) => {
            return (
              <div key={index}>
                <Space>
                  <span> {item.item_name + '----' + item.sort_name} </span>
                  <Button
                    onClick={() => {
                      del(index);
                    }}
                  >
                    -
                  </Button>
                </Space>
              </div>
            );
          })}
        </div>
        <div style={{ height: 8 }} />
        <ProFormTextArea
          width="xl"
          name="content"
          label="赛事详细内容"
          tooltip="不可为空"
          placeholder="请输入赛事详细内容"
        />
        <ProFormDateTimeRangePicker
          label="比赛报名开始时间~比赛报名截止时间"
          name="sign_up_time"
          initialValue={[moment('2015-01-01', 'YYYY-MM-DD'), moment('2015-01-01', 'YYYY-MM-DD')]}
        />
        <ProFormDateTimeRangePicker
          label="比赛开始时间~比赛结束时间"
          name="competition_time"
          initialValue={[moment('2015-01-01', 'YYYY-MM-DD'), moment('2015-01-01', 'YYYY-MM-DD')]}
        />
      </ModalForm>
    </PageContainer>
  );
}

export default Index;
