import React from 'react';
import { Button, List, Modal, Space, Table, Tag, Typography, Card, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { assignTeamMapWithRout, generateTimeLineAssign } from '@/services/ant-design-pro/timeline';
import { useQuery } from '@/components/hooks/useQuery';
import { assignMapWithPath, randomAssign } from './matchAi';
import { getSignUpTeams } from '@/services/ant-design-pro/sign';
import { getPreScore, getSemiFinalScore } from '@/services/ant-design-pro/score';
const columns: any = [
  {
    title: '时间',
    dataIndex: 'format_date',
    key: 'format_date',
    onCell: (_: any, index: any) => {
      if (index % _.race_track_number === 0) {
        return { rowSpan: _.race_track_number };
      }

      return { rowSpan: 0 };
    },
  },
  {
    title: '组次',
    dataIndex: 'group_number',
    key: 'group_number',
    onCell: (_: any, index: any) => {
      if (index % _.race_track_number === 0) {
        return { rowSpan: 4 };
      }

      return { rowSpan: 0 };
    },
  },
  {
    title: '赛道',
    dataIndex: 'path',
    key: 'path',
    render: (initVal: any) => <Tag color="green">{initVal}</Tag>,
  },
  {
    title: '队名',
    dataIndex: 'team_name',
    key: 'team_name',
  },
];

function Index() {
  const query = useQuery();

  const { data: teamList = [] } = useRequest(() =>
    getSignUpTeams({
      competition_id: query.competition_id,
      item_key: query.item_key,
    }),
  );

  const { data = [], refresh: reloadTimelineList } = useRequest(() =>
    generateTimeLineAssign({
      competition_id: query.competition_id,
      item_key: query.item_key,
    }),
  );

  const { data: preScores = [] } = useRequest(() =>
    getPreScore({
      competition_id: query.competition_id,
      rule_id: '300',
    }),
  );

  const { data: finalScores = [] } = useRequest(() =>
    getSemiFinalScore({
      competition_id: query.competition_id,
      rule_id: '600',
    }),
  );

  // 初赛
  const assignPreliminaries = async (timeLineItem: any) => {
    const data = randomAssign(
      teamList,
      timeLineItem.group_count,
      Math.floor(teamList.length / timeLineItem.group_count),

      timeLineItem.race_track_number,
    );

    const updateRecord = data.map((item) => {
      return {
        competition_id: timeLineItem.competition_id,
        round_type: timeLineItem.round_type,
        group_number: item.group_number + 1,
        item_key: timeLineItem.item_key,
        assign_list: JSON.stringify(item.data),
      };
    });

    await assignTeamMapWithRout({ data: updateRecord });
    message.success('编排成功');
  };

  const handlerProcess = async (timeLineItem: any, score: any) => {
    const data = assignMapWithPath(score, timeLineItem.race_track_number, timeLineItem.group_count);

    const res = data.map((item, index) => {
      return {
        group_number: index,
        data: item.map((list: any) => ({
          team_name: list.team.team_name,
          team_id: list.team.team_id,
          path: list.path,
        })),
      };
    });

    const updateRecord = res.map((item, index) => {
      return {
        competition_id: timeLineItem.competition_id,
        round_type: timeLineItem.round_type,
        item_key: timeLineItem.item_key,
        group_number: item.group_number + 1,
        assign_list: JSON.stringify(item.data),
      };
    });
    await assignTeamMapWithRout({ data: updateRecord });
    message.success('编排成功');
  };

  // 半决赛
  const assignSemifinal = async (timeLineItem: any) => {
    await handlerProcess(timeLineItem, preScores);
  };
  //决赛
  const assignFinal = async (timeLineItem: any) => {
    await handlerProcess(timeLineItem, finalScores);
  };

  const assign = async (item: any) => {
    switch (item.round_type) {
      case 0:
        await assignPreliminaries(item);
        break;
      case 1:
        break;

      case 2:
        await assignSemifinal(item);

        break;

      case 5:
        await assignFinal(item);
        break;
    }
    reloadTimelineList();
  };

  return (
    <PageContainer title="赛道编排">
      {data.map((item: any, index: any) => (
        <Card key={index}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography.Title>{item.title}</Typography.Title>
            <Button
              disabled={item.can_assign}
              type="primary"
              onClick={() => {
                assign(item);
              }}
            >
              分配
            </Button>
          </div>

          <Table
            dataSource={item.data}
            columns={columns}
            pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
            bordered
          />
        </Card>
      ))}
    </PageContainer>
  );
}

export default Index;
