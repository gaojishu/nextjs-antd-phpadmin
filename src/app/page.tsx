'use client'
import React,{useEffect} from 'react';
import { Button } from 'antd';
import AntdLayout from '@/components/AntdLayout';
import http from '@/utils/http';

export default () => {

  //  useEffect(() => {
  //   async function fetchData() {
  //     const res = await http.get('/admin/auth/info');
  //     console.log(res, 'ssssssssss');
  //   }

  //   fetchData();
  // }, []);

  return (
    <AntdLayout>
      <Button type="primary">Button</Button>
    </AntdLayout>
  );
};

