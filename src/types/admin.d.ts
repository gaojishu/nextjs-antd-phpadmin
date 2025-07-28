import { ICommonRecord, ValueLabel } from "./global";
import { PermissionRecord } from "./permission";

export interface AdminRecord extends ICommonRecord {
    mobile: string | null;
    nickname: string | null;
    email: string | null;
    password: string | null;
    username: string;
    disabledStatus: ValueLabel;
    permission?: PermissionRecord[] | null;
}