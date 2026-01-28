'use client'
import AntdLayout from '@/components/AntdLayout';
import React, { useEffect, useState } from 'react';
import { Card, List, Tag, Progress, Typography, Divider } from 'antd';
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
            <List
              size="small"
              dataSource={[
                { label: '状态', value: components?.db.status },
                { label: '类型', value: components?.db.details.database },
                { label: '验证查询', value: components?.db.details.validationQuery },
                { label: '查询结果', value: components?.db.details.result },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Text strong>{item.label}:</Text>
                  &nbsp;
                  {item.label === '状态' ? (
                    <Tag color={item.value === 'UP' ? 'success' : 'error'}>{item.value}</Tag>
                  ) : (
                    <Text code>{item.value}</Text>
                  )}
                </List.Item>
              )}
            />
          </Card>

          {/* Redis */}
          <Card title="Redis">
            <List
              size="small"
              dataSource={[
                { label: '状态', value: components?.redis.status },
                { label: '版本', value: components?.redis.details.version },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Text strong>{item.label}:</Text>
                  &nbsp;
                  {item.label === '状态' ? (
                    <Tag color={item.value === 'UP' ? 'success' : 'error'}>{item.value}</Tag>
                  ) : (
                    <Text>{item.value}</Text>
                  )}
                </List.Item>
              )}
            />
          </Card>

          {/* 磁盘空间 */}
          <Card title="磁盘空间">
            <List
              size="small"
              dataSource={[
                { label: '状态', value: components?.diskSpace.status },
                { label: '路径', value: components?.diskSpace.details.path },
                { label: '总空间', value: formatBytes(diskTotal) },
                { label: '可用空间', value: formatBytes(diskFree) },
                { label: '已用空间', value: formatBytes(diskUsed) },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Text strong>{item.label}:</Text>
                  &nbsp;
                  {item.label === '状态' ? (
                    <Tag color={item.value === 'UP' ? 'success' : 'error'}>{item.value}</Tag>
                  ) : (
                    <Text>{item.value}</Text>
                  )}
                </List.Item>
              )}
            />
            <Divider dashed />
            <Text>使用率:</Text>
            <Progress percent={diskUsagePercent} status="active" />
          </Card>

          {/* Ping & SSL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card title="Ping">
              <Text strong>状态:</Text>
              &nbsp;
              <Tag color={components?.ping.status === 'UP' ? 'success' : 'error'}>{components?.ping.status}</Tag>
            </Card>

            <Card title="SSL 证书">
              <List
                size="small"
                dataSource={[
                  { label: '状态', value: components?.ssl.status },
                  { label: '有效链', value: components?.ssl.details.validChains.length },
                  { label: '无效链', value: components?.ssl.details.invalidChains.length },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Text strong>{item.label}:</Text>
                    &nbsp;
                    <Text>{item.value}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </div>
      </Card>
    </AntdLayout>
  );
}