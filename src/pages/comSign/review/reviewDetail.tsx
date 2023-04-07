import React, { useState } from 'react';
import { Button, Card, List, Space, Tag, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import { useQuery } from '@/components/hooks/useQuery';
import VerticalSpace from '@/components/VerticalSpace';
import { updateSignUp } from '@/services/ant-design-pro/sign';

function Index() {
  const query = useQuery();

  const items = JSON.parse(query.item_relation);

  const post_arr = ['领队', '教练', '鼓手', '舵手', '划手', '替补'];

  const pass = async (status: any) => {
    await updateSignUp({
      sign_up_id: query.sign_up_id,
      status: status,
    });
    message.success('操作成功 ');

    history.goBack();
  };

  return (
    <PageContainer>
      <VerticalSpace>
        {items.map((its: any) => {
          return (
            <Card title={its.item_name + '' + its.sort_name}>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={its.players}
                renderItem={(item: any) => (
                  <List.Item
                    actions={
                      [
                        // <a key="list-loadmore-more" onClick={() => {}}>
                        //   删除
                        // </a>,
                      ]
                    }
                  >
                    <List.Item.Meta
                      description={
                        <Space>
                          <Tag color="red">{item.player_name}</Tag>
                          <Tag color="red">{item.gender ? '男' : '女'}</Tag>
                          <Tag color="green">{item.nationality}</Tag>

                          <Tag color="red">{item.age}</Tag>
                          <Tag color="red">{item.identify_number}</Tag>

                          <Tag color="gray">{post_arr[item.post_id]}</Tag>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          );
        })}
      </VerticalSpace>
    </PageContainer>
  );
}

export default Index;
