import { useQuery } from '@/components/hooks/useQuery';
import { addFoul } from '@/services/ant-design-pro/foul';
import { getTimeline } from '@/services/ant-design-pro/timeline';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { Button, Card, Form, Input, InputNumber, Radio, Select, Timeline, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const App: React.FC = () => {
  const [form] = Form.useForm();

  const { initialState } = useModel('@@initialState');

  const query = useQuery();

  const { data: times = [] } = useRequest(() =>
    getTimeline({
      competition_id: query.competition_id,
      item_key: query.item_key,
    }),
  );

  const itemMap = times.map((item: any) => ({
    label: item.content_name,
    value: item.timeline_id,
  }));

  const [cur, setCur] = useState();
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    if (cur) {
      const timeLine = times.find((it: any) => (it.timeline_id = cur));
      setTeamList(timeLine.assign_list);
    }
  }, [cur]);
  const teamsMap = teamList.map((item: any) => ({
    label: item.team_name,
    value: item.team_id,
  }));

  const enter = async () => {
    const { timeline_id, team_id, desc, foul_type, path } = form.getFieldsValue();
    const data = times.find((it: any) => it.timeline_id === timeline_id);
    await addFoul({
      competition_id: data.competition_id,
      round_type: data.round_type,
      group_number: data.group_number,
      content_name: data.content_name,
      team_id,
      desc,
      path,
      foul_type,
      user_id: initialState?.currentUser?.user_id,
    });
    message.success('录入成功');
    form.resetFields();
  };

  return (
    <PageContainer title="犯规录入">
      <Card>
        <Form {...layout} form={form}>
          <Form.Item name="timeline_id">
            <Select
              options={itemMap}
              placeholder="请选择比赛内容"
              onChange={(timeline_id) => {
                setCur(timeline_id);
                form.setFieldValue('team_id', null);
              }}
            />
          </Form.Item>
          <Form.Item name="team_id">
            <Select options={teamsMap} placeholder="请选择参赛队伍" />
          </Form.Item>

          <Form.Item name="path">
            <Select
              options={[
                {
                  label: 1,
                  value: 1,
                },
                {
                  label: 2,
                  value: 2,
                },
                {
                  label: 3,
                  value: 3,
                },
                {
                  label: 4,
                  value: 4,
                },
                {
                  label: 5,
                  value: 5,
                },
                {
                  label: 6,
                  value: 6,
                },
              ]}
              placeholder="请选择赛道编号"
            />
          </Form.Item>
          <Form.Item name="foul_type">
            <Radio.Group>
              <Radio value={0}>黄牌</Radio>
              <Radio value={1}>红牌</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="qualifications">
            <Radio.Group defaultValue={1}>
              <Radio value={0}>取消资格</Radio>
              <Radio value={1}>保留资格</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="desc">
            <Input.TextArea placeholder="轻输入违规备注" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={enter}>
              录入
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default App;
