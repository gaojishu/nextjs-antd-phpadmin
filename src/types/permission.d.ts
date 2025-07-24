import { ICommonRecord, ValueLabel } from "./global";

export interface PermissionRecord extends ICommonRecord {
    name: string;
    key: string;
    level: number;
    parentId: number | null;
    remark: string | null;
    icon: string | null;
    path: string | null;
    code: string | null;
    type: ValueLabel;
    sort: number;
    children: PermissionRecord[];
}