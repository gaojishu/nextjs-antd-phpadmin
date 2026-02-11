'use client'
import React, { useRef, useState } from 'react';
import AntdLayout from '@/components/AntdLayout';
import { asyncJobExport, asyncJobPage } from '@/services';
import { type ProColumns, type ActionType, ProTable, ParamsType } from '@ant-design/pro-components';
import type { AsyncJobRecord } from '@/types';
import DateRange from '@/components/DateRange';
import { Button, Typography } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import AsyncJobStatusSelect from './components/AsyncJobStatusSelect';
import AsyncJobQueueSelect from './components/AsyncJobQueueSelect';
import { store } from '@/store';

const { Paragraph } = Typography;

export default function Page(): React.ReactElement {
    const actionRef = useRef<ActionType>(null);

    const asyncJobQueue = store.getState().commonEnumsState.asyncJobQueue;
    const asyncJobStatus = store.getState().commonEnumsState.asyncJobStatus;


    const [params, setParams] = useState<ParamsType>();
    const [sort, setSort] = useState<Record<string, SortOrder>>();

    const tableColumn: ProColumns<AsyncJobRecord>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
        },
        {
            title: '任务驱动',
            dataIndex: 'queue',
            render: (_, record) => {
                return asyncJobQueue.find(item => item.value === record.queue)?.label;
            },
            renderFormItem: (_, props) => {
                return <AsyncJobQueueSelect {...props} />
            }
        },
        {
            title: 'uuid',
            dataIndex: 'uuid',
        },
        {
            title: '任务类',
            dataIndex: 'jobClass',
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (_, record) => {
                return asyncJobStatus.find(item => item.value === record.status)?.label;
            },
            renderFormItem: (_, props) => {
                return <AsyncJobStatusSelect {...props} />
            }
        },
        {
            title: '次数',
            dataIndex: 'attempts',
            search: false
        },
        {
            title: '最大次数',
            dataIndex: 'maxAttempts',
            search: false
        },
        {
            title: '任务参数',
            dataIndex: 'payload',
            search: false,
            render: (_, record) => {
                return <Paragraph
                    code
                    copyable
                    ellipsis={{
                        rows: 2, expandable: true,
                    }}>
                    {JSON.stringify(record?.payload)}
                </Paragraph >
            },
        },
        {
            title: '锁定时间',
            dataIndex: 'reservedAt',
            search: false
        },
        {
            title: '预计时间',
            dataIndex: 'availableAt',
            search: false
        },
        {
            title: '执行结果',
            dataIndex: 'result',
            search: false,
            render: (_, record) => {
                return <Paragraph
                    code
                    copyable
                    ellipsis={{
                        rows: 2, expandable: true,
                    }}>
                    {JSON.stringify(record?.result)}
                </Paragraph >
            },
        },
        {
            title: '错误信息',
            dataIndex: 'errorMessage',
            search: false
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

    const handlerExport = async () => {
        await asyncJobExport(params, sort);
    };

    const toolBarRender = [
        <Button key={'export'} onClick={handlerExport}>导出表格</Button>
    ];

    return (
        <AntdLayout>
            <ProTable<AsyncJobRecord>
                headerTitle=""
                actionRef={actionRef}
                columns={tableColumn}
                virtual
                scroll={{ y: 400 }}
                request={
                    async (params, sort) => {
                        const data = await asyncJobPage(params, sort);

                        setParams(params);
                        setSort(sort);
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

