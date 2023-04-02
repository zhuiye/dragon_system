import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Card,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const { TextArea } = Input;

import type { DatePickerProps } from 'antd';
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function Index() {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <PageContainer
      title="成绩录入页面"
      content={
        <pre>
          CREATE TABLE IF NOT EXISTS `competition_score`( `competition_id` int ,
          `competition_item_id` INT UNSIGNED, `competition_item_inner_id` INT, `team_id` INT
          UNSIGNED, `track_no` INT UNSIGNED # 1,2,3,4,5,6,7,8 `competition_round_type` INT, # 0
          预赛，1 复赛，2半决，3排位赛，4小半决，5 决赛 `competition_round_number` INT, // 第几组
          `score` INT, `submit_time` BIGINT, PRIMARY KEY ( `player_id` ) )ENGINE=InnoDB DEFAULT
          CHARSET=utf8;
        </pre>
      }
    >
      <Card>
        <Form>
          <Form.Item label="比赛名">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="项目名">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="团队名">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="轮次">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="组号">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="输入成绩">
            <Input />
          </Form.Item>

          <Button type="primary">Button</Button>
        </Form>
      </Card>
    </PageContainer>
  );
}

export default Index;
