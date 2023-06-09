import React, { useState } from 'react';
import { Button, Card, List, Modal, Space, Tag, Input, message, Avatar, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import { useQuery } from '@/components/hooks/useQuery';
import VerticalSpace from '@/components/VerticalSpace';
import { updateSignUp } from '@/services/ant-design-pro/sign';

const colors = ['gold', '#f50', 'lime', 'green', 'blue', 'gray'];

function Index() {
  const query = useQuery();

  const items = JSON.parse(query.item_relation);

  const post_arr = ['领队', '教练', '鼓手', '舵手', '划手', '替补'];

  const pass = async (status: any) => {
    await updateSignUp({
      sign_up_id: query.sign_up_id,
      status: status,
      reason: '',
    });
    message.success('操作成功 ');

    history.goBack();
  };

  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  return (
    <PageContainer>
      <Card>
        {query.reason && (
          <div style={{ paddingBottom: 20 }}>
            <Typography.Text type="danger">审核不通过 : {query.reason}</Typography.Text>
          </div>
        )}

        <Modal
          title="输入拒绝理由"
          visible={visible}
          onOk={async () => {
            await updateSignUp({ sign_up_id: query.sign_up_id, status: 2, season: text });
            history.goBack();
          }}
          onCancel={() => {
            setVisible(false);
          }}
        >
          <Input.TextArea
            rows={4}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Modal>
        <VerticalSpace>
          {!query.isDetail && (
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  pass(1);
                }}
              >
                通过
              </Button>

              <Button
                onClick={() => {
                  setVisible(true);
                }}
              >
                不通过
              </Button>
            </Space>
          )}

          {items.map((its: any) => {
            return (
              <Card title={its.item_name + '' + its.sort_name}>
                <List
                  className="demo-loadmore-list"
                  itemLayout="horizontal"
                  dataSource={its.players}
                  renderItem={(item: any) => (
                    <List.Item actions={[]}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.image_url} />}
                        title={
                          <Space size={8}>
                            <span>{item.player_name}</span>
                            <Tag color={colors[item.post_id]}>{post_arr[item.post_id]}</Tag>
                          </Space>
                        }
                        description={
                          <Space>
                            {item.gender ? '男' : '女'}
                            {item.nationality}
                            {item.age}岁{item.phone_number}
                            {item.identify_number}
                          </Space>
                        }
                      ></List.Item.Meta>
                    </List.Item>
                  )}
                />
              </Card>
            );
          })}
        </VerticalSpace>
      </Card>
    </PageContainer>
  );
}

export default Index;
