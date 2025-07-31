import { SortOrder } from "antd/es/table/interface";
import { ICommonRecord } from "./global";

export interface FilesCategoryRecord extends ICommonRecord {
    name: string | null;
    remark: string | null;
}

export type FilesCategoryOrder = {
    id: SortOrder;
}

export type FilesCategoryStore = Pick<AdminRecord,
    'name' | 'remark' | 'id'
>