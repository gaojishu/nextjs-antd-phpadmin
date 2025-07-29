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
  content: T[];
  last: boolean;//是否是最后一页。true 表示当前是最后一页。
  totalPages: number;//总共多少页。当前只有 1 页。
  totalElements: number;//数据总条数。当前只有 1 条数据。
  size: number;//每页的大小（即每页最多显示几条数据）。当前是 1。
  number: number;//当前页码（从 0 开始）。当前是第 0 页（即第一页）。
  sort: string?;//排序信息。这里为空，表示没有排序。
  first: boolean;//是否是第一页。true 表示当前是第一页。
  numberOfElements: number;//当前页返回了多少条数据。这里是 1 条。
  empty: boolean;//当前页是否有数据。false 表示有数据。
}
