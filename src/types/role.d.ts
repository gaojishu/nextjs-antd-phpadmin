import { ICommonRecord } from "./global";

export interface RoleRecord extends ICommonRecord {
    name: string;
    remark: string | null;
    permissionKey: string[]
}

export type RoleStore = Pick<RoleRecord,
    'name' | 'permissionKey' | 'remark' | 'id'
>;