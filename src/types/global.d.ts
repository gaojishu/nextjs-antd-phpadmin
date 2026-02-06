export interface ICommonRecord {
  readonly id: number | string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export type ValueLabel = {
  value: string | number;
  label: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  success: boolean;
  httpStatus: number;
  code: number;
  message: string;
  data: T;
  reqId: string;
}

export type TabsTargetKey = React.MouseEvent | React.KeyboardEvent | string | undefined;

export interface Pageable<T> {
  currentPage: number; //当前页码。当前是第 1 页。
  data: T[];
  lastPage: number;//最后一页页码。
  perPage: number;//每页的大小（即每页最多显示几条数据）。当前是 1。
  total: number;//总数量。
}
