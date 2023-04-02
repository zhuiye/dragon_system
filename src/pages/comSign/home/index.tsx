import React, { useRef, useState } from 'react';
import { Button, message, Space, Table, Tabs, Modal, Input, List, Avatar, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';
import JoinComp from './JoinComp';

import type { ProColumns, ActionType } from '@ant-design/pro-table';
import parseExcel from './parseExcel';
import ReviewTable from './ReviewTable';

const { TextArea } = Input;
function Index() {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const [teamList, setTeamList] = useState<{ teamName: string; teamDesc: string }[]>([
    { teamName: '我的队伍1', teamDesc: '说的话圣诞节活动经费和三等奖' },
    { teamName: '我的队伍2', teamDesc: '说的话圣诞节活动经费和三等奖1' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const exportExcel = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx';
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const people = await parseExcel(file);
          message.success('导入成功');
          //   console.log(people);
        } catch (error) {
          console.log(error);
        }
      }
    };
    input.click();
  };

  return (
    <>
      <Modal
        destroyOnClose
        title="创建队伍"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Input placeholder="请输入队伍名" />

          <TextArea rows={4} placeholder="请填写关于此次参赛的描述" />
        </Space>
      </Modal>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="我的队伍" key="1">
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Button type="primary" onClick={showModal}>
              创建队伍
            </Button>
            <Card>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={teamList}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <a
                        key="list-loadmore-edit"
                        title="利用excel导入事半功倍"
                        onClick={exportExcel}
                      >
                        导入
                      </a>,
                      <a
                        key="list-loadmore-more"
                        onClick={() => {
                          history.push('comSign/teamDetail');
                        }}
                      >
                        详情
                      </a>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar />}
                      title={<a href="https://ant.design">{item.teamName}</a>}
                      description={item.teamDesc}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Space>
        </Tabs.TabPane>
        <Tabs.TabPane tab="报名参赛" key="2">
          <Card>
            <JoinComp />
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="审核状态" key="3">
          <Card>
            <ReviewTable />
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default Index;
