import React from 'react';
import { Button, Card, Space, DatePicker, Select, Form, Input, TimePicker, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { DatePickerProps } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function nextTime(timeString: string, interval: number, count: number): string {
  // 将时间字符串分离成小时和分钟部分
  const [hoursStr, minutesStr] = timeString.split(':');
  const hours = parseInt(hoursStr);
  const minutes = parseInt(minutesStr);

  // 计算总分钟数
  const totalMinutes = hours * 60 + minutes;

  // 加上时间间隔和计数器中的分钟数
  const newTotalMinutes = totalMinutes + interval * count;

  // 将分钟数转换回小时和分钟部分
  const newHours = Math.floor(newTotalMinutes / 60);
  const newMinutes = newTotalMinutes % 60;

  // 将新时间格式化成字符串
  const formattedHours = newHours.toString().padStart(2, '0');
  const formattedMinutes = newMinutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}

interface DFormProp {
  title: string;
  timeSpan: string;
}
const DForm: React.FC<DFormProp> = ({ title, timeSpan }) => {
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  return (
    <Card>
      <Typography.Title>{title}竞赛日程安排</Typography.Title>
      <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
        <Form.List name={title}>
          {(fields, { add, remove }) => {
            console.log(fields);

            return (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space size={48} key={key}>
                    <Form.Item label="组名">
                      <Select value={5}>
                        <Select.Option value={5}>22男子龙舟组</Select.Option>
                        <Select.Option value={7}>12人女子龙舟组</Select.Option>
                        <Select.Option value={9}>12人龙舟组</Select.Option>
                        <Select.Option value={11}>12人龙舟组</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="竞赛内容">
                      <Select value={5}>
                        <Select.Option value={5}>轮次赛第一组</Select.Option>
                        <Select.Option value={7}>初赛第一组</Select.Option>
                        <Select.Option value={9}>决赛第一组</Select.Option>
                        <Select.Option value={11}>决赛第二轮</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="开始时间">
                      <Input placeholder="日期格式：(如：13:00)" />
                    </Form.Item>
                    <div style={{ marginTop: -22 }}>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </div>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  ></Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </Form>
    </Card>
  );
};

function Index() {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const add = () => {};
  const fD = [
    {
      title: '2019-5-12',
      timeSpan: '',
    },
  ];
  return (
    <PageContainer title="添加页面" content={<div>先选定时间</div>}>
      <Card>
        <Space>
          <Form layout="inline">
            <Form.Item label="比赛日期" name="layout">
              <DatePicker picker="date" onChange={onChange} />
            </Form.Item>
            <Form.Item label="比赛时间间隔">
              <Select value={5}>
                <Select.Option value={5}>5分钟</Select.Option>
                <Select.Option value={7}>7分钟</Select.Option>
                <Select.Option value={9}>9分钟</Select.Option>
                <Select.Option value={11}>11分钟</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="dashed" onClick={add}>
                添加
              </Button>
            </Form.Item>
            <Button type="primary">提交保存</Button>
          </Form>
        </Space>
      </Card>
      {fD.map(({ timeSpan, title }, index) => (
        <DForm timeSpan={timeSpan} title={title} key={index} />
      ))}
    </PageContainer>
  );
}

export default Index;
