import type { ApiResponse, PermissionCreate, PermissionUpdate, PermissionRecord } from "@/types";
import http from "@/utils/http";
import { buildPermissionRecordTree } from "./permissionService";

export async function permissionTree() {
    const res = await http.get<ApiResponse<PermissionRecord[]>>({
        url: `/admin/permission/records`,
        params: {},
    });

    const tree = buildPermissionRecordTree(res.data);
    return tree;
}

export async function permissionCreate(data: PermissionCreate) {
    const res = await http.post<ApiResponse<null>>({
        url: `/admin/permission/create`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function permissionUpdate(data: PermissionUpdate) {
    const res = await http.post<ApiResponse<null>>({
        url: `/admin/permission/update`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function permissionDelete(id: number) {
    const res = await http.get<ApiResponse<null>>({
        url: `/admin/permission/delete?id=${id}`,
        params: {},
    });

    return res.data;
}