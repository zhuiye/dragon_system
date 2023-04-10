import React, { useState } from 'react';
import { Avatar, Button, Card, List, Modal, Space, Table, Tag, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { history } from 'umi';
import VerticalSpace from '@/components/VerticalSpace';
import { getPlayerList, updateCheckStatus } from '@/services/ant-design-pro/check';
import { useQuery } from '@/components/hooks/useQuery';
const colors = ['gold', '#f50', 'lime', 'green', 'blue', 'gray'];
const post_arr = ['领队', '教练', '鼓手', '舵手', '划手', '替补'];
const columns = [
  {
    title: '姓名',
    dataIndex: 'player_name',
    key: 'player_name',
  },
  {
    title: '头像',
    dataIndex: 'image_url',
    key: 'image_url',
    render: (text: any) => <Avatar src={`http://localhost:3000${text}`} />,
  },

  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '性别',
    key: 'gender',
    dataIndex: 'gender',
  },
  {
    title: '民族',
    key: 'nationality',
    dataIndex: 'nationality',
  },
  {
    title: '职位',
    key: 'post_id',
    dataIndex: 'post_id',
    render: (text: any, record: any) => (
      <Tag color={colors[record.post_id]}>
        {post_arr[text]}
        {text}
      </Tag>
    ),
  },

  {
    title: '图像地址',
    dataIndex: 'image_url',
    key: 'image_url',
  },
  {
    title: '手机号码',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: '身份证号码',
    dataIndex: 'identify_number',
    key: 'identify_number',
  },
];

const columns1 = [
  {
    title: '姓名',
    dataIndex: 'player_name',
    key: 'player_name',
  },
  {
    title: '职位',
    key: 'post_id',
    dataIndex: 'post_id',
    render: (text: any, record: any) => (
      <Tag color={colors[record.post_id]}>
        {post_arr[text]}
        {text}
      </Tag>
    ),
  },
];

function Index() {
  const query = useQuery();
  const { check_id, group_number, round_type, ...rest } = query;
  const { data = [] } = useRequest(() => getPlayerList(rest));
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // const
  const [selectedDownRowKeys, setSelectedDownRowKeys] = useState<React.Key[]>([]);

  const onDelSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedDownRowKeys(newSelectedRowKeys);
  };

  const delRowSelection = {
    selectedRowKeys: selectedDownRowKeys,
    onChange: onDelSelectChange,
  };

  const [visible, setVisible] = useState(false);

  const enter = async () => {
    const players = data.filter((it: any) => selectedRowKeys.includes(it.player_id));
    await updateCheckStatus({
      check_id: check_id,
      status: 1,
      players: JSON.stringify(players),
    });
    message.success('检录完成');
    history.goBack();
  };

  const downPeople = async () => {
    const downFilter = data.filter((it: any) => selectedDownRowKeys.includes(it.player_id));
    await updateCheckStatus({
      check_id: check_id,
      down: JSON.stringify(downFilter),
    });
    message.success('声明减员成功');
    setVisible(false);
  };

  return (
    <PageContainer>
      <Modal
        title="请选择减员人员"
        visible={visible}
        onOk={downPeople}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Table
          rowKey="player_id"
          rowSelection={delRowSelection}
          dataSource={data}
          columns={columns1}
          pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
          bordered
        />
      </Modal>
      <Card>
        <VerticalSpace>
          <Space>
            <Button type="primary" onClick={enter}>
              完成检录
            </Button>
            <Button
              onClick={() => {
                setVisible(true);
              }}
            >
              声明减员
            </Button>
          </Space>

          <Table
            rowKey="player_id"
            rowSelection={rowSelection}
            dataSource={data}
            columns={columns}
            pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
            bordered
          />
        </VerticalSpace>
      </Card>
    </PageContainer>
  );
}

export default Index;
