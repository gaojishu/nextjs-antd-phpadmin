import { ICommonRecord, ValueLabel } from "./global";
import type { MenuProps } from "antd";

export type PermissionMenuTree = Required<MenuProps>['items'][number];

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

export type PermissionCreate = Pick<PermissionRecord,
    'name' | 'parentId' | 'remark' | 'icon' |
    'path' | 'code' | 'sort'
> & {
    roleId: number[] | string[];
    type: number | string;
};

export type PermissionUpdate = Pick<PermissionRecord,
    'name' | 'parentId' | 'remark' | 'icon' |
    'path' | 'code' | 'sort' | 'id'
> & {
    roleId: number[] | string[];
    type: number | string;
};