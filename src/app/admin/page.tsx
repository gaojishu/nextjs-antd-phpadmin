'use client'
import React, { useRef, useState } from 'react';
import { Button, Popconfirm, Space } from 'antd';
import AntdLayout from '@/components/AntdLayout';
import { adminCreate, adminDelete, adminPage, adminUpdate } from '@/services';
import { type ProColumns, type ActionType, ProTable } from '@ant-design/pro-components';
import type { AdminCreate, AdminRecord, AdminUpdate } from '@/types';
import DateRange from '@/components/DateRange';
import AdminCreateModalForm from './components/AdminCreateModalForm';
import AdminUpdateModalForm from './components/AdminUpdateModalForm';

export default function Page(): React.ReactElement {
    const actionRef = useRef<ActionType>(null);
    const [adminCreateModalFormOpen, setAdminCreateModalFormOpen] = useState(false);
    const [adminUpdateModalFormOpen, setAdminUpdateModalFormOpen] = useState(false);

    const adminInitFormData: AdminCreate = {
        username: '',
        password: '',
        email: '',
        nickname: '',
        mobile: '',
        disabledStatus: 0,
        permissionKey: []
    }

    const [adminCreateFormData, setPermissionCreateFormData] = useState<AdminCreate>({
        ...adminInitFormData,
    });
    const [adminUpdateFormData, setAdminUpdateFormData] = useState<AdminUpdate>({
        ...adminInitFormData,
        id: 0,
    });


    const adminTableColumn: ProColumns<AdminRecord>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
        },
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '禁用状态',
            dataIndex: 'disabledStatus',
            render: (_, record: AdminRecord) => {
                return record.disabledStatus.label;
            },
            search: false,
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            renderFormItem: (_, props) => {
                return <DateRange {...props} />
            }
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            renderFormItem: (_, props) => {
                return <DateRange {...props} />
            }
        },
        {
            title: '操作',
            dataIndex: 'action',
            search: false,
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => handlerEdit(record)}>
                        编辑
                    </Button>
                </Space>
            ),
        },
    ];

    const toolBarRender = [
        <Button onClick={() => handlerAdd()} key="handlerAdd">新增</Button>
    ];

    const handlerEdit = (record: AdminRecord) => {
        setAdminUpdateFormData({
            ...record,
            disabledStatus: record.disabledStatus.value
        });
        setAdminUpdateModalFormOpen(true);
    };

    const handlerAdd = (record?: AdminRecord) => {

        setPermissionCreateFormData({
            ...adminInitFormData
        });
        setAdminCreateModalFormOpen(true);
    };

    // const handlerDelete = async (id: number) => {
    //     await adminDelete(id);
    //     actionRef?.current?.reload();
    // };

    const handlerCreateSubmit = async (values: AdminCreate) => {
        console.log(values)
        return
        await adminCreate(values);
        actionRef?.current?.reload();
        return true;
    };

    const handlerUpdateSubmit = async (values: AdminUpdate) => {

        await adminUpdate(values);
        actionRef?.current?.reload();
        return true;
    };

    return (
        <AntdLayout>
            <AdminCreateModalForm
                title='新增管理员'
                key={'create'}
                open={adminCreateModalFormOpen}
                onOpenChange={setAdminCreateModalFormOpen}
                onFinish={(values) => handlerCreateSubmit(values)}
                adminFormData={adminCreateFormData}
            />
            <AdminUpdateModalForm
                title='编辑管理员'
                key={'update'}
                open={adminUpdateModalFormOpen}
                onOpenChange={setAdminUpdateModalFormOpen}
                onFinish={(values) => handlerUpdateSubmit(values)}
                adminFormData={adminUpdateFormData}
            />
            <ProTable<AdminRecord>
                headerTitle=""
                actionRef={actionRef}
                columns={adminTableColumn}
                request={
                    async (params, sort) => {
                        const data = await adminPage(params, sort);

                        return {
                            data: data.content,
                            success: true,
                            total: data.totalElements
                        };
                    }
                }
                rowKey="id"
                toolBarRender={() => [
                    ...toolBarRender
                ]}
                search={{
                    collapsed: false
                }}
            />
        </AntdLayout>
    );
};

