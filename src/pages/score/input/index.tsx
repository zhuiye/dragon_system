import { useQuery } from '@/components/hooks/useQuery';
import { addScore } from '@/services/ant-design-pro/score';
import { getSignUpCountTeams } from '@/services/ant-design-pro/sign';
import { getTimeline } from '@/services/ant-design-pro/timeline';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { Button, Card, Form, Input, InputNumber, Select, Timeline, message } from 'antd';
import React from 'react';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

/* eslint-enable no-template-curly-in-string */

const App: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };

  const query = useQuery();

  //
  const { data: times = [] } = useRequest(() =>
    getTimeline({
      competition_id: query.competition_id,
    }),
  );
  const { data: teams = [] } = useRequest(() =>
    getSignUpCountTeams({
      competition_id: query.competition_id,
    }),
  );

  const itemMap = times.map((item: any) => ({
    label: item.content_name,
    value: item.timeline_id,
  }));

  const teamsMap = teams.map((item: any) => ({
    label: item.team_name,
    value: item.team_id,
  }));

  const enter = async () => {
    const { timeline_id, team_id, score } = form.getFieldsValue();
    const data = times.find((it: any) => it.timeline_id === timeline_id);
    await addScore({
      competition_id: data.competition_id,
      round_type: data.round_type,
      group_number: data.group_number,
      content_name: data.content_name,
      team_id,
      score: parseInt(score),
    });
    message.success('录入成功');
    form.resetFields();
  };

  return (
    <PageContainer title="成绩录入">
      <Card>
        <Form {...layout} form={form}>
          <Form.Item name="timeline_id">
            <Select options={itemMap} placeholder="请选择比赛内容" />
          </Form.Item>
          <Form.Item name="team_id">
            <Select options={teamsMap} placeholder="请选择参赛队伍" />
          </Form.Item>
          <Form.Item name="score">
            <Input placeholder="请输入成绩" addonAfter="S" />
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
