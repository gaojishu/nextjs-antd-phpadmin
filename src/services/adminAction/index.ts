import type { ApiResponse, Pageable, AdminActionRecord } from "@/types";
import http from "@/utils/http";
import type { ParamsType } from "@ant-design/pro-components";
import type { SortOrder } from "antd/es/table/interface";

export async function adminActionPage(params: ParamsType, sort: Record<string, SortOrder>) {
    const res = await http.post<ApiResponse<Pageable<AdminActionRecord>>>({
        url: `/admin/admin-action/page`,
        params: {},
        data: {
            params, sort
        },
    });

    return res.data;
}

