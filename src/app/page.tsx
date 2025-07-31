'use client'
import AntdLayout from '@/components/AntdLayout';
import { EditableProTable, type ProColumns } from '@ant-design/pro-components';
import React, { useState } from 'react';

// 定义一个简单的测试类型
type TestRecord = {
  id: string;
  name: string;
  remark: string;
};

export default function TestEditableTable() {
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
  // 使用一个确定的、简单的初始数据
  const [dataSource, setDataSource] = useState<readonly TestRecord[]>([
    { id: '1', name: '初始项1', remark: '备注1' },
    { id: '2', name: '初始项2', remark: '备注2' },
  ]);

  const columns: ProColumns<TestRecord>[] = [
    {
      title: '名称',
      dataIndex: 'name',

    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => [], // 空操作，排除 render 函数影响
    },
  ];

  return (
    <AntdLayout>


      <div style={{ padding: 24 }}>
        <h3>测试可编辑表格</h3>
        <EditableProTable<TestRecord>
          rowKey="id"
          columns={columns}
          value={dataSource}
          onChange={(value) => {
            setDataSource(value)
          }}
          recordCreatorProps={{
            position: 'top',
            record: () => ({
              id: Date.now() + Math.random().toString(), // 确保唯一
              name: '',
              remark: ''
            }),
          }}
          editable={{
            type: 'multiple',
            editableKeys,
            onChange: setEditableKeys,
            // 移除 onSave 以排除其影响
          }}
        // 移除所有可能触发额外逻辑的 props
        />
      </div>
    </AntdLayout>
  );
}