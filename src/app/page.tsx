'use client'
import AntdLayout from '@/components/AntdLayout';
import React, { useEffect, useState } from 'react';
import { Card, List, Tag, Progress, Typography, Divider, Descriptions, DescriptionsProps } from 'antd';
import { actuatorHealth } from '@/services';
import { HealthData } from '@/types';

const { Title, Text } = Typography;

// 格式化字节为 GB
const formatBytes = (bytes: number) => {
  return (bytes / (1024 ** 3)).toFixed(2) + ' GB';
};

// 计算磁盘使用率
const getDiskUsage = (total: number, free: number) => {
  const used = total - free;
  return Number(((used / total) * 100).toFixed(2));
};

export default function Page() {

  const [actuatorHealthData, setActuatorHealthData] = useState<HealthData>();

  const diskTotal = actuatorHealthData?.components?.diskSpace.details.total || 0;
  const diskFree = actuatorHealthData?.components?.diskSpace.details.free || 0;
  const diskUsed = diskTotal - diskFree;
  const diskUsagePercent = getDiskUsage(diskTotal, diskFree);
  const { status, components } = actuatorHealthData || {};


  useEffect(() => {
    actuatorHealth().then((res) => {
      setActuatorHealthData(res);
    });
  }, []);


  const databaseItems: DescriptionsProps['items'] = [
    {
      label: '状态',
      children: <p> <Tag color={components?.db.status === 'UP' ? 'success' : 'error'}>{components?.db.status}</Tag></p>,
      span: 'filled',
    },
    {
      label: '类型',
      children: <p> {components?.db.details.database}</p>,
      span: 'filled',
    },
    {
      label: 'SQL 查询',
      children: <p> {components?.db.details.validationQuery}</p>,
      span: 'filled',
    },
    {
      label: '查询结果',
      children: <p> {components?.db.details.result}</p>,
      span: 'filled',
    },

  ];

  const redisItems: DescriptionsProps['items'] = [
    {
      label: '状态',
      children: <p> <Tag color={components?.redis.status === 'UP' ? 'success' : 'error'}>{components?.redis.status}</Tag></p>,
      span: 'filled',
    },
    {
      label: '版本',
      children: <p> {components?.redis.details.version}</p>,
      span: 'filled',
    }
  ];

  const diskItems: DescriptionsProps['items'] = [
    {
      label: '状态',
      children: <p> <Tag color={components?.diskSpace.status === 'UP' ? 'success' : 'error'}>{components?.diskSpace.status}</Tag></p>,
      span: 'filled',
    },
    {
      label: '目录',
      children: <p> {components?.diskSpace.details.path}</p>,
      span: 'filled',
    },
    {
      label: '总空间',
      children: <p> {formatBytes(diskTotal)}</p>,
      span: 'filled',
    },
    {
      label: '可用空间',
      children: <p> {formatBytes(diskFree)}</p>,
      span: 'filled',
    },
    {
      label: '已用空间',
      children: <p> {formatBytes(diskUsed)}</p>,
      span: 'filled',
    },
    {
      label: '使用率',
      children: <Progress percent={diskUsagePercent} status="active" />,
      span: 'filled',
    }
  ];

  const pingItems: DescriptionsProps['items'] = [
    {
      label: '状态',
      children: <p> <Tag color={components?.ping.status === 'UP' ? 'success' : 'error'}>{components?.ping.status}</Tag></p>,
      span: 'filled',
    }
  ];

  const sslItems: DescriptionsProps['items'] = [
    {
      label: '状态',
      children: <p> <Tag color={components?.ssl.status === 'UP' ? 'success' : 'error'}>{components?.ssl.status}</Tag></p>,
      span: 'filled',
    },
    {
      label: '有效链',
      children: <p> {components?.ssl.details.validChains.length}</p>,
      span: 'filled',
    },
    {
      label: '无效链',
      children: <p> {components?.ssl.details.invalidChains.length}</p>,
      span: 'filled',
    },
  ]

  return (
    <AntdLayout>
      <Card>
        <Title level={5}>应用健康状态</Title>
        <Tag color={status === 'UP' ? 'success' : 'error'} style={{ marginBottom: 24, fontSize: 14, padding: '8px 16px' }}>
          系统状态: {status}
        </Tag>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>

          {/* 数据库 */}

          <Card title="数据库 (PostgreSQL)">

            <Descriptions items={databaseItems} />

          </Card>

          {/* Redis */}
          <Card title="Redis">

            <Descriptions items={redisItems} />

          </Card>

          {/* 磁盘空间 */}
          <Card title="磁盘空间">

            <Descriptions items={diskItems} />

          </Card>

          {/* Ping & SSL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card title="Ping">

              <Descriptions items={pingItems} />

            </Card>

            <Card title="SSL 证书">

              <Descriptions items={sslItems} />

            </Card>
          </div>
        </div>
      </Card>
    </AntdLayout>
  );
}