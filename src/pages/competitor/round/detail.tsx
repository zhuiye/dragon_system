import React, { useState } from 'react';
import { Button, Card, List, Modal, Table, Tag, Form, Radio, message, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { getSignUpCount } from '@/services/ant-design-pro/sign';
import { getDSetting } from '@/services/ant-design-pro/d_settings';
import { useLocation } from 'umi';
import { generateTimeLine, getTimeline } from '@/services/ant-design-pro/timeline';

const columns = [
  {
    title: '比赛项目',
    dataIndex: 'content_name',
    key: 'content_name',
    render: (item: any) => {
      return <Tag color="green">{`${item} `}</Tag>;
    },
  },
  {
    title: '轮次类型',
    dataIndex: 'round_type',
    key: 'round_type',
    render: (text: any) => <Tag color="red">{getRoundMap(parseInt(text))}</Tag>,
  },
  {
    title: '组别',
    dataIndex: 'group_number',
    key: 'group_number',
    render: (text: any) => <Typography.Text>第{text}组</Typography.Text>,
  },
  {
    title: '开始时间',
    dataIndex: 'format_date',
    key: 'format_date',
  },

  {
    title: '龙舟道数',
    dataIndex: 'race_track_number',
    key: 'race_track_number',
  },
];

const getCount = (key: any, data: any[]) => {
  for (let item of data) {
    if (item.key == key) {
      return item.count;
    }
  }
};

const getItemSortLink = (key: any, data: any[]) => {
  for (let item of data) {
    if (item.key == key) {
      return { ...item, key };
    }
  }
  return {};
};

const getRoundMap = (key: any) => {
  const map = new Map();
  map.set(0, '初赛');
  map.set(1, '复赛');
  map.set(2, '半决赛');
  map.set(3, '小决赛');
  map.set(4, '排位赛');
  map.set(5, '决赛');

  return map.get(key);
};

function generateCompetitionData(data: any, res: any) {
  const result: any = [];
  const roundIds = ['preliminaries', 'replay', 'semifinal', 'small_final', 'qualifying', 'finals'];

  roundIds.forEach((roundId, index) => {
    if (data[roundId] === 0) {
      return;
    }

    const groupCount = data[roundId];
    for (let i = 1; i <= groupCount; i++) {
      let groupId = i;
      if (roundId === 'finals') {
        groupId = groupCount - i + 1;
      }

      result.push({
        competition_id: res.competition_id,
        round_type: index,
        group_number: groupId,
        time: 0,
        race_track_number: res.race_track_number,
        item_sort_link: JSON.stringify(getItemSortLink(res.currentKey, res.msgList)),
      });
    }
  });

  return result;
}

function Index() {
  const location: any = useLocation();

  const { data: msgList = [] } = useRequest(() =>
    getSignUpCount({ competition_id: location.query.competition_id }),
  );
  const { data = [], run } = useRequest(() =>
    getTimeline({ competition_id: location.query.competition_id }),
  );

  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);

  const [current, setCurrentKey] = useState('');

  const onOk = async () => {
    const team_count = getCount(current, msgList);

    const res = await getDSetting({ team_count, ...form.getFieldsValue() });

    const timeData = generateCompetitionData(res, {
      ...location.query,
      ...form.getFieldsValue(),
      currentKey: current,
      msgList,
    });

    await generateTimeLine({ data: timeData });

    message.success('生成成功');

    run();

    setVisible(false);
  };

  return (
    <PageContainer title="详情" content={<div>详情</div>}>
      <Card>
        <Modal
          title="请设置龙舟道数"
          visible={visible}
          onCancel={() => {
            setVisible(false);
          }}
          onOk={onOk}
        >
          <Form form={form}>
            <Form.Item label="龙舟道数" name="race_track_number">
              <Radio.Group>
                <Radio value={4}> 4 </Radio>
                <Radio value={6}> 6 </Radio>
                <Radio value={8}> 8 </Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
        <List
          itemLayout="horizontal"
          dataSource={msgList}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta
                title={`${item.item_name}  ${item.sort_name}`}
                description={
                  <div>
                    <Tag color="green">参赛队伍总数:{item.count}</Tag>
                  </div>
                }
              />
              <Button
                onClick={() => {
                  setCurrentKey(item.key);
                  setVisible(true);
                }}
              >
                生成
              </Button>
            </List.Item>
          )}
        />
      </Card>
      <Card>
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
          bordered
        />
      </Card>
    </PageContainer>
  );
}

export default Index;
