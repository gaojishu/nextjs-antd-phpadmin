import { ICommonRecord } from "./global";

export interface AsyncJobRecord extends ICommonRecord {
    payload: string;
    status: number;
    attempts: string | null;
    maxAttempts: string | null;
    reservedAt: number | null;
    availableAt: string | null;
    errorMessage: string | null;
    queue: string;
    jobClass: string;
    uuid: string;
    result: string
}


