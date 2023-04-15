import React, { useState } from 'react';
import { Button, Card, Table, Tag, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { useQuery } from '@/components/hooks/useQuery';
import { getScore, getScoreGroup } from '@/services/ant-design-pro/score';
/*@ts-ignore*/
import html2pdf from 'html2pdf.js';

function secondsToTime(seconds: number) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

const colors = ['gold', '#f50', '#2db7f5', 'gray', 'gray', 'gray'];
const columns = [
  {
    title: '比赛内容',
    dataIndex: 'content_name',
    key: 'content_name',
  },
  {
    title: '队伍名',
    dataIndex: 'team',
    key: 'team',
    render: (text: any) => <Tag>{text.team_name}</Tag>,
  },
  {
    title: '时间',
    dataIndex: 'score',
    key: 'score',
    render: (text: any) => <span>{secondsToTime(parseInt(text))}</span>,
  },
  {
    title: '排名',
    dataIndex: 'no',
    key: 'no',
    render: (text: any) => <Tag color={colors[text]}>{text}</Tag>,
  },
];

function generatePdf(id: any, filename: string) {
  const element = document.getElementById(id);

  let opt = {
    filename: `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.6 },
    html2canvas: {
      useCORS: true, //要渲染图片,此项必须要有
      backgroundColor: null,
      scrollX: 0, // 如果不这样设置,生成的PDF只有可视区的内容
      scrollY: 0, // 如果不这样设置,生成的PDF只有可视区的内容
      scale: 1, // 用于渲染的尺度,默认设备的像素比 window.devicePixelRatio
    },
    // before: 在 .break-page 之前分隔 ,after: 在 #after1,#after2 之后分割
    pagebreak: { before: '.break-page', after: ['#after1', '#after2'] }, // 控制分页符
    jsPDF: { orientation: 'portrait', compressPDF: true }, // unit: 'pt', format: 'a4', // 此库中的一些配置
  };

  html2pdf().set(opt).from(element).save();
}

function Index() {
  const query = useQuery();

  const { data = [] } = useRequest(() =>
    getScoreGroup({
      competition_id: query.competition_id,
      item_key: query.item_key,
      is_confirm: 1,
    }),
  );

  return (
    <PageContainer title={'成绩列表'}>
      {data.map((it: any, key: number) => (
        <Card key={key}>
          <div id={'pdf' + key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography.Title>{it.content_name}</Typography.Title>
              <Button
                type="primary"
                data-html2canvas-ignore="true"
                onClick={() => {
                  generatePdf('pdf' + key, it.content_name);
                }}
              >
                导出pdf
              </Button>
            </div>

            <Table
              dataSource={it.data}
              columns={columns}
              pagination={{ hideOnSinglePage: true, pageSize: 100000 }}
              bordered
            />
          </div>
        </Card>
      ))}
    </PageContainer>
  );
}

export default Index;
