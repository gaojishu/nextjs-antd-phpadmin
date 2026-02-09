'use client';

import { BellOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { useEffect, useState } from 'react';
import NoticeTableModal from './NoticeTableModal';
import { SocketClient, WsData } from '@/utils/SocketClient';
import { notification } from '@/components/GlobalProvider';
import { NoticeRecord } from '@/types';


export default function Notice() {
    const [count, setCount] = useState(0);

    const [noticeTableModalOpen, setNoticeTableModalOpen] = useState(false);

    useEffect(() => {
        const socket = SocketClient.getInstance();

        const handleNoticeUpdate = (data: WsData<NoticeRecord>) => {
            setCount(prev => prev + 1);

            notification.info({
                title: data.data.title,
                description: data.data.content
            });
        };

        // 订阅
        socket.on('notice', handleNoticeUpdate);

        // 清理函数：防止内存泄漏和重复处理
        return () => {
            socket.off('notice', handleNoticeUpdate);
        };
    }, []); // 仅在挂载和卸载时执行

    return (
        <div>
            <NoticeTableModal
                noticeTableModalOpen={noticeTableModalOpen}
                setNoticeTableModalOpen={setNoticeTableModalOpen}
            />
            <Badge count={count} size="small" onClick={() => setNoticeTableModalOpen(true)}>
                <div className='hover:text-blue-500 cursor-pointer'>
                    <BellOutlined style={{ fontSize: 22 }} />
                </div>
            </Badge>
        </div>

    );

}