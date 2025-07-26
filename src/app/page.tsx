'use client'
import React from 'react';
import { Button } from 'antd';
import AntdLayout from '@/components/AntdLayout';
import { useRouter } from 'next/navigation';


export default function Page() {
  const router = useRouter();

  return (
    <AntdLayout>
      <Button type="primary" onClick={() => {
        router.push('/login');
      }}>login</Button>
      <Button type="primary" onClick={() => {
        router.push('/auth');
      }}>auth</Button>
    </AntdLayout>
  );
};

