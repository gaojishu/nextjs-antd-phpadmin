'use client';

import { Button, List } from 'antd';
import { useEffect } from 'react';


export default function NoticeList() {

    useEffect(() => {

    }, []);

    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];
    return (
        <List
            className='bg-white w-80'
            header={<Button type='link'>查看更多</Button>}
            // footer={<Button type='link'>查看更多</Button>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <div className='flex justify-between'>
                        <div className='text-sm '>{item}</div>
                        <Button type='link'>详情</Button>
                    </div>
                </List.Item>
            )}
        />
    );

}