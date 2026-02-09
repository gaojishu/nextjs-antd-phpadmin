// 定义基础结构，默认 T 为 unknown
export interface WsData<T = Record<string, unknown>> {
  type: string;
  message: string;
  data: T;
}

// 2. 处理器定义（支持泛型 T）
export type MessageHandler<T = unknown> = (data: WsData<T>) => void;


export class SocketClient {

  // 关键：内部存储使用最宽泛的函数定义，避开 any
  private handlers: Map<string, Set<MessageHandler<unknown>>> = new Map();


  private static instance: SocketClient;
  private ws: WebSocket | null = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;


  private url: string = '';
  private token: string | null = null;

  private constructor() { } // 去掉构造函数里的固定 URL

  static getInstance(): SocketClient {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }
    return SocketClient.instance;
  }

  // 核心：支持动态更新配置并重连
  updateConfig(baseUrl: string, token: string | null) {
    const newUrl = token ? `${baseUrl}?token=${token}` : baseUrl;

    // 如果 URL 没变且连接已打开，不操作
    if (this.url === newUrl && this.ws?.readyState === WebSocket.OPEN) return;

    this.url = newUrl;
    this.token = token;
    this.disconnect(); // 先断开旧连接
    this.connect();    // 建立新连接
  }

  disconnect() {
    if (this.ws) {
      this.ws.onclose = null; // 清除重连监听，防止死循环
      this.ws.close();
      this.ws = null;
    }
  }

  // 3. 使用泛型 T，并在内部进行类型断言（as）
  on<T>(type: string, handler: MessageHandler<T>): void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }

    // 将具体类型的 handler 断言为宽泛类型存入 Set
    this.handlers.get(type)?.add(handler as MessageHandler<unknown>);
  }

  off<T>(type: string, handler: MessageHandler<T>): void {
    const typeHandlers = this.handlers.get(type);
    if (typeHandlers) {
      typeHandlers.delete(handler as MessageHandler<unknown>);
    }
  }

  // 4. 消息分发逻辑
  private dispatch(event: MessageEvent) {
    // 1. 过滤掉纯文本消息（比如 "Opened" 或 "pong"）
    if (typeof event.data === 'string' && !event.data.startsWith('{')) {
      console.log("[WS] Received plain text:", event.data);
      return;
    }
    try {
      const raw: WsData<unknown> = JSON.parse(event.data);
      if (raw.type === 'pong') return;
      const typeHandlers = this.handlers.get(raw.type);

      if (typeHandlers) {
        // 执行时，由于内部存的是 unknown，直接调用是安全的
        typeHandlers.forEach(handler => handler(raw));
      }
    } catch (e) {
      console.error("Parse error", e);
    }
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log("Connected");
      this.startHeartbeat();
      if (this.reconnectTimer != null) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
    };

    this.ws.onclose = () => {
      this.stopHeartbeat();
      // 指数退避重连逻辑
      this.reconnectTimer = setTimeout(() => this.connect(), 5000);
    };

    this.ws.onmessage = (event) => {
      this.dispatch(event);
    };
  }

  private startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 10000); // 建议间隔 25-55 秒
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer != null) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
}
