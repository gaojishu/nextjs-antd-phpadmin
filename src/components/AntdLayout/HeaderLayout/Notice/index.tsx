'use client';
import { notification } from '@/components/GlobalProvider';
import { useStompClient } from '@/components/WebSocket';
import { BellOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { useEffect } from 'react';


export default function Notice() {
    const { message } = useStompClient();

    useEffect(() => {
        notification.info({
            message: message?.title,
            description: message?.content,
            duration: 5,
            showProgress: true,
            onClick: () => {

            },
        });
    }, [message])

    return (

        <Badge count={22} size="small">
            <div className='hover:text-blue-500 cursor-pointer'>
                <BellOutlined style={{ fontSize: 22 }} />
            </div>

        </Badge>

    );

}