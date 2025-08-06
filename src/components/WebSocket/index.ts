import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { type RootState } from '@/store';
import { useSelector } from 'react-redux';
let stompClient: Client | null = null;

export const useStompClient = () => {
    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState<{ title: string, content: string }>();
    const token = useSelector((state: RootState) => state.authLoginState.token);


    useEffect(() => {
        // 👇 关闭旧连接
        if (stompClient) {
            stompClient.deactivate();
            stompClient = null;
        }
        const socketUrl = process.env.NEXT_PUBLIC_API_URL;
        const socket = new SockJS(`${socketUrl}/ws?token=` + token);
        stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log('STOMP: ' + str),
            reconnectDelay: 5000,
            heartbeatIncoming: 5000,
            heartbeatOutgoing: 5000,
            onConnect: () => {
                console.log('STOMP connected');
                setConnected(true);

                stompClient?.subscribe('/topic/notification', (message) => {
                    console.log('收到广播:', JSON.parse(message.body));
                    setMessage(JSON.parse(message.body))
                });

                // 订阅通知
                stompClient?.subscribe('/user/queue/notification', (message) => {
                    console.log('收到个人消息:', JSON.parse(message.body));
                    //setMessage(JSON.parse(message.body))
                });
            },
            onStompError: (error) => {
                console.error('STOMP error:', error);
            },
        });

        stompClient.activate();

        return () => {
            if (stompClient) {
                stompClient.deactivate();
                stompClient = null;
            }
        };
    }, [token]);

    const sendMessage = (destination: string, body: object) => {
        if (stompClient && stompClient.active) {
            stompClient.publish({
                destination,
                body: JSON.stringify(body),
            });
        }
    };

    return { connected, message, sendMessage };
};