'use client';

import { BellOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { useEffect, useState } from 'react';
import { useStomp } from '@/components/StompProvider';
import { notification } from '@/components/GlobalProvider';
import NoticeTableModal from './NoticeTableModal';


export default function Notice() {
    const { client, connected } = useStomp();
    const [noticeTableModalOpen, setNoticeTableModalOpen] = useState(false);

    useEffect(() => {
        if (client && connected) {
            const subscription = client.subscribe('/user/queue/notification', message => {
                const obj = JSON.parse(message.body);
                console.log('Received:', obj);

                notification.info({
                    message: obj.title,
                    description: obj.content,
                    duration: 5,
                    showProgress: true
                });
            });


            return () => {
                subscription.unsubscribe();
            };
        }
    }, [client, connected]);


    return (
        <div>
            <NoticeTableModal
                noticeTableModalOpen={noticeTableModalOpen}
                setNoticeTableModalOpen={setNoticeTableModalOpen}
            />
            <Badge dot count={22} size="small" onClick={() => setNoticeTableModalOpen(true)}>
                <div className='hover:text-blue-500 cursor-pointer'>
                    {/* <Dropdown
                        autoFocus={true}
                        trigger={['click']}
                        popupRender={() => (
                            <NoticeList />
                        )}>
                        <BellOutlined style={{ fontSize: 22 }} />
                    </Dropdown> */}
                    <BellOutlined style={{ fontSize: 22 }} />
                </div>

            </Badge>
        </div>

    );

}