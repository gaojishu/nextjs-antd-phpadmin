'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Client, Frame } from '@stomp/stompjs';
import { initStompClient } from '@/utils/stompClient';

// 定义 Context 的类型
interface StompContextType {
    client: Client | null;
    connected: boolean;
    error: Frame | null;
    publish: (destination: string, body: string, headers?: { [key: string]: string }) => void;
}

// 创建 Context
const StompContext = createContext<StompContextType | undefined>(undefined);

// 自定义 Hook
export const useStomp = (): StompContextType => {
    const context = useContext(StompContext);
    if (!context) {
        throw new Error('useStomp must be used within a StompProvider');
    }
    return context;
};

// Provider 组件
export const StompProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState<Frame | null>(null);

    const client = initStompClient();

    const publish = (
        destination: string,
        body: string,
        headers?: { [key: string]: string }
    ) => {
        if (client && connected) {
            client.publish({ destination, body, headers });
        } else {
            console.warn('Cannot publish: not connected');
        }
    };

    // eslint-disable-next-line react-hooks/immutability
    useEffect(() => {
        if (!client) return;

        client.onConnect = (frame: Frame) => {
            console.log('✅ STOMP Connected:', frame);
            setConnected(true);
            setError(null);
        };

        client.onDisconnect = (frame: Frame) => {
            console.log('⏹️ STOMP Disconnected:', frame);
            setConnected(false);
        };

        client.onStompError = (frame: Frame) => {
            console.error('❌ STOMP Error:', frame);
            setError(frame);
            setConnected(false);
        };

        client.onWebSocketError = (error: Error) => {
            console.error('🌐 WebSocket Error:', error);
            setError({} as Frame); // 简化处理，实际中可封装
            setConnected(false);
        };

        client.onWebSocketClose = (event: CloseEvent) => {
            console.log('Close event:', event);
            setConnected(false);
        };

        client.activate();

        return () => {
            client.deactivate();
        };
    }, [client]);

    const value: StompContextType = {
        client,
        connected,
        error,
        publish,
    };

    return <StompContext.Provider value={value}>{children}</StompContext.Provider>;
};