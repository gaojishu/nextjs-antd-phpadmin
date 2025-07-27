import type { ApiResponse, RoleRecord, RoleStore } from "@/types";
import http from "@/utils/http";

export async function roleRecords() {
    const res = await http.get<ApiResponse<RoleRecord[]>>({
        url: `/admin/role/records`,
        params: {},
    });

    return res.data;
}

export async function roleStore(data: RoleStore) {
    const res = await http.post<ApiResponse<RoleRecord>>({
        url: `/admin/role/store`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function roleDelete(id: number) {
    const res = await http.get<ApiResponse<null>>({
        url: `/admin/role/delete/${id}`,
        params: {},
    });

    return res.data;
}