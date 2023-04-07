import React, { useRef, useState } from 'react';
import { Button, message, Space, Table, Tabs, Modal, Input, List, Avatar, Card, Form } from 'antd';
import { useIntl, history, FormattedMessage, SelectLang, useModel, useHistory } from 'umi';
import JoinComp from './JoinComp';
import parseExcel from './parseExcel';
import ReviewTable from './ReviewTable';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { useRequest } from 'ahooks';
import { addTeams, getTeams } from '@/services/ant-design-pro/team';
import { importPlayers } from '@/services/ant-design-pro/player';

const exportExcel = (team_id: number) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.xlsx';
  input.onchange = async (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      try {
        const people = await parseExcel(file);
        console.log(people);

        const state = people.map((item) => ({ ...item, user_id: 1, team_id: team_id }));

        await importPlayers({ data: state });
        message.success('导入成功');
      } catch (error) {
        console.log(error);
      }
    }
  };
  input.click();
};

function Index() {
  const { data: teamList = [], run } = useRequest(getTeams);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ModalForm
        title={'创建队伍'}
        width="600px"
        visible={isModalOpen}
        onVisibleChange={setIsModalOpen}
        onFinish={async (value) => {
          const success = await addTeams({ ...value, user_id: 1 });
          if (success) {
            setIsModalOpen(false);
            run();
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: ' name is required',
            },
          ]}
          width="xl"
          name="team_name"
          tooltip="最长50个字符"
          placeholder="请输入队伍的名字"
        />

        <ProFormTextArea
          width="xl"
          name="desc"
          label="备注"
          tooltip="不可为空"
          placeholder="备注"
        />
        <ProFormText rules={[]} width="xl" name="score" placeholder="上一轮成绩，无可不填" />
      </ModalForm>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="我的队伍" key="1">
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Button
              type="primary"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              创建队伍
            </Button>
            <Card>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={teamList}
                renderItem={(item: any) => (
                  <List.Item
                    actions={[
                      <a
                        key="list-loadmore-edit"
                        title="利用excel报名导入更加迅速"
                        onClick={() => exportExcel(item.team_id)}
                      >
                        导入
                      </a>,
                      <a
                        key="list-loadmore-more"
                        onClick={() => {
                          history.push(`/comSign/teamDetail?team_id=${item.team_id}`);
                        }}
                      >
                        详情
                      </a>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar />}
                      title={<a href="https://ant.design">{item.team_name}</a>}
                      description={item.desc}
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
