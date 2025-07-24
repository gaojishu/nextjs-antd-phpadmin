import type { ApiResponse, PermissionRecord } from "@/types";
import http from "@/utils/http";

export async function permissionTree() {
    const res = await http.get<ApiResponse<PermissionRecord>>({
        url: `/admin/permission/tree`,
        params: {},
    });

    return res.data;
}
