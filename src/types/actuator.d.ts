// 定义数据库组件类型
export interface DbComponent {
    status: 'UP' | 'DOWN'; // 假设状态只有 UP/DOWN
    details: {
        database: string;
        validationQuery: string;
        result: string;
    };
}

// 定义磁盘空间组件类型
export interface DiskSpaceComponent {
    status: 'UP' | 'DOWN';
    details: {
        total: number;
        free: number;
        threshold: number;
        path: string;
        exists: boolean;
    };
}

// 定义 Ping 组件类型
export interface PingComponent {
    status: 'UP' | 'DOWN';
}

// 定义 Redis 组件类型
export interface RedisComponent {
    status: 'UP' | 'DOWN';
    details: {
        version: string;
    };
}

// 定义 SSL 组件类型
export interface SslComponent {
    status: 'UP' | 'DOWN';
    details: {
        validChains: string[]; // 或更具体的类型
        invalidChains: string[]; // 或更具体的类型
    };
}

// 定义 Components 总体类型
export interface HealthComponents {
    db: DbComponent;
    diskSpace: DiskSpaceComponent;
    ping: PingComponent;
    redis: RedisComponent;
    ssl: SslComponent;
}

// 定义根健康数据类型
export interface HealthData {
    status: 'UP' | 'DOWN';
    components: HealthComponents;
}
