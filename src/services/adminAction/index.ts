import type { ApiResponse, Pageable, AdminActionRecord } from "@/types";
import http from "@/utils/http";
import type { ParamsType } from "@ant-design/pro-components";
import type { SortOrder } from "antd/es/table/interface";

export async function adminActionPage(params: ParamsType, sort: Record<string, SortOrder>) {
    const res = await http.post<ApiResponse<Pageable<AdminActionRecord>>>({
        url: `/admin/admin_action/page`,
        params: {},
        data: {
            params, sort
        },
    });

    return res.data;
}


export async function adminActionExport(params: ParamsType | undefined, sort: Record<string, SortOrder> | undefined) {
    const res = await http.post<ApiResponse<null>>({
        url: `/admin/admin_action/export`,
        params: {},
        data: {
            params, sort
        },
    });

    return res.data;
}
