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

type TabsTargetKey = React.MouseEvent | React.KeyboardEvent | string | undefined;
