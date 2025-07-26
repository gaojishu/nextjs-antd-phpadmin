import type { ApiResponse, PermissionCreate, PermissionUpdate, PermissionRecord } from "@/types";
import http from "@/utils/http";

export async function permissionTree() {
    const res = await http.get<ApiResponse<PermissionRecord[]>>({
        url: `/admin/permission/tree`,
        params: {},
    });

    return res.data;
}

export async function permissionCreate(data: PermissionCreate) {
    const res = await http.post<ApiResponse<PermissionRecord>>({
        url: `/admin/permission/create`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function permissionUpdate(data: PermissionUpdate) {
    const res = await http.post<ApiResponse<PermissionRecord>>({
        url: `/admin/permission/update`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function permissionDelete(id: number) {
    const res = await http.get<ApiResponse<null>>({
        url: `/admin/permission/delete/${id}`,
        params: {},
    });

    return res.data;
}