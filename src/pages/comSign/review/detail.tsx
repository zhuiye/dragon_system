import React, { useState } from 'react';
import { Button, Card, List, Modal, Space, Tag, Input, message, Avatar, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useQuery } from '@/components/hooks/useQuery';
import VerticalSpace from '@/components/VerticalSpace';

const colors = ['gold', '#f50', 'lime', 'green', 'blue', 'gray'];

function Index() {
  const query = useQuery();

  const items = JSON.parse(query.item_sort_link);

  const post_arr = ['领队', '教练', '鼓手', '舵手', '划手', '替补'];

  return (
    <PageContainer>
      <Card>
        {!!query.reason && (
          <div style={{ paddingBottom: 20 }}>
            <Typography.Text type="danger">审核不通过 : {query.reason}</Typography.Text>
          </div>
        )}
        <VerticalSpace>
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
