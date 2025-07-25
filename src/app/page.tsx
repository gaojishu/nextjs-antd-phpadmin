'use client'
import React, { useEffect } from 'react';
import { Button } from 'antd';
import AntdLayout from '@/components/AntdLayout';
import http from '@/utils/http';
import { useRouter, usePathname } from 'next/navigation';


export default function Page() {
  const router = useRouter();
  const pathname = usePathname();

  //  useEffect(() => {
  //   async function fetchData() {
  //     const res = await http.get('/admin/auth/info');
  //     console.log(res, 'ssssssssss');
  //   }

  //   fetchData();
  // }, []);

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

