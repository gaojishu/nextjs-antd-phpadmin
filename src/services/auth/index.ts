import http from "@/utils/http";
import type { ApiResponse, AuthLoginRequest, AuthLoginToken } from "@/types";

export async function authLogin(data: AuthLoginRequest) {
    return await http.post<ApiResponse<AuthLoginToken>>({
        url: `/admin/auth/login`,
        params: {},
        data: data,
    });
}

export async function authInfo() {
    return await http.get({
        url: `/admin/auth/info`,
        params: {},
    });
}