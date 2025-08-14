// lib/stompClient.ts
import { store } from '@/store';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';


let stompClient: Client | null = null;

export const initStompClient = (): Client => {
    if (typeof window === 'undefined') {
        // SSR 安全：只在浏览器中创建
        return null!;
    }

    const token = store.getState().authLoginState.token;
    const url = process.env.NEXT_PUBLIC_API_URL + '/ws?token=' + token;
    if (stompClient === null) {
        stompClient = new Client({
            webSocketFactory: () => new SockJS(url),
            debug: (str: string) => {
                console.log('[STOMP] ', str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
    }

    return stompClient;
};

export const getStompClient = (): Client => {
    if (!stompClient) {
        throw new Error('STOMP client not initialized. Call initStompClient first.');
    }
    return stompClient;
};