import type { PermissionRecord, ValueLabel } from '@/types';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm, Space } from 'antd';
import { ReactNode } from 'react';
import PermissionModalForm from '../form/PermissionModalForm';

type PermissionTableProps = {
    handlerAdd?: () => void;
    handlerEdit?: (record: PermissionRecord) => void;
    handlerDelete?: (id: number | string) => void;
};

export const permissionTableToolBarRender = ({
    handlerAdd,
}: PermissionTableProps): ReactNode[] => [
        <PermissionModalForm />
    ];

export const permissionTreeTableColumn = ({
    handlerEdit,
    handlerDelete,
}: PermissionTableProps): ProColumns<PermissionRecord>[] => [
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
            title: '操作',
            dataIndex: 'action',
            render: (_, record) => (
                <Space>
                    <Button type='link' onClick={() => handlerEdit?.(record)}>编辑</Button>
                    <Popconfirm
                        title="删除操作"
                        description="您确认要删除吗?"
                        onConfirm={() => handlerDelete?.(record.id)}

                    >
                        <Button type='text' danger>删除</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];