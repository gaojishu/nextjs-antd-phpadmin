'use client'
import React, { useRef } from 'react';
import { noticePage } from '@/services';
import { type ProColumns, type ActionType, ProTable } from '@ant-design/pro-components';
import type { NoticeRecord } from '@/types';
import DateRange from '@/components/DateRange';
import { Modal, Space } from 'antd';

type NoticeTableModalProps = {
    noticeTableModalOpen: boolean;
    setNoticeTableModalOpen: (state: boolean) => void;
};

export default function NoticeTableModal({
    noticeTableModalOpen,
    setNoticeTableModalOpen,
}: NoticeTableModalProps
): React.ReactElement {
    const actionRef = useRef<ActionType>(null);
    const noticeTableColumn: ProColumns<NoticeRecord>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
        },
        {
            title: '标题',
            dataIndex: 'title',
            search: false,
        },
        {
            title: '内容',
            dataIndex: 'content',
            search: false,
        },
        {
            title: '附件',
            dataIndex: 'attachments',
            search: false,
            render: (_, record) => (
                <Space>
                    {record.attachments?.map((item, index) => (
                        <a key={index} href={item} target="_blank" rel="noreferrer">
                            附件{index + 1}
                        </a>
                    ))}
                </Space>
            ),
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
            search: false,
            renderFormItem: (_, props) => {
                return <DateRange {...props} />
            }
        }
    ];

    const handleCancel = () => {
        setNoticeTableModalOpen(false)
    };

    return (
        <Modal
            width={800}
            title="系统通知"
            open={noticeTableModalOpen}
            onOk={handleCancel}
            onCancel={handleCancel}
        >
            <ProTable<NoticeRecord>
                headerTitle=""
                actionRef={actionRef}
                columns={noticeTableColumn}
                request={
                    async (params, sort) => {
                        const data = await noticePage(params, sort);

                        return {
                            data: data.content,
                            success: true,
                            total: data.totalElements
                        };
                    }
                }
                rowKey="id"
                search={{
                    collapsed: false
                }}
            />
        </Modal>

    );
};

