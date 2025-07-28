import http from "@/utils/http";
import type { AdminRecord, ApiResponse, AuthLoginRequest, AuthLoginToken, PermissionRecord } from "@/types";
import { setAuthInfoState, setAuthPermissionState } from "./authService";

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

    setAuthInfoState(res.data);

    return res.data;
}

export async function authPermission() {
    const res = await http.get<ApiResponse<PermissionRecord[]>>({
        url: `/admin/auth/permission`,
        params: {},
    });

    setAuthPermissionState(res.data);
    return res.data;
}