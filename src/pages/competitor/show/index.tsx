// 编排演示页面
import React from 'react';
import { Button, Card, List, Modal, Space, Table, Tag } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';
import { Label } from 'bizcharts';
import VerticalSpace from '@/components/VerticalSpace';
import generateSnakePosition from './matchAi';

function Index() {
  const data = [
    { teamName: '广州队', score: 98, no: 1 },
    { teamName: '广州队', score: 97, no: 2 },
    { teamName: '广州队', score: 96, no: 3 },
    { teamName: '广州队', score: 95, no: 4 },
    { teamName: '广州队', score: 94, no: 5 },
  ];

  console.log(generateSnakeGroup([7, 8, 9, 10, 11, 12, 13, 14], 3));
  return (
    <PageContainer title="赛事后续的编排页面">
      <Card>
        <VerticalSpace>
          <Button
            type="primary"
            onClick={() => {
              history.push('/competitor/create');
            }}
          >
            进行编排,此页面根据比赛的轮次，以及分数，进行分配赛道。
          </Button>
        </VerticalSpace>
        正准备进行编排的队伍列表
        <pre></pre>
      </Card>
    </PageContainer>
  );
}

export default Index;
