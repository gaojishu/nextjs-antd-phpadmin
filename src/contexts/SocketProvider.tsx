'use client';

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { SocketClient } from '@/utils/SocketClient';
import { store } from '@/store';
import { useSelector } from 'react-redux';

const SocketContext = createContext<SocketClient | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  // 仅在客户端初始化单例
  const socket = useMemo(() => SocketClient.getInstance(), []);
  const token = useSelector(() => store.getState().authLoginState.token);


  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_WS_URL!;

    // 只有当 token 存在时才初始化或更新连接
    if (token) {
      socket.updateConfig(baseUrl, token);
    } else {
      socket.disconnect();
    }

    // 组件卸载或 Token 变化前断开，防止内存泄漏
    return () => socket.disconnect();
  }, [socket, token]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used within SocketProvider');
  return context;
};
