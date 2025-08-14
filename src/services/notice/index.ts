import type { ApiResponse, Pageable, NoticeRecord } from "@/types";
import http from "@/utils/http";
import type { ParamsType } from "@ant-design/pro-components";
import type { SortOrder } from "antd/es/table/interface";

export async function noticePage(params: ParamsType, sort: Record<string, SortOrder>) {
    const res = await http.post<ApiResponse<Pageable<NoticeRecord>>>({
        url: `/admin/notice/page`,
        params: {},
        data: {
            params, sort
        },
    });

    return res.data;
}

