import { useQuery } from '@/components/hooks/useQuery';
import { getPlayers } from '@/services/ant-design-pro/player';
import { postSignUp } from '@/services/ant-design-pro/sign';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { Button, Modal, message, Table, List, Card, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import { history } from 'umi';

function generateLink(data: any) {
  const link = [];

  for (let item of data) {
    link.push({
      ...item,
      key: item.item_id + '-' + item.sort_id,
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

const show = (binds: any[], player: any[]) => {
  const playerFilter = player.filter((item: any) => binds.includes((item as any).player_id));
  return playerFilter;
};
const MatchTeam: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentKey, setCurrentKey] = useState('');

  const query = useQuery();

  const item_sort_link = JSON.parse(query.item_sort_link);
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

    setCurrentKey('');
  };

  const columns: ColumnsType<any> = [
    {
      title: '队员姓名',
      dataIndex: 'player_name',
      key: 'player_name',
    },
    {
      title: '职位',
      dataIndex: 'post_name',
      key: 'post_name',
    },
  ];

  const { data = [] } = useRequest(() => getPlayers({ team_id: query.team_id }));

  // const
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const confirm = async () => {
    await postSignUp({
      competition_id: query.competition_id,
      team_id: query.team_id,
      player_ids: '这个参数好像无意义',
      item_relation: JSON.stringify(links),
      submit_time: new Date().getTime(),
    });
    message.success('成功提交报名信息');

    history.goBack();
  };
  console.log(links);
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
                    {show(getOwnBinds(item.item_id + '-' + item.sort_id, links), data).map(
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
                  setCurrentKey(item.item_id + '-' + item.sort_id);
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
