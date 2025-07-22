import { ICommonRecord } from "./global";

export interface PermissionRecord extends ICommonRecord {
    name: string;
    level: number;
    parentId: number | null;
    remark: string | null;
    icon: string | null;
    path: string | null;
    code: string | null;
    type: number;
    sort: number;
    children: PermissionRecord[];
}