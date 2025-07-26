'use client'
import React, { useRef, useState } from 'react';
import { Button, Popconfirm, Space } from 'antd';
import AntdLayout from '@/components/AntdLayout';
import { permissionCreate, permissionDelete, permissionTree, permissionUpdate } from '@/services';
import type { PermissionCreate, PermissionUpdate, PermissionRecord } from '@/types';
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import PermissionCreateModalForm from './components/PermissionCreateModalForm';
import PermissionUpdateModalForm from './components/PermissionUpdateModalForm';

export default function Page() {
    const [permissionCreateModalFormOpen, setPermissionCreateModalFormOpen] = useState(false);
    const [permissionUpdateModalFormOpen, setPermissionUpdateModalFormOpen] = useState(false);
    const permissionCreateFormData = {
        name: '',
        parentId: null,
        remark: '',
        icon: '',
        path: '',
        code: '',
        type: 1,
        sort: 1,
        roleId: [],
    }


    const [permissionUpdateFormData, setPermissionUpdateFormData] = useState<PermissionUpdate>();
    const actionRef = useRef<ActionType>(null);

    const [permissionTreeData, setPermissionTreeData] = useState<PermissionRecord[]>([]);

    const handlerEdit = (record: PermissionRecord) => {
        setPermissionUpdateFormData({
            ...record,
            roleId: [],
            type: record.type.value,
        });
        setPermissionUpdateModalFormOpen(true);
    };

    const handlerAdd = () => {
        setPermissionCreateModalFormOpen(true);
    };

    const handlerDelete = async (id: number) => {
        await permissionDelete(id);
        actionRef?.current?.reload();
    };

    const handlerCreateSubmit = async (values: PermissionCreate) => {
        await permissionCreate(values);
        actionRef?.current?.reload();
        return true;
    };

    const handlerUpdateSubmit = async (values: PermissionUpdate) => {

        await permissionUpdate(values);
        actionRef?.current?.reload();
        return true;
    };


    const permissionTreeTableColumn: ProColumns<PermissionRecord>[] = [
        {
            title: '权限名称',
            dataIndex: 'name',
        },
        {
            title: '类型',
            dataIndex: 'type',
            render: (_, record: PermissionRecord) => {
                return record.type.label;
            },
        },
        {
            title: '页面路径',
            dataIndex: 'path',
        },
        {
            title: '权限标识符',
            dataIndex: 'code',
        },
        {
            title: '描述',
            dataIndex: 'remark',
        },
        {
            title: '图标',
            dataIndex: 'icon',
        },
        {
            title: '排序',
            dataIndex: 'sort',
        },
        {
            title: '创建时间',
            dataIndex: 'date',
            render: (_, record) => (
                <>
                    <div>创建时间：{record.createdAt}</div>
                    <div>更新时间：{record.updatedAt}</div>
                </>
            )
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => handlerEdit(record)}>
                        编辑
                    </Button>
                    <Popconfirm
                        title="删除操作"
                        description="您确认要删除吗?"
                        onConfirm={() => handlerDelete(Number(record.id))}
                    >
                        <Button type='text' danger>删除</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <AntdLayout>
            <PermissionCreateModalForm
                title='新增权限'
                key={'create'}
                initialValues={permissionCreateFormData}
                open={permissionCreateModalFormOpen}
                onOpenChange={setPermissionCreateModalFormOpen}
                onFinish={(values) => handlerCreateSubmit(values)}
                permissionTreeData={permissionTreeData}
            />
            <PermissionUpdateModalForm
                title={permissionUpdateFormData?.id ? '编辑权限' : '新增权限'}
                key={permissionUpdateFormData?.id + 'update'}
                initialValues={permissionUpdateFormData}
                open={permissionUpdateModalFormOpen}
                onOpenChange={setPermissionUpdateModalFormOpen}
                onFinish={(values) => handlerUpdateSubmit(values)}
                permissionTreeData={permissionTreeData}
            />
            <ProTable<PermissionRecord>
                headerTitle=""
                actionRef={actionRef}
                columns={permissionTreeTableColumn}
                request={
                    async () => {
                        const data = await permissionTree();
                        setPermissionTreeData(data);
                        return {
                            data: data,
                            success: true,
                        };
                    }
                }
                search={false}
                pagination={false}
                rowKey="key"
                toolBarRender={() => [
                    <Button onClick={() => handlerAdd()} key="handlerAdd">新增</Button>
                ]}
                expandable={
                    {
                        defaultExpandAllRows: true
                    }
                }
            />

        </AntdLayout>
    );
};

