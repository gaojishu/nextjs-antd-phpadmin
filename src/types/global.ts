export interface ICommonRecord {
    readonly id: number | string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly deletedAt: string | null;
}

export type ValueLabel = {
    value: string | number;
    label: string;
}

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}