import { SortOrder } from "antd/es/table/interface";
import { ICommonRecord, ValueLabel } from "./global";

export interface FilesRecord extends ICommonRecord {
    name: string;
    remark: string | null;
    categoryId: number | null;
    key: string;
    type: ValueLabel<string>;
    mimeType: string;
    hash: string;
    size: number;
}

export type FilesOrder = {
    id: SortOrder;
}

export type FileList = Pick<FilesRecord,
    'name' | 'remark' | 'key' | 'mimeType' | 'categoryId' | 'hash' | 'size'
>

export type FilesCreate = {
    fileList: FileList[];
}

export type FilesUpdate = Pick<FilesRecord,
    'name' | 'categoryId'
>

export type FilesPageParams = Pick<FilesRecord,
    'name' | 'categoryId'
> & {
    type: string | null;
    current: number;
    pageSize: number;
    createdAt: string[] | null;
}