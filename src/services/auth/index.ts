import http from "@/utils/http";
import type { AdminRecord, ApiResponse, AuthLoginRequest, AuthLoginToken } from "@/types";
import { buildPermissionRecordTree } from "./authService";

export async function authLogin(data: AuthLoginRequest) {
    const res = await http.post<ApiResponse<AuthLoginToken>>({
        url: `/admin/auth/login`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function authInfo() {
    const res = await http.get<ApiResponse<AdminRecord>>({
        url: `/admin/auth/info`,
        params: {},
    });

    buildPermissionRecordTree(res.data);

    return res.data;
}