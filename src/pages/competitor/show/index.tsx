// 编排演示页面
import React, { useState } from 'react';
import {
  Button,
  Card,
  List,
  Table,
  Tag,
  Avatar,
  Input,
  Radio,
  Form,
  Select,
  Typography,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

import VerticalSpace from '@/components/VerticalSpace';
import generateSnakeGroup, { getRouteMap } from './matchAi';

const matchColor = (key: number) => {
  const map = new Map();
  map.set(1, '#f50');
  map.set(2, '#2db7f5');
  map.set(3, '#87d068');
  return map.get(key) ?? 'gray';
};

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
  // getRouteMap()
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
        routeNo: getRouteMap(pathCount, item.groupInnerRank),
      };
    });
  });

  // 填充漏的赛道

  for (let pathNo = 1; pathNo <= pathCount; pathNo++) {
    stateThree.forEach((item) => {
      const unOccupation = item.every((it) => it.routeNo !== pathNo);
      // console.log(pathNo, unOccupation);
      if (unOccupation) {
        item.push({ routeNo: pathNo, teamName: '-' });
      }
    });
  }

  stateThree.forEach((item) => {
    item.sort((a: any, b: any) => a.routeNo - b.routeNo);
  });

  console.log(stateThree);

  return stateThree;
};

const columns = [
  // {
  //   title: '组次',
  //   dataIndex: 'groupNumber',
  //   key: 'groupNumber',
  //   onCell: (_: any, index: any) => {
  //     if (index % 4 === 0) {
  //       return { rowSpan: 4 };
  //     }

  //     return { rowSpan: 0 };
  //   },
  // },
  {
    title: '赛道',
    dataIndex: 'routeNo',
    key: 'routeNo',
    render: (initVal: any) => <Tag color="green">{initVal}</Tag>,
  },
  {
    title: '队名',
    dataIndex: 'teamName',
    key: 'teamName',
  },
  {
    title: '成绩',
    dataIndex: 'score1',
    key: 'score1',
    render: () => <></>,
  },
  {
    title: '名次',
    dataIndex: 'no1',
    key: 'no1',
    render: () => <></>,
  },
];

function Index() {
  const data = [
    {
      teamName: '广州队',
      score: 98,
      no: 1,
      img: 'http://cdn.shopify.com/s/files/1/0086/0795/7054/articles/Cat_s_Mind_x630.jpg?v=1624444348',
    },
    {
      teamName: '武汉队',
      score: 97,
      no: 2,
      img: 'http://cdn.shopify.com/s/files/1/0086/0795/7054/articles/Cat_s_Mind_x630.jpg?v=1624444348',
    },
    {
      teamName: '湛江队',
      score: 96,
      no: 3,
      img: 'http://cdn.shopify.com/s/files/1/0086/0795/7054/articles/Cat_s_Mind_x630.jpg?v=1624444348',
    },
    {
      teamName: '江西队',
      score: 95,
      no: 4,
      img: 'http://cdn.shopify.com/s/files/1/0086/0795/7054/articles/Cat_s_Mind_x630.jpg?v=1624444348',
    },
    {
      teamName: '雷州队',
      score: 94,
      no: 5,
      img: 'http://cdn.shopify.com/s/files/1/0086/0795/7054/articles/Cat_s_Mind_x630.jpg?v=1624444348',
    },
    {
      teamName: '杭州队',
      score: 93,
      no: 6,
      img: 'http://cdn.shopify.com/s/files/1/0086/0795/7054/articles/Cat_s_Mind_x630.jpg?v=1624444348',
    },
    {
      teamName: '羊城队',
      score: 92,
      no: 7,
      img: 'http://cdn.shopify.com/s/files/1/0086/0795/7054/articles/Cat_s_Mind_x630.jpg?v=1624444348',
    },
    {
      teamName: '渔村队',
      score: 91,
      no: 8,
      img: 'http://cdn.shopify.com/s/files/1/0086/0795/7054/articles/Cat_s_Mind_x630.jpg?v=1624444348',
    },
  ];

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

        <VerticalSpace>
          {gData &&
            (gData as any).map((data: any[], index: any) => (
              <>
                <Typography.Title>
                  {form.getFieldsValue().title} 第 {index + 1} 组
                </Typography.Title>
                <Table
                  dataSource={data}
                  columns={columns}
                  pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
                  bordered
                />
              </>
            ))}

          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.img} />}
                  title={<a href="https://ant.design">{item.teamName}</a>}
                  description={'得分:' + item.score}
                />
                <div>
                  <Tag color={matchColor(item.no)}>NO.{item.no}</Tag>
                </div>
              </List.Item>
            )}
          />
        </VerticalSpace>
      </Card>
    </PageContainer>
  );
}

export default Index;
