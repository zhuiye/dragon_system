// 编排演示页面
import React, { useState } from 'react';
import { Button, Card, Table, Tag, Input, Radio, Form, Select, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

import VerticalSpace from '@/components/VerticalSpace';
import generateSnakeGroup, { getRouteMap } from '../dispatch/matchAi';

const getItemByRank = (rank: number | any, data: any[]) => {
  for (const item of data) {
    if (item.no === rank) {
      return item;
    }
  }
  return [];
};

const mapOriginData = (data: any[], pathCount: number, groupCount: number) => {
  const groups = generateSnakeGroup([1, 2, 3, 4, 5, 6, 7, 8], groupCount);
  const newData = groups.map((items, index) => {
    return items.map((rank) => {
      return getItemByRank(rank, data);
    });
  });
  // 组内排名

  const stateTwo = newData.map((group) => {
    return group
      .sort((a, b) => b.score - a.score)
      .map((item, index) => {
        return {
          groupInnerRank: index + 1,
          ...item,
        };
      });
  });

  //matchRoute

  const stateThree = stateTwo.map((group) => {
    return group.map((item) => {
      return {
        ...item,
        path: getRouteMap(pathCount, item.groupInnerRank),
      };
    });
  });

  stateThree.forEach((item) => {
    item.sort((a: any, b: any) => a.path - b.path);
  });

  console.log(stateThree);

  return stateThree;
};

function Index() {
  const data: any = [];

  const [gData, setGData] = useState<undefined | Array<[]>>();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    setGData(mapOriginData(data, values.pathCount, values.groupCount) as any);
  };

  return (
    <PageContainer title="赛事后续的编排页面">
      <Card>
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="Title" name="title">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="预计分组数" name="groupCount">
            <Select
              options={[
                { label: 1, value: 1 },
                { label: 2, value: 2 },
                { label: 3, value: 3 },
                { label: 4, value: 4 },
                { label: 5, value: 5 },
                { label: 6, value: 6 },
                { label: 7, value: 7 },
                { label: 8, value: 8 },
                { label: 9, value: 9 },
              ]}
            />
          </Form.Item>
          <Form.Item label="龙舟赛道条数" name="pathCount">
            <Radio.Group>
              <Radio value={4}>4</Radio>
              <Radio value={6}>6</Radio>
              <Radio value={8}>8</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              编排
            </Button>
          </Form.Item>
        </Form>

        <VerticalSpace></VerticalSpace>
      </Card>
    </PageContainer>
  );
}

export default Index;
