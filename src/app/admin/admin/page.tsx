'use client'
import React, { useRef, useState } from 'react';
import { Button, Space } from 'antd';
import AntdLayout from '@/components/AntdLayout';
import { adminCreate, adminPage, adminUpdate } from '@/services';
import { type ProColumns, type ActionType, ProTable } from '@ant-design/pro-components';
import type { AdminCreate, AdminRecord, AdminUpdate } from '@/types';
import DateRange from '@/components/DateRange';
import AdminCreateModalForm from './components/AdminCreateModalForm';
import AdminUpdateModalForm from './components/AdminUpdateModalForm';
import { store } from '@/store';

export default function Page(): React.ReactElement {
    const actionRef = useRef<ActionType>(null);
    const [adminCreateModalFormOpen, setAdminCreateModalFormOpen] = useState(false);
    const [adminUpdateModalFormOpen, setAdminUpdateModalFormOpen] = useState(false);
    const adminDisabledStatus = store.getState().commonEnumsState.adminDisabledStatus;

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

    // 父组件
    const [modalOpenKey, setModalOpenKey] = useState(0);


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
                return adminDisabledStatus.find(item => item.value === record.disabledStatus)?.label || '未知状态';;
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


    const handlerEdit = (record: AdminRecord) => {
        setAdminUpdateFormData({
            ...record
        });
        setAdminUpdateModalFormOpen(true);
        setModalOpenKey(prev => prev + 1); // 👈 每次 +1
    };

    const handlerAdd = () => {

        setPermissionCreateFormData({
            ...adminInitFormData
        });
        setAdminCreateModalFormOpen(true);
        setModalOpenKey(prev => prev + 1); // 👈 每次 +1
    };

    // const handlerDelete = async (id: number) => {
    //     await adminDelete(id);
    //     actionRef?.current?.reload();
    // };
    const toolBarRender = [
        <Button onClick={() => handlerAdd()} key="handlerAdd">新增</Button>
    ];

    const handlerCreateSubmit = async (values: AdminCreate) => {
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
                key={'create' + modalOpenKey} // 👈 必须！
                open={adminCreateModalFormOpen}
                onOpenChange={setAdminCreateModalFormOpen}
                onFinish={(values) => handlerCreateSubmit(values)}
                adminFormData={adminCreateFormData}
            />
            <AdminUpdateModalForm
                title='编辑管理员'
                key={'update' + modalOpenKey}
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
                            data: data.data,
                            success: true,
                            total: data.total,
                        };
                    }
                }
                rowKey="id"
                toolBarRender={() => [
                    ...toolBarRender
                ]}
                pagination={{
                    pageSize: 10,
                    current: 1,
                }}
                search={{
                    collapsed: false
                }}
            />
        </AntdLayout>
    );
};

