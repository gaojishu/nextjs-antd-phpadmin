
import { ICommonRecord } from "./global";

export interface NoticeRecord extends ICommonRecord {
    title: string;
    content: string;
    adminId: string | null;
    attachments: string[] | null;
}


export type FilesPageParams = {
    current: number;
    pageSize: number;
    createdAt: string[] | null;
}
