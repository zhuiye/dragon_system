import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, List, Space, Avatar, Modal, Tag, Select } from 'antd';
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
    <PageContainer>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card title="100米直道-男子组12人">
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
        <Card title="100米直道-女子组12人">
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={personList}
            renderItem={(item) => (
              <List.Item>
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
