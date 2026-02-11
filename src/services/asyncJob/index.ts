import type { ApiResponse, Pageable, AsyncJobRecord } from "@/types";
import http from "@/utils/http";
import type { ParamsType } from "@ant-design/pro-components";
import type { SortOrder } from "antd/es/table/interface";

export async function asyncJobPage(params: ParamsType, sort: Record<string, SortOrder>) {
    const res = await http.post<ApiResponse<Pageable<AsyncJobRecord>>>({
        url: `/admin/async_job/page`,
        params: {},
        data: {
            params, sort
        },
    });

    return res.data;
}


export async function asyncJobExport(params: ParamsType | undefined, sort: Record<string, SortOrder> | undefined) {
    const res = await http.post<ApiResponse<null>>({
        url: `/admin/async_job/export`,
        params: {},
        data: {
            params, sort
        },
    });

    return res.data;
}
