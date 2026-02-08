'use client'
import React, { useRef } from 'react';
import AntdLayout from '@/components/AntdLayout';
import { adminActionPage } from '@/services';
import { type ProColumns, type ActionType, ProTable } from '@ant-design/pro-components';
import type { AdminActionRecord } from '@/types';
import DateRange from '@/components/DateRange';
import { Button, Typography } from 'antd';
const { Paragraph } = Typography;

export default function Page(): React.ReactElement {
    const actionRef = useRef<ActionType>(null);

    const adminTableColumn: ProColumns<AdminActionRecord>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        {
            title: '请求方法',
            dataIndex: 'method',
        },
        {
            title: '请求地址',
            dataIndex: 'path',
        },
        {
            title: '请求参数',
            dataIndex: 'queryParams',
            search: false,
            render: (_, record) => {
                return <Paragraph
                    code
                    copyable
                    ellipsis={{
                        rows: 2, expandable: true,
                    }}>
                    {JSON.stringify(record?.queryParams)}
                </Paragraph >
            },
        },
        {
            title: '请求参数',
            dataIndex: 'params',
            search: false,
            render: (_, record) => {
                return <Paragraph
                    code
                    copyable
                    ellipsis={{
                        rows: 2, expandable: true, symbol: 'more'
                    }}>
                    {JSON.stringify(record?.params)}
                </Paragraph >

            },
        },
        {
            title: 'IP',
            dataIndex: 'ip',
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
                virtual
                scroll={{ y: 400 }}
                request={
                    async (params, sort) => {
                        const data = await adminActionPage(params, sort);

                        return {
                            data: data.data,
                            success: true,
                            total: data.total
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
                pagination={{
                    pageSize: 10,
                }}
            />
        </AntdLayout>
    );
};

