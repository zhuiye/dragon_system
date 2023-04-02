import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  List,
  Popconfirm,
  Space,
  Table,
  Typography,
  Avatar,
  Modal,
  Tag,
  Select,
} from 'antd';
import React, { useState } from 'react';

const personList = [
  {
    name: '陈恒承',
    post: '领队',
    age: '22',
    gender: '男',
    identify: '440882199701239155',
  },
  {
    name: '队员2',
    post: '鼓手',
    age: 27,
    gender: '男',
    identify: '440882199701239155',
  },
];

const MatchTeam: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <PageContainer title={<Button type="primary">提交报名</Button>}>
      <Modal
        destroyOnClose
        title="请选择参赛人员"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Select
            placeholder="请选择参赛人员"
            style={{ width: '100%' }}
            onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: '陈恒承',
              },
              {
                value: 'lucy',
                label: '路西',
              },

              {
                value: 'yinimg',
                label: '一名',
              },
            ]}
          />
          <Select
            style={{ width: '100%' }}
            placeholder="请分配职位"
            onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: '领队',
              },
              {
                value: 'lucy',
                label: '鼓手',
              },
            ]}
          />
        </Space>
      </Modal>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card
          title="100米直道-男子组12人"
          extra={
            <Button type="primary" onClick={showModal}>
              +
            </Button>
          }
        >
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={personList}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a key="list-loadmore-more" onClick={() => {}}>
                    删除
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar size="large" />}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={
                    <Space>
                      <Tag color="red">{item.post}</Tag>
                      <Tag color="gray">{item.identify}</Tag>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
        <Card
          title="100米直道-女子组12人"
          extra={
            <Button type="primary" onClick={() => {}}>
              添加参赛人员
            </Button>
          }
        >
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={personList}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a key="list-loadmore-more" onClick={() => {}}>
                    删除
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar size="large" />}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={
                    <Space>
                      <Tag color="red">{item.post}</Tag>
                      <Tag color="gray">{item.identify}</Tag>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </Space>
    </PageContainer>
  );
};

export default MatchTeam;
