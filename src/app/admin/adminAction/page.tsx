'use client'
import React, { useRef } from 'react';
import AntdLayout from '@/components/AntdLayout';
import { adminActionPage } from '@/services';
import { type ProColumns, type ActionType, ProTable } from '@ant-design/pro-components';
import type { AdminActionRecord } from '@/types';
import DateRange from '@/components/DateRange';
import { Button } from 'antd';

export default function Page(): React.ReactElement {
    const actionRef = useRef<ActionType>(null);

    const adminTableColumn: ProColumns<AdminActionRecord>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
        },
        {
            title: '请求方法',
            dataIndex: 'method',
        },
        {
            title: '请求地址',
            dataIndex: 'uri',
        },
        {
            title: '请求参数',
            dataIndex: 'queryParams',
        },
        {
            title: '请求参数',
            dataIndex: 'params',
        },
        {
            title: 'IP',
            dataIndex: 'ip',
            search: false,
        },
        {
            title: '时长',
            dataIndex: 'duration',
            search: false,
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
        }
    ];

    const toolBarRender = [
        <Button key={'export'} >导出表格</Button>
    ];

    return (
        <AntdLayout>
            <ProTable<AdminActionRecord>
                headerTitle=""
                actionRef={actionRef}
                columns={adminTableColumn}
                request={
                    async (params, sort) => {
                        const data = await adminActionPage(params, sort);

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

