import React, { useRef, useState } from 'react';
import { Button, Form, message, Modal, Select, Space, Table, Tag } from 'antd';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';

import moment from 'moment';
import { useRequest } from 'ahooks';
import { getCompetitions } from '@/services/ant-design-pro/competition';
import { getTeams } from '@/services/ant-design-pro/team';

function JoinComp() {
  const { data = [] } = useRequest(getCompetitions);

  const [isVisible, setVisible] = useState(false);

  const columns: any = [
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
      render: (_time: any) => (
        <Tag color="green">{moment(parseInt(_time as any)).format('YYYY-MM-DD HH:mm:ss')}</Tag>
      ),
    },
    {
      title: '比赛报名截至时间',
      dataIndex: 'sign_up_end_time',
      key: 'sign_up_end_time',
      render: (_time: any) => (
        <Tag color="red">{moment(parseInt(_time as any)).format('YYYY-MM-DD HH:mm:ss')}</Tag>
      ),
    },

    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => (
        <Tag color={status === 0 ? 'gray' : 'green'}>{status === 0 ? '不可报名' : '可报名'}</Tag>
      ),
    },

    {
      title: '操作',
      dataIndex: 'status',
      key: 'status',
      render: (status: any, record: any) => (
        <Button
          type="primary"
          disabled={status === 0}
          onClick={() => {
            setVisible(true);
            setRecord(record);
          }}
        >
          报名
        </Button>
      ),
    },
  ];

  const [record, setRecord] = useState<any>();

  const { data: teamList = [] } = useRequest(getTeams);

  const [form] = Form.useForm();

  return (
    <>
      <Modal
        title="选择队伍"
        visible={isVisible}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
          history.push({
            pathname: '/comSign/matchTeam',
            query: {
              item_sort_link: JSON.stringify(record.item_sort_link),
              competition_id: record.id,
              ...form.getFieldsValue(),
            },
          });
        }}
      >
        <Form form={form}>
          <Form.Item name="team_id">
            <Select
              style={{ width: '100%' }}
              placeholder="选择队伍"
              options={teamList.map((item: any) => ({
                label: item.team_name,
                value: item.team_id,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Table rowKey="key" columns={columns} dataSource={data} />
    </>
  );
}

export default JoinComp;
