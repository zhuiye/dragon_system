import React, { useState } from 'react';
import { Button, Popconfirm, Space, Table, Tag, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { history } from 'umi';
import { getScore, updateScore } from '@/services/ant-design-pro/score';
import UpdateScoreModal from './UpdateScoreModal';

function secondsToTime(seconds: number) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

const colors = ['gray', 'green'];

function Index() {
  const { data = [], refresh } = useRequest(getScore);

  const confirm = async (record: any) => {
    await updateScore({
      score_id: record.score_id,
      is_confirm: 1,
    });
    refresh();
  };

  const columns = [
    {
      title: '内容',
      dataIndex: 'content_name',
      key: 'content_name',
    },
    {
      title: '参赛队伍',
      dataIndex: 'team',
      key: 'team',
      render: (team: any) => <Tag>{team.team_name}</Tag>,
    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
      render: (text: any) => <span>{secondsToTime(parseInt(text))}</span>,
    },
    {
      title: '状态',
      dataIndex: 'is_confirm',
      key: 'is_confirm',
      render: (text: any) => <Tag color={colors[text]}>{text === 0 ? '待确认' : '已确认'}</Tag>,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (a: any, record: any) => (
        <Space>
          <Popconfirm
            title="确定确认成绩"
            onConfirm={() => confirm(record)}
            onCancel={() => {}}
            okText="确认"
            cancelText="取消"
          >
            <Button
              disabled={record.is_confirm}
              type="primary"
              onClick={() => {
                history.push({
                  pathname: '/score/confirm/list',
                  query: {
                    item_key: record.item_key,
                    competition_id: record.competition_id,
                  },
                });
              }}
            >
              确认
            </Button>
          </Popconfirm>

          <Button
            disabled={record.is_confirm}
            onClick={() => {
              setRecord(record);
              setVisible(true);
            }}
          >
            修改成绩
          </Button>
        </Space>
      ),
    },
  ];

  const [visible, setVisible] = useState(false);

  const [record, setRecord] = useState<any>();

  return (
    <PageContainer>
      <UpdateScoreModal
        record={record}
        visible={visible}
        setModalVisit={() => {
          setVisible(false);
        }}
        onFinish={async (values: any) => {
          await updateScore({
            score_id: record?.score_id,
            score: parseInt(values.score),
          });
          message.success('修改成功');
          setVisible(false);
          refresh();
        }}
      />
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
        bordered
      />
    </PageContainer>
  );
}

export default Index;
