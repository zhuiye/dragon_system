import { getPlayers } from '@/services/ant-design-pro/player';
import { postSignUp } from '@/services/ant-design-pro/sign';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { Button, Modal, message, Table, List, Card, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import { history, useLocation } from 'umi';

function generateLink(data: any) {
  const link = [];

  for (let item of data) {
    link.push({
      ...item,
      key: item.sort_id + '-' + item.item_id,
      binds: [],
    });
  }

  return link;
}

const getOwnBinds = (key: any, data: any) => {
  for (let item of data) {
    if (item.key === key) {
      return item.binds;
    }
  }
  return [];
};

const show = (binds: [], player: any[]) => {
  const playerFilter = player.filter((item: any) => binds.includes((item as any).player_id));
  return playerFilter;
};
const MatchTeam: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentKey, setCurrentKey] = useState('');

  const location: any = useLocation();

  // const
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const item_sort_link = JSON.parse(location.query.item_sort_link);
  const [links, setLink] = useState(generateLink(item_sort_link));

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onOk = () => {
    setIsModalOpen(false);

    const cloneLinks = structuredClone(links);
    for (let item of cloneLinks) {
      if (item.key === currentKey) {
        item.binds = selectedRowKeys;
      }
    }
    setLink(cloneLinks);

    setSelectedRowKeys([]);
    setCurrentKey('');
  };

  const columns: ColumnsType<any> = [
    {
      title: '队员姓名',
      dataIndex: 'player_name',
    },
  ];

  const { data = [] } = useRequest(() => getPlayers({}));

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const confirm = async () => {
    await postSignUp({
      competition_id: location.query.competition_id,
      team_id: '1',
      player_ids: '这个参数好像无意义',
      item_relation: JSON.stringify(links),
      submit_time: '1000000',
    });
    message.success('成功提交报名信息');

    history.goBack();
  };

  return (
    <PageContainer
      title={
        <Button type="primary" onClick={confirm}>
          提交报名
        </Button>
      }
    >
      <Modal
        destroyOnClose
        title="请选择参赛人员"
        visible={isModalOpen}
        onOk={onOk}
        onCancel={handleCancel}
      >
        <Table rowKey="player_id" rowSelection={rowSelection} columns={columns} dataSource={data} />
      </Modal>

      <Card>
        <List
          itemLayout="horizontal"
          dataSource={links}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta
                description={
                  <div>
                    {show(getOwnBinds(item.sort_id + '-' + item.item_id, links), data).map(
                      (player: any) => {
                        return <Tag color="green">{player.player_name}</Tag>;
                      },
                    )}
                  </div>
                }
                title={`${item.item_name} ${item.sort_name}`}
              />
              <Button
                onClick={() => {
                  setCurrentKey(item.sort_id + '-' + item.item_id);
                  setIsModalOpen(true);
                }}
              >
                添加参赛人员
              </Button>
            </List.Item>
          )}
        />
      </Card>
    </PageContainer>
  );
};

export default MatchTeam;
