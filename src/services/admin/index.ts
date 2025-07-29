import type { ApiResponse, AdminRecord, Pageable, AdminCreate, AdminUpdate } from "@/types";
import http from "@/utils/http";
import type { ParamsType } from "@ant-design/pro-components";
import type { SortOrder } from "antd/es/table/interface";

export async function adminPage(params: ParamsType, sort: Record<string, SortOrder>) {
    const res = await http.post<ApiResponse<Pageable<AdminRecord>>>({
        url: `/admin/admin/page`,
        params: {},
        data: {
            params, sort
        },
    });

    return res.data;
}


export async function adminCreate(data: AdminCreate) {
    const res = await http.post<ApiResponse<null>>({
        url: `/admin/admin/create`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function adminUpdate(data: AdminUpdate) {
    const res = await http.post<ApiResponse<null>>({
        url: `/admin/admin/update`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function adminDelete(id: number) {
    const res = await http.get<ApiResponse<null>>({
        url: `/admin/admin/delete/${id}`,
        params: {},
    });

    return res.data;
}