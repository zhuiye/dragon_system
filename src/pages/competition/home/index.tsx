import React, { useRef, useState } from 'react';
import { Button, message, Space, Table } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormText,
  ProFormTextArea,
  ProFormDateRangePicker,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import {
  getCompetitions,
  addCompetition,
  Competition,
} from '@/services/ant-design-pro/competition';
import ProTable from '@ant-design/pro-table';
import dayjs from 'dayjs';
import moment from 'moment';
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
];

const handleAdd = async (fields: any) => {
  const hide = message.loading('正在添加');

  const { competition_time, sign_up_time, ...rest } = fields;

  const sign_up_start_time = moment(sign_up_time[0]).valueOf();
  const sign_up_end_time = moment(sign_up_time[1]).valueOf();
  const start_time = moment(competition_time[0]).valueOf();
  const end_time = moment(competition_time[1]).valueOf();

  try {
    await addCompetition({ ...rest, sign_up_start_time, sign_up_end_time, start_time, end_time });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

function Index() {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

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
