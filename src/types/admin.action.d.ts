import { SortOrder } from "antd/es/table/interface";
import { ICommonRecord } from "./global";
import { AdminRecord } from "./admin";

export interface AdminActionRecord extends ICommonRecord {
    adminId: number | null;
    ip: string | null;
    method: string | null;
    uri: string | null;
    duration: number | null;
    remark: string | null;
    params: string | null;
    queryParams: string | null;
    admin: AdminRecord | null;
}

export type AdminActionSortOrder = {
    id: SortOrder;
}

